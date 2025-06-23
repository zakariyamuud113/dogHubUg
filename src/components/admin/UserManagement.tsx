
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
        // Fetch ALL users from profiles table without any filters
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          throw profilesError;
        }

        console.log('Fetched profiles:', profiles);

        // Fetch order statistics for each user
        const { data: orderStats, error: orderError } = await supabase
          .from('checkout_sessions')
          .select('user_id, total_amount, status')
          .not('user_id', 'is', null);

        if (orderError) {
          console.error('Error fetching order stats:', orderError);
          // Continue without order stats if there's an error
        }

        console.log('Fetched order stats:', orderStats);

        // Combine user data with order statistics
        const usersWithStats = profiles?.map(profile => {
          const userOrders = orderStats?.filter(order => order.user_id === profile.id) || [];
          const completedOrders = userOrders.filter(order => order.status === 'completed');
          
          return {
            ...profile,
            order_count: userOrders.length,
            total_spent: completedOrders.reduce((sum, order) => sum + Number(order.total_amount), 0)
          };
        }) || [];
        
        console.log('Users with stats:', usersWithStats);
        
        setUsers(usersWithStats);
        setTotalUsers(profiles?.length || 0);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const activeUsers = users.filter(user => (user.order_count || 0) > 0).length;
  const totalRevenue = users.reduce((sum, user) => sum + (user.total_spent || 0), 0);

  if (loading) {
    return <div>Loading users...</div>;
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
          <CardTitle>User Management - All Registered Users</CardTitle>
        </CardHeader>
        <CardContent>
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

          {users.length === 0 && (
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
