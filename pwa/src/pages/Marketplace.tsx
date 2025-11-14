import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, Phone } from "lucide-react";

const dealers = [
  {
    id: 1,
    name: "Green Valley Supplies",
    rating: 4.8,
    location: "Maharashtra",
    verified: true,
    products: 45,
  },
  {
    id: 2,
    name: "Farm Input Co.",
    rating: 4.6,
    location: "Punjab",
    verified: true,
    products: 38,
  },
  {
    id: 3,
    name: "Agri Tools & Seeds",
    rating: 4.9,
    location: "Karnataka",
    verified: true,
    products: 52,
  },
];

const products = [
  {
    id: 1,
    name: "NPK Fertilizer 20-20-20",
    dealer: "Green Valley Supplies",
    price: "₹1,200",
    unit: "per 50kg bag",
    inStock: true,
  },
  {
    id: 2,
    name: "Organic Compost Premium",
    dealer: "Farm Input Co.",
    price: "₹850",
    unit: "per 50kg bag",
    inStock: true,
  },
  {
    id: 3,
    name: "Drip Irrigation Kit",
    dealer: "Agri Tools & Seeds",
    price: "₹4,500",
    unit: "per unit",
    inStock: false,
  },
  {
    id: 4,
    name: "Pesticide Spray Concentrate",
    dealer: "Green Valley Supplies",
    price: "₹650",
    unit: "per liter",
    inStock: true,
  },
];

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Crovio Market
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect with verified dealers and find quality agricultural products
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search products or dealers..."
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Verified Dealers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Verified Dealers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {dealers.map((dealer) => (
              <Card key={dealer.id} className="shadow-card hover:shadow-card-hover transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{dealer.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {dealer.location}
                      </CardDescription>
                    </div>
                    {dealer.verified && (
                      <Badge variant="default" className="bg-success">
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-semibold">{dealer.rating}</span>
                      <span className="text-sm text-muted-foreground">rating</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {dealer.products} products available
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        View Products
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Available Products */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Available Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="shadow-card hover:shadow-card-hover transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <CardDescription>{product.dealer}</CardDescription>
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
                    <Link to={`/marketplace/${product.id}`} className="w-full">
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

export default Marketplace;
