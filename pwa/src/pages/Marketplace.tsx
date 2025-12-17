import { useState, useCallback, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import useEmblaCarousel from "embla-carousel-react";

// Product interface matching backend
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image_url: string;
  dealer_id: string;
  dealer?: Dealer;
}

// Dealer Interface matching backend PublicDealer schema
interface Dealer {
  id: string;
  business_name: string;
  city?: string;
  state?: string;
  is_verified: boolean;
  rating?: number; // backend might return 0.0
  products_count?: number; // backend might return 0
}


const Marketplace = () => {
  const [page, setPage] = useState(1);
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      const response = await api.get(`/products/?page=${page}&per_page=12`);
      return response.data;
    },
    placeholderData: (previousData) => previousData // Keep previous data while fetching new page
  });

  // Fetch dealers
  const { data: dealersData } = useQuery({
    queryKey: ['dealers'],
    queryFn: async () => {
      const response = await api.get('/dealers/');
      return response.data;
    }
  });

  const dealers = dealersData?.items || [];

  // Embla Carousel for Dealers
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-scroll effect
  useEffect(() => {
    if (!emblaApi) return;

    // Auto-scroll every 3 seconds
    const intervalId = setInterval(() => {
      // Check if user is interacting? Embla usually handles pointers well, 
      // but simple interval forces scroll. 
      // To satisfy "start from start if it completes", generic loop: true does this.
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header ... */}
        {/* ... */}

        {/* Verified Dealers Carousel */}
        <section className="mb-12 relative group">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Verified Dealers</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={scrollPrev} className="h-8 w-8 rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={scrollNext} className="h-8 w-8 rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {dealers?.map((dealer) => (
                <div key={dealer.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6 min-w-0">
                  <div className="h-full">
                    <Card className="shadow-card hover:shadow-card-hover transition-shadow h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{dealer.business_name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {dealer.city || "Unknown Location"}
                            </CardDescription>
                          </div>
                          {dealer.is_verified && (
                            <Badge variant="default" className="bg-success">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-end">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="font-semibold">{dealer.rating || "N/A"}</span>
                            <span className="text-sm text-muted-foreground">rating</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {dealer.products_count || 0} products available
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/dealer/${dealer.id}/products`} className="flex-1">
                              <Button size="sm" className="w-full">
                                View Products
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available Products */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Available Products</h2>
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">Error loading products</div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products?.items?.map((product: Product) => (
                    <Card key={product.id} className="shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
                      <div className="h-48 overflow-hidden bg-muted">
                        <img
                          src={product.image_url || "https://placehold.co/400x300?text=No+Image"}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base line-clamp-1">{product.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                        </div>
                        <CardDescription className="line-clamp-1">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="space-y-3">
                          <div>
                            <div className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{product.quantity} in stock</div>
                          </div>

                          {product.quantity > 0 ? (
                            <Badge variant="outline" className="border-success text-success text-xs">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-destructive text-destructive text-xs">
                              Out of Stock
                            </Badge>
                          )}

                          <Link to={`/marketplace/${product.id}`} className="block w-full">
                            <Button size="sm" className="w-full" disabled={product.quantity <= 0}>
                              {product.quantity > 0 ? "View Details" : "Notify When Available"}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {products?.items?.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                      No products found in this category.
                    </div>
                  )}
                </div>

                {/* Pagination Controls */}
                {products && products.pages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {products.page} of {products.pages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.min(products.pages, p + 1))}
                      disabled={page === products.pages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Marketplace;
