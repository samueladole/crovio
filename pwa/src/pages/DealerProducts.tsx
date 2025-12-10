import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Package } from "lucide-react";

const dealersData: Record<string, { name: string; rating: number; location: string; verified: boolean; products: typeof productsData }> = {
  "1": {
    name: "Green Valley Supplies",
    rating: 4.8,
    location: "Maharashtra",
    verified: true,
    products: [
      { id: 1, name: "NPK Fertilizer 20-20-20", price: "₦1,200", unit: "per 50kg bag", inStock: true },
      { id: 5, name: "Urea Fertilizer", price: "₦950", unit: "per 50kg bag", inStock: true },
      { id: 6, name: "Pesticide Spray Concentrate", price: "₦650", unit: "per liter", inStock: true },
    ],
  },
  "2": {
    name: "Farm Input Co.",
    rating: 4.6,
    location: "Punjab",
    verified: true,
    products: [
      { id: 2, name: "Organic Compost Premium", price: "₦850", unit: "per 50kg bag", inStock: true },
      { id: 7, name: "Bio Fertilizer Mix", price: "₦1,100", unit: "per 25kg bag", inStock: true },
      { id: 8, name: "Seed Treatment Solution", price: "₦450", unit: "per liter", inStock: false },
    ],
  },
  "3": {
    name: "Agri Tools & Seeds",
    rating: 4.9,
    location: "Karnataka",
    verified: true,
    products: [
      { id: 3, name: "Drip Irrigation Kit", price: "₦4,500", unit: "per unit", inStock: false },
      { id: 9, name: "Sprinkler System", price: "₦3,200", unit: "per unit", inStock: true },
      { id: 10, name: "Hybrid Tomato Seeds", price: "₦280", unit: "per packet", inStock: true },
    ],
  },
};

const productsData = [
  { id: 1, name: "NPK Fertilizer 20-20-20", price: "₦1,200", unit: "per 50kg bag", inStock: true },
];

const DealerProducts = () => {
  const { dealerId } = useParams();
  const dealer = dealersData[dealerId || "1"];

  if (!dealer) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Dealer not found</h1>
          <Link to="/marketplace">
            <Button className="mt-4">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        {/* Dealer Info Card */}
        <Card className="shadow-card mb-8">
          <CardHeader className="pb-2 sm:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl">{dealer.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {dealer.location}
                </CardDescription>
              </div>
              {dealer.verified && (
                <Badge variant="default" className="bg-success w-fit">
                  Verified
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-warning text-warning" />
                <span className="font-semibold text-lg">{dealer.rating}</span>
                <span className="text-muted-foreground">rating</span>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Phone className="h-4 w-4 mr-2" />
                Contact Dealer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products List */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Products ({dealer.products.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealer.products.map((product) => (
              <Card key={product.id} className="shadow-card hover:shadow-card-hover transition-shadow">
                <CardHeader>
                  <div className="h-32 bg-muted rounded-lg flex items-center justify-center mb-2">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <CardDescription>{dealer.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-primary">{product.price}</div>
                      <div className="text-sm text-muted-foreground">{product.unit}</div>
                    </div>
                    {product.inStock ? (
                      <Badge variant="outline" className="border-success text-success">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-destructive text-destructive">
                        Out of Stock
                      </Badge>
                    )}
                    <Link to={`/marketplace/${product.id}`} className="w-full block">
                      <Button size="sm" className="w-full" disabled={!product.inStock}>
                        {product.inStock ? "View Details" : "Notify When Available"}
                      </Button>
                    </Link>
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

export default DealerProducts;
