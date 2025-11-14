import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, MapPin } from "lucide-react";

const PriceDetail = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const priceData = {
    id: id,
    product: "NPK Fertilizer 20-20-20",
    currentPrice: "₹1,200",
    trend: "up",
    change: "+5.2%",
    region: "Maharashtra",
    lastUpdated: "2 hours ago",
    priceHistory: [
      { date: "Jan 2025", price: "₹1,140", dealer: "Green Valley Supplies" },
      { date: "Dec 2024", price: "₹1,180", dealer: "Farm Input Co." },
      { date: "Nov 2024", price: "₹1,150", dealer: "Agri Tools & Seeds" },
      { date: "Oct 2024", price: "₹1,120", dealer: "Green Valley Supplies" },
    ],
    regionalPrices: [
      { region: "Maharashtra", price: "₹1,200", trend: "up" },
      { region: "Punjab", price: "₹1,180", trend: "stable" },
      { region: "Karnataka", price: "₹1,220", trend: "up" },
      { region: "Gujarat", price: "₹1,160", trend: "down" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/prices" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Price Intelligence
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {priceData.product}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {priceData.region}
            <span>•</span>
            <span>Updated {priceData.lastUpdated}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardDescription>Current Price</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {priceData.currentPrice}
              </div>
              <div className="flex items-center gap-2">
                {priceData.trend === "up" ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-destructive" />
                    <span className="text-destructive font-semibold">{priceData.change}</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-success" />
                    <span className="text-success font-semibold">{priceData.change}</span>
                  </>
                )}
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardDescription>Lowest Price</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">₹1,160</div>
              <div className="text-sm text-muted-foreground">Gujarat region</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardDescription>Highest Price</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive mb-2">₹1,220</div>
              <div className="text-sm text-muted-foreground">Karnataka region</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Price History */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Price History</CardTitle>
              <CardDescription>Historical pricing data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priceData.priceHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <div className="font-semibold">{entry.date}</div>
                      <div className="text-sm text-muted-foreground">{entry.dealer}</div>
                    </div>
                    <div className="text-lg font-bold text-primary">{entry.price}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regional Prices */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Regional Prices</CardTitle>
              <CardDescription>Compare prices across regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priceData.regionalPrices.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{entry.region}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-primary">{entry.price}</span>
                      {entry.trend === "up" && (
                        <Badge variant="outline" className="border-destructive text-destructive">
                          <TrendingUp className="h-3 w-3" />
                        </Badge>
                      )}
                      {entry.trend === "down" && (
                        <Badge variant="outline" className="border-success text-success">
                          <TrendingDown className="h-3 w-3" />
                        </Badge>
                      )}
                      {entry.trend === "stable" && (
                        <Badge variant="outline">Stable</Badge>
                      )}
                    </div>
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

export default PriceDetail;
