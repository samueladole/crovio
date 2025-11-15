import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, MoreVertical, Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Discussions = () => {
  const discussions = [
    { id: 1, title: "Best organic fertilizers for wheat?", author: "Rajesh Kumar", replies: 24, reports: 0, status: "active", created: "2 days ago" },
    { id: 2, title: "Dealing with pest infestation", author: "Priya Sharma", replies: 18, reports: 2, status: "flagged", created: "5 days ago" },
    { id: 3, title: "Government subsidy schemes 2024", author: "Amit Singh", replies: 45, reports: 0, status: "active", created: "1 week ago" },
  ];

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
          
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Discussions Management
              </h1>
              <p className="text-muted-foreground">
                Moderate and manage community discussions
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardDescription>Total Discussions</CardDescription>
              <CardTitle className="text-3xl">1,234</CardTitle>
            </CardHeader>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardDescription>Flagged Posts</CardDescription>
              <CardTitle className="text-3xl text-orange-500">12</CardTitle>
            </CardHeader>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardDescription>Active Today</CardDescription>
              <CardTitle className="text-3xl text-green-500">156</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Discussions</CardTitle>
            <CardDescription>Monitor and moderate community posts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Replies</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discussions.map((discussion) => (
                  <TableRow key={discussion.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {discussion.title}
                    </TableCell>
                    <TableCell>{discussion.author}</TableCell>
                    <TableCell>{discussion.replies}</TableCell>
                    <TableCell>
                      {discussion.reports > 0 ? (
                        <div className="flex items-center gap-1 text-orange-500">
                          <Flag className="h-4 w-4" />
                          {discussion.reports}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{discussion.created}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          discussion.status === "active" ? "default" : 
                          discussion.status === "flagged" ? "destructive" : "secondary"
                        }
                      >
                        {discussion.status}
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
                          <DropdownMenuItem>View Discussion</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Pin Post</DropdownMenuItem>
                          <DropdownMenuItem>Lock Discussion</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Discussions;
