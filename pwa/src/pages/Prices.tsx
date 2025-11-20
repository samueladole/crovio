import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Bell, Download } from "lucide-react";

const priceData = [
  {
    id: 1,
    product: "NPK Fertilizer 20-20-20",
    currentPrice: "₹1,200",
    change: "+5%",
    trend: "up",
    avgPrice: "₹1,150",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    product: "Organic Compost Premium",
    currentPrice: "₹850",
    change: "-3%",
    trend: "down",
    avgPrice: "₹875",
    lastUpdated: "5 hours ago",
  },
  {
    id: 3,
    product: "Pesticide Spray",
    currentPrice: "₹650",
    change: "+2%",
    trend: "up",
    avgPrice: "₹640",
    lastUpdated: "1 hour ago",
  },
  {
    id: 4,
    product: "Drip Irrigation Kit",
    currentPrice: "₹4,500",
    change: "0%",
    trend: "stable",
    avgPrice: "₹4,500",
    lastUpdated: "3 hours ago",
  },
];

const insights = [
  {
    title: "Price Alert",
    description: "NPK Fertilizer prices increased by 5% in your region",
    type: "warning",
  },
  {
    title: "Best Deal",
    description: "Organic Compost available at 10% below market average",
    type: "success",
  },
  {
    title: "Market Trend",
    description: "Pesticide prices stable across all dealers this week",
    type: "info",
  },
];

const Prices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Crovio Price
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time price tracking and intelligence for agricultural inputs
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link to="/set-price-alert">
            <Button variant="default" className="gap-2">
              <Bell className="h-4 w-4" />
              Set Price Alert
            </Button>
          </Link>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Insights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Market Insights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{insight.title}</CardTitle>
                    {insight.type === "warning" && (
                      <Badge className="bg-warning">{insight.type}</Badge>
                    )}
                    {insight.type === "success" && (
                      <Badge className="bg-success">{insight.type}</Badge>
                    )}
                    {insight.type === "info" && (
                      <Badge variant="outline">Info</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Price Tracking */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Current Prices</h2>
          <div className="grid gap-4">
            {priceData.map((item) => (
              <Card key={item.id} className="shadow-card hover:shadow-card-hover transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {item.product}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Updated {item.lastUpdated}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                        <div className="text-2xl font-bold text-foreground">
                          {item.currentPrice}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Market Avg</div>
                        <div className="text-lg font-semibold text-muted-foreground">
                          {item.avgPrice}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.trend === "up" && (
                          <>
                            <TrendingUp className="h-5 w-5 text-success" />
                            <span className="font-semibold text-success">{item.change}</span>
                          </>
                        )}
                        {item.trend === "down" && (
                          <>
                            <TrendingDown className="h-5 w-5 text-destructive" />
                            <span className="font-semibold text-destructive">{item.change}</span>
                          </>
                        )}
                        {item.trend === "stable" && (
                          <span className="font-semibold text-muted-foreground">{item.change}</span>
                        )}
                      </div>

                      <Link to={`/prices/${item.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Prices;
