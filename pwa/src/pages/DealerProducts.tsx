import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string; // Assuming 'unit' is part of product or description? Backend schema says 'quantity' but let's check. 
  // Checking backend model: it has 'quantity' (int) and 'description'. It doesn't have 'unit'.
  // I'll stick to 'quantity' and maybe 'description' or just generic unit for now if not available.
  quantity: number;
  description?: string;
  is_active: boolean;
  category: string;
}

interface Dealer {
  id: string;
  business_name: string;
  city?: string;
  is_verified: boolean;
  rating?: number; // Backend doesn't have rating yet, defaulting
}

const DealerProducts = () => {
  const { dealerId } = useParams();

  const { data: dealer, isLoading: isLoadingDealer } = useQuery({
    queryKey: ['dealer', dealerId],
    queryFn: async () => {
      const response = await api.get(`/dealers/${dealerId}`);
      return response.data as Dealer;
    },
    enabled: !!dealerId
  });

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['dealer-products', dealerId],
    queryFn: async () => {
      const response = await api.get(`/products/?dealer_id=${dealerId}&page=1&per_page=100`);
      return response.data; // Paginated response
    },
    enabled: !!dealerId
  });

  const products = productsData?.items || [];
  const isLoading = isLoadingDealer || isLoadingProducts;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          Loading...
        </div>
      </div>
    )
  }

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
                <CardTitle className="text-xl sm:text-2xl">{dealer.business_name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {dealer.city || "Location not specified"}
                </CardDescription>
              </div>
              {dealer.is_verified && (
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
                <span className="font-semibold text-lg">{dealer.rating || 4.5}</span>
                <span className="text-muted-foreground">rating</span>
              </div>
              <Link to={`/contact-dealer/${dealer.id}`}>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Dealer
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Products List */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Products ({products.length})
          </h2>
          {products.length === 0 ? (
            <p className="text-muted-foreground">No products found.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: Product) => (
                <Card key={product.id} className="shadow-card hover:shadow-card-hover transition-shadow">
                  <CardHeader>
                    <div className="h-32 bg-muted rounded-lg flex items-center justify-center mb-2">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-base">{product.name}</CardTitle>
                    <CardDescription>{dealer.business_name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-primary">₦{product.price}</div>
                        {/* Assuming quantity is stock count, not unit. Using a placeholder for unit or just omitting */}
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                      </div>
                      {product.quantity > 0 ? (
                        <Badge variant="outline" className="border-success text-success">
                          In Stock ({product.quantity})
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-destructive text-destructive">
                          Out of Stock
                        </Badge>
                      )}
                      <Link to={`/marketplace/${product.id}`} className="w-full block">
                        <Button size="sm" className="w-full" disabled={product.quantity === 0}>
                          {product.quantity > 0 ? "View Details" : "Notify When Available"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DealerProducts;
