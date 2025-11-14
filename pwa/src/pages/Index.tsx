import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, TrendingUp, MessageSquare, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: "Crovio Market",
      description: "Marketplace & Dealers",
      details: "Connect with verified dealers, browse quality products, and transact securely with trusted agricultural suppliers.",
      link: "/marketplace",
      color: "bg-primary",
    },
    {
      icon: TrendingUp,
      title: "Crovio Price",
      description: "Price Intelligence",
      details: "Track input prices in real-time, get intelligent alerts, and make data-driven decisions with comprehensive analytics.",
      link: "/prices",
      color: "bg-secondary",
    },
    {
      icon: MessageSquare,
      title: "Crovio Connect",
      description: "Community & Chat",
      details: "Join a thriving farming community, share knowledge, get AI-powered advice, and connect with fellow farmers.",
      link: "/community",
      color: "bg-accent",
    },
  ];

  const benefits = [
    "50,000+ active farmers trust AgriOne",
    "5,000+ verified dealers nationwide",
    "Real-time price updates every hour",
    "Multi-language support",
    "AI-powered crop advisory",
    "Low-bandwidth optimized",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Empowering Farmers with Smart Agriculture Solutions
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Connect with dealers, track prices, and join a thriving farming community - all in one platform
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/marketplace">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Three Powerful Platforms in One
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AgriOne brings together everything you need to succeed in modern farming
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-card-hover transition-all border-t-4" style={{ borderTopColor: `hsl(var(--${feature.color.replace('bg-', '')}))` }}>
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.details}</p>
                  <Link to={feature.link}>
                    <Button className="w-full gap-2">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Why Farmers Choose AgriOne
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <Card className="shadow-card-hover bg-gradient-card border-2 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Farming Experience?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already benefiting from AgriOne's comprehensive platform
            </p>
            <Link to="/marketplace">
              <Button size="lg" className="gap-2">
                Start Exploring
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
