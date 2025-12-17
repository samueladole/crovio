import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Search, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";

interface Dealer {
  id: string;
  business_name: string;
  owner_name?: string;
  city?: string;
  is_verified: boolean;
  products_count: number;
}

const Dealers = () => {
  const [page, setPage] = useState(1);
  const { data: dealersData, isLoading, error } = useQuery({
    queryKey: ['admin-dealers', page],
    queryFn: async () => {
      const response = await api.get(`/dealers/?page=${page}&per_page=10`);
      return response.data;
    },
    placeholderData: (previousData) => previousData
  });

  const dealers = dealersData?.items || [];
  const totalPages = dealersData?.pages || 1;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/admin">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dealers Management
              </h1>
              <p className="text-muted-foreground">
                Manage dealer accounts and permissions
              </p>
            </div>
            <Link to="/admin/dealers/add">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Dealer
              </Button>
            </Link>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dealers..."
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>All Dealers</CardTitle>
            <CardDescription>A list of all registered dealers</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading dealers...</div>
            ) : error ? (
              <div className="text-center py-4 text-destructive">Error loading dealers</div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dealers?.map((dealer) => (
                      <TableRow key={dealer.id}>
                        <TableCell className="font-medium">{dealer.business_name}</TableCell>
                        <TableCell>{dealer.city || "N/A"}</TableCell>
                        <TableCell>{dealer.products_count}</TableCell>
                        <TableCell>
                          <Badge variant={dealer.is_verified ? "default" : "secondary"}>
                            {dealer.is_verified ? "Verified" : "Unverified"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Approve</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Suspend
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dealers;
