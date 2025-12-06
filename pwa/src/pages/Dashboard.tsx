import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, TrendingUp, TrendingDown, Activity, Clock, Trash2, Eye } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";

const mockPriceAlerts = [
  {
    id: 1,
    commodity: "Maize",
    condition: "below",
    targetPrice: 250,
    currentPrice: 265,
    unit: "KES/kg",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    commodity: "Wheat",
    condition: "above",
    targetPrice: 400,
    currentPrice: 385,
    unit: "KES/kg",
    status: "active",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    commodity: "Rice",
    condition: "below",
    targetPrice: 150,
    currentPrice: 145,
    unit: "KES/kg",
    status: "triggered",
    createdAt: "2024-01-10",
  },
];

const mockActivity = [
  {
    id: 1,
    type: "price_alert",
    message: "Rice price dropped below KES 150/kg",
    timestamp: "2 hours ago",
    icon: TrendingDown,
    color: "text-green-500",
  },
  {
    id: 2,
    type: "view",
    message: "You viewed Maize price details",
    timestamp: "5 hours ago",
    icon: Eye,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "price_change",
    message: "Wheat prices increased by 3%",
    timestamp: "1 day ago",
    icon: TrendingUp,
    color: "text-orange-500",
  },
  {
    id: 4,
    type: "alert_created",
    message: "New price alert created for Maize",
    timestamp: "3 days ago",
    icon: Bell,
    color: "text-primary",
  },
  {
    id: 5,
    type: "view",
    message: "You contacted Green Valley Farms",
    timestamp: "5 days ago",
    icon: Activity,
    color: "text-purple-500",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your price alerts and recent activity.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockPriceAlerts.filter(a => a.status === "active").length}
                  </p>
                </div>
                <Bell className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Triggered Alerts</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockPriceAlerts.filter(a => a.status === "triggered").length}
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recent Activities</p>
                  <p className="text-2xl font-bold text-foreground">{mockActivity.length}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Price Alerts Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Your Price Alerts
                </CardTitle>
                <CardDescription>Monitor your commodity price alerts</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link to="/set-price-alert">Add Alert</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPriceAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{alert.commodity}</span>
                        <Badge variant={alert.status === "triggered" ? "default" : "secondary"}>
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Alert when price goes {alert.condition}{" "}
                        <span className="font-medium">{alert.targetPrice} {alert.unit}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Current: {alert.currentPrice} {alert.unit}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest actions and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivity.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
