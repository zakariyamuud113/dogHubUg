import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, DollarSign, TrendingUp, RefreshCw } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type CheckoutSession = Tables<'checkout_sessions'>;

export const OrderManagement = () => {
  const [orders, setOrders] = useState<CheckoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      console.log('Admin fetching ALL orders from ALL users...');
      
      // First try direct database query
      const { data, error } = await supabase
        .from('checkout_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Direct query failed:', error);
        console.log('Trying admin edge function...');
        
        // Fallback to admin edge function that bypasses RLS
        const { data: adminData, error: adminError } = await supabase.functions.invoke('get-all-orders-admin');
        
        if (adminError) {
          console.error('Admin function also failed:', adminError);
          throw new Error('Unable to fetch orders. Please ensure you have admin privileges and RLS policies are configured correctly.');
        }
        
        console.log('Successfully fetched via admin function:', adminData);
        setOrders(adminData || []);
        return;
      }
      
      console.log('Successfully fetched all orders:', data);
      console.log('Total orders from all users:', data?.length || 0);
      
      // Log the user_ids to verify we're getting orders from different users
      const userIds = [...new Set(data?.map(order => order.user_id).filter(Boolean))];
      console.log('Orders found from these user IDs:', userIds);
      console.log('Orders without user_id (guest orders):', data?.filter(order => !order.user_id).length || 0);
      
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders. This might be due to Row Level Security restrictions. Please check your admin permissions in the database.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshOrders = async () => {
    setRefreshing(true);
    await fetchAllOrders();
    setRefreshing(false);
    toast({
      title: "Refreshed",
      description: "All orders have been refreshed successfully.",
    });
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      console.log('Admin updating order status:', orderId, 'to:', newStatus);

      const { error } = await supabase
        .from('checkout_sessions')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      // If order is being approved (completed), send confirmation email
      if (newStatus === 'completed' && order.status !== 'completed') {
        try {
          console.log('Sending confirmation email for order:', orderId);
          const { data, error: emailError } = await supabase.functions.invoke('send-checkout-confirmation', {
            body: {
              customer_email: order.customer_email,
              customer_name: order.customer_name,
              order_id: order.id,
              total_amount: Number(order.total_amount),
              items: order.items || []
            }
          });

          if (emailError) {
            console.error('Email error:', emailError);
            throw emailError;
          }

          console.log('Email sent successfully:', data);
          toast({
            title: "Order Updated",
            description: "Order status updated and confirmation email sent to customer.",
          });
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
          toast({
            title: "Order Updated",
            description: "Order status updated but email notification failed. Please check email configuration.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Order Updated",
          description: "Order status has been updated successfully.",
        });
      }
      
      // Refresh orders to show updated status
      await fetchAllOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  };

  const filteredOrders = orders.filter(order => 
    statusFilter === "all" || order.status === statusFilter
  );

  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        <div className="ml-4 text-lg">Loading orders from all users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From completed orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Customer Orders</CardTitle>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={refreshOrders} 
                disabled={refreshing}
                size="sm"
                variant="outline"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      {order.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.customer_name || 'N/A'}
                    </TableCell>
                    <TableCell>{order.customer_email}</TableCell>
                    <TableCell>{order.customer_phone || 'N/A'}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {order.user_id ? order.user_id.slice(0, 8) + '...' : 'Guest'}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${Number(order.total_amount || 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status || 'pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status || 'pending'}
                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {statusFilter === "all" ? "No orders found" : `No ${statusFilter} orders found`}
              </h3>
              <p className="text-gray-500 mb-4">
                {orders.length === 0 
                  ? "No customers have placed orders yet, or there may be a permissions issue" 
                  : `No orders match the ${statusFilter} filter`
                }
              </p>
              <Button onClick={refreshOrders} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Orders
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
