import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Search, MoreVertical, TrendingUp, TrendingDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PriceManagement = () => {
  const prices = [
    { id: 1, commodity: "Wheat", market: "Delhi", price: "₹2,150/quintal", change: "+5%", trend: "up", lastUpdated: "2 hours ago" },
    { id: 2, commodity: "Rice", market: "Punjab", price: "₹3,200/quintal", change: "-2%", trend: "down", lastUpdated: "4 hours ago" },
    { id: 3, commodity: "Cotton", market: "Gujarat", price: "₹6,500/quintal", change: "+8%", trend: "up", lastUpdated: "1 hour ago" },
  ];

  const alerts = [
    { id: 1, commodity: "Wheat", condition: "Price > ₹2,200", users: 145, status: "active" },
    { id: 2, commodity: "Rice", condition: "Price < ₹3,000", users: 89, status: "active" },
    { id: 3, commodity: "Cotton", condition: "Change > 10%", users: 234, status: "inactive" },
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
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Prices & Alerts Management
              </h1>
              <p className="text-muted-foreground">
                Manage commodity prices and price alerts
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Price Data
            </Button>
          </div>
        </div>

        <Tabs defaultValue="prices" className="space-y-6">
          <TabsList>
            <TabsTrigger value="prices">Price Data</TabsTrigger>
            <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="prices">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Commodity Prices</CardTitle>
                    <CardDescription>Current market prices and trends</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search commodities..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commodity</TableHead>
                      <TableHead>Market</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prices.map((price) => (
                      <TableRow key={price.id}>
                        <TableCell className="font-medium">{price.commodity}</TableCell>
                        <TableCell>{price.market}</TableCell>
                        <TableCell>{price.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {price.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={price.trend === "up" ? "text-green-500" : "text-red-500"}>
                              {price.change}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{price.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Update Price</DropdownMenuItem>
                              <DropdownMenuItem>View History</DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Price Alerts</CardTitle>
                    <CardDescription>Manage user price alert configurations</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Alert
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commodity</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Subscribers</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.commodity}</TableCell>
                        <TableCell>{alert.condition}</TableCell>
                        <TableCell>{alert.users} users</TableCell>
                        <TableCell>
                          <Badge variant={alert.status === "active" ? "default" : "secondary"}>
                            {alert.status}
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
                              <DropdownMenuItem>Edit Alert</DropdownMenuItem>
                              <DropdownMenuItem>View Subscribers</DropdownMenuItem>
                              <DropdownMenuItem>Toggle Status</DropdownMenuItem>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PriceManagement;
