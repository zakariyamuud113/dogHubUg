
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Eye, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type DogReport = Tables<'dog_reports'>;

export const ReportsManagement = () => {
  const [reports, setReports] = useState<DogReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<DogReport | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('dog_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (reportId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('dog_reports')
        .update({ status: newStatus })
        .eq('id', reportId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Report status updated successfully",
      });
      fetchReports();
    } catch (error) {
      console.error('Error updating report status:', error);
      toast({
        title: "Error",
        description: "Failed to update report status",
        variant: "destructive",
      });
    }
  };

  const deleteReport = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      const { error } = await supabase
        .from('dog_reports')
        .delete()
        .eq('id', reportId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Report deleted successfully",
      });
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
      toast({
        title: "Error",
        description: "Failed to delete report",
        variant: "destructive",
      });
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800';
  };

  if (loading) {
    return <div>Loading reports...</div>;
  }

  const lostReports = reports.filter(r => r.type === 'lost').length;
  const foundReports = reports.filter(r => r.type === 'found').length;
  const urgentReports = reports.filter(r => r.is_urgent).length;
  const activeReports = reports.filter(r => r.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lost Dogs</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lostReports}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Found Dogs</CardTitle>
            <Heart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{foundReports}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{urgentReports}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Dog Reports Management</CardTitle>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Dog Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <Badge className={getTypeColor(report.type)}>
                      {report.type.toUpperCase()}
                      {report.is_urgent && <AlertTriangle className="h-3 w-3 ml-1" />}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{report.dog_name || 'Unknown'}</p>
                      <p className="text-sm text-gray-500">{report.breed}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{report.contact_name}</p>
                      <p className="text-xs text-gray-500">{report.contact_phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{report.last_seen_location || 'Not specified'}</p>
                    {report.last_seen_date && (
                      <p className="text-xs text-gray-500">
                        {new Date(report.last_seen_date).toLocaleDateString()}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={report.status || 'active'}
                      onValueChange={(value) => updateReportStatus(report.id, value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(report.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Report Details</DialogTitle>
                          </DialogHeader>
                          {selectedReport && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold">Dog Information</h4>
                                  <p>Name: {selectedReport.dog_name || 'Unknown'}</p>
                                  <p>Breed: {selectedReport.breed || 'Unknown'}</p>
                                  <p>Age: {selectedReport.age || 'Unknown'}</p>
                                  <p>Gender: {selectedReport.gender || 'Unknown'}</p>
                                  <p>Size: {selectedReport.size || 'Unknown'}</p>
                                  <p>Color: {selectedReport.color || 'Unknown'}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Contact Information</h4>
                                  <p>Name: {selectedReport.contact_name}</p>
                                  <p>Phone: {selectedReport.contact_phone}</p>
                                  <p>Email: {selectedReport.contact_email}</p>
                                  {selectedReport.reward_amount && selectedReport.reward_amount > 0 && (
                                    <p>Reward: ${selectedReport.reward_amount}</p>
                                  )}
                                </div>
                              </div>
                              {selectedReport.description && (
                                <div>
                                  <h4 className="font-semibold">Description</h4>
                                  <p>{selectedReport.description}</p>
                                </div>
                              )}
                              {selectedReport.image_url && (
                                <div>
                                  <h4 className="font-semibold">Photo</h4>
                                  <img 
                                    src={selectedReport.image_url} 
                                    alt="Dog" 
                                    className="max-w-full h-48 object-cover rounded"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteReport(report.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No reports found</h3>
              <p className="text-gray-500">
                {typeFilter === "all" && statusFilter === "all"
                  ? "No dog reports have been submitted yet"
                  : "No reports match the current filters"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
