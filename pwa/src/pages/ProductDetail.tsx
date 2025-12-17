import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Package, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Dealer {
  business_name: string;
  city: string;
  verified: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image_url: string;
  dealer?: Dealer;
  // Add other fields as needed
}

const ProductDetail = () => {
  const { id } = useParams();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data as Product;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-destructive font-semibold">Error loading product</p>
          <Link to="/marketplace">
            <Button variant="outline">Back to Marketplace</Button>
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

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image Placeholder */}
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <Package className="h-32 w-32 text-muted-foreground" />
                )}
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
              <div className="text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
              <Badge variant="secondary">{product.category}</Badge>
            </div>

            {product.quantity > 0 ? (
              <Badge variant="outline" className="border-success text-success">
                In Stock ({product.quantity} available)
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
                  <div className="font-semibold">{product.dealer?.business_name || "Unknown Dealer"}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {product.dealer?.city || "Unknown Location"}
                  </div>
                </div>
                {product.dealer?.verified && (
                  <Badge className="bg-success">Verified Dealer</Badge>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                {/*  TODO: Add actual specifications to backend model if needed */}
                <p className="text-sm text-muted-foreground italic">No additional specifications available.</p>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Link to={`/contact-dealer/${product.id}`} className="flex-1">
                <Button size="lg" className="w-full" disabled={product.quantity <= 0}>
                  Contact Dealer
                </Button>
              </Link>
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
