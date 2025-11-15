import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, TrendingUp, MessageSquare, Sparkles } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: "Marketplace",
      description: "Connect with verified dealers and find quality agricultural inputs at competitive prices.",
    },
    {
      icon: TrendingUp,
      title: "Price Intelligence",
      description: "Track real-time prices, analyze trends, and make informed purchasing decisions.",
    },
    {
      icon: MessageSquare,
      title: "Community",
      description: "Join discussions with fellow farmers, share experiences, and learn from each other.",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Get instant expert advice on crops, diseases, and farming best practices.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              About AgriOne
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering farmers with technology to make better decisions and improve their livelihoods
            </p>
          </div>

          <Card className="shadow-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                AgriOne is dedicated to transforming agriculture by providing farmers with access to reliable information, 
                fair pricing, and a supportive community. We believe that technology can bridge the gap between farmers 
                and the resources they need to succeed.
              </p>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Our Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 h-fit">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="shadow-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Impact</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-muted-foreground">Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5K+</div>
                  <div className="text-muted-foreground">Dealers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100K+</div>
                  <div className="text-muted-foreground">Transactions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-hero">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                Join Our Community
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Be part of a growing network of farmers leveraging technology for better outcomes
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary" className="text-lg py-2 px-4">
                  Free to Join
                </Badge>
                <Badge variant="secondary" className="text-lg py-2 px-4">
                  No Hidden Fees
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
