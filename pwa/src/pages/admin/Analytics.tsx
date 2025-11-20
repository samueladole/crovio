import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, Package, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const stats = [
    { label: "Total Users", value: "2,543", change: "+12%", trend: "up", icon: Users },
    { label: "Active Dealers", value: "148", change: "+8%", trend: "up", icon: Package },
    { label: "Products Listed", value: "1,234", change: "+23%", trend: "up", icon: Package },
    { label: "Revenue", value: "₦12.4L", change: "-3%", trend: "down", icon: DollarSign },
  ];

  const salesData = [
    { month: "Jan", sales: 45000, orders: 120 },
    { month: "Feb", sales: 52000, orders: 145 },
    { month: "Mar", sales: 48000, orders: 132 },
    { month: "Apr", sales: 61000, orders: 168 },
    { month: "May", sales: 55000, orders: 152 },
    { month: "Jun", sales: 67000, orders: 189 },
  ];

  const categoryData = [
    { name: "Seeds", value: 400, color: "hsl(var(--chart-1))" },
    { name: "Fertilizers", value: 300, color: "hsl(var(--chart-2))" },
    { name: "Equipment", value: 200, color: "hsl(var(--chart-3))" },
    { name: "Pesticides", value: 180, color: "hsl(var(--chart-4))" },
    { name: "Tools", value: 150, color: "hsl(var(--chart-5))" },
  ];

  const topProducts = [
    { name: "Premium Wheat Seeds", sales: 234, revenue: "₦1.2L" },
    { name: "Organic Fertilizer", sales: 189, revenue: "₦89K" },
    { name: "Tractor Parts Set", sales: 156, revenue: "₦18.7L" },
    { name: "Garden Tools Kit", sales: 143, revenue: "₦45K" },
    { name: "Irrigation System", sales: 128, revenue: "₦3.2L" },
  ];

  const recentActivity = [
    { action: "New dealer registered", user: "Green Fields Co.", time: "2 hours ago" },
    { action: "Product added", user: "Farm Fresh", time: "4 hours ago" },
    { action: "Large order placed", user: "Agro Solutions", time: "6 hours ago" },
    { action: "Price alert triggered", user: "System", time: "8 hours ago" },
    { action: "New user signup", user: "Rajesh Kumar", time: "10 hours ago" },
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
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Analytics Overview
            </h1>
            <p className="text-muted-foreground">
              Platform insights and performance metrics
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="flex items-center text-xs mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
              <CardDescription>Monthly sales and orders over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} name="Sales (₦)" />
                  <Line type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>Distribution of products by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Best selling products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
