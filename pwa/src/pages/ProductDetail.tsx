import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Package } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const product = {
    id: id,
    name: "NPK Fertilizer 20-20-20",
    dealer: "Green Valley Supplies",
    dealerRating: 4.8,
    dealerLocation: "Maharashtra",
    price: "₹1,200",
    unit: "per 50kg bag",
    inStock: true,
    description: "Premium quality NPK fertilizer with balanced nutrients for optimal crop growth. Suitable for all types of crops during the vegetative and flowering stages.",
    specifications: [
      { label: "Nitrogen (N)", value: "20%" },
      { label: "Phosphorus (P)", value: "20%" },
      { label: "Potassium (K)", value: "20%" },
      { label: "Package Size", value: "50kg bag" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image Placeholder */}
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <Package className="h-32 w-32 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary">{product.price}</div>
              <div className="text-muted-foreground">{product.unit}</div>
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

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Dealer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-semibold">{product.dealer}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {product.dealerLocation}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-semibold">{product.dealerRating}</span>
                  <span className="text-sm text-muted-foreground">rating</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1" disabled={!product.inStock}>
                Contact Dealer
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
