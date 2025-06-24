
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserCheck, Calendar, Mail } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type UserProfile = Tables<'profiles'>;

interface UserWithOrderCount extends UserProfile {
  order_count?: number;
  total_spent?: number;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<UserWithOrderCount[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching all users and their data...');

        // Fetch ALL users from profiles table - this is our source of truth
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          setLoading(false);
          return;
        }

        console.log('Fetched profiles:', profiles);
        
        if (!profiles) {
          setUsers([]);
          setTotalUsers(0);
          setLoading(false);
          return;
        }

        // Set total users count
        setTotalUsers(profiles.length);

        // Fetch order statistics for each user
        const { data: orderStats, error: orderError } = await supabase
          .from('checkout_sessions')
          .select('user_id, total_amount, status')
          .not('user_id', 'is', null);

        if (orderError) {
          console.error('Error fetching order stats:', orderError);
        }

        console.log('Fetched order stats:', orderStats);

        // Combine user data with order statistics
        const usersWithStats = profiles.map(profile => {
          const userOrders = orderStats?.filter(order => order.user_id === profile.id) || [];
          const completedOrders = userOrders.filter(order => order.status === 'completed');
          
          return {
            ...profile,
            order_count: userOrders.length,
            total_spent: completedOrders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0)
          };
        });
        
        console.log('Users with stats:', usersWithStats);
        
        setUsers(usersWithStats);
      } catch (error) {
        console.error('Error in fetchUsers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const activeUsers = users.filter(user => (user.order_count || 0) > 0).length;
  const totalRevenue = users.reduce((sum, user) => sum + (user.total_spent || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Users with orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total from all customers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${activeUsers > 0 ? (totalRevenue / activeUsers).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Per active customer
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management - All Registered Users ({totalUsers})</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.first_name || user.last_name 
                        ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                        : 'No name provided'
                      }
                    </TableCell>
                    <TableCell>{user.email || 'No email'}</TableCell>
                    <TableCell>
                      <span className="font-medium">{user.order_count || 0}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ${(user.total_spent || 0).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        (user.order_count || 0) > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {(user.order_count || 0) > 0 ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
              <p className="text-gray-500">No users have registered yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
