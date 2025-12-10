import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rocket, Bell, Leaf, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when AgriOne launches.",
      });
      setEmail("");
    }
  };

  const features = [
    { icon: Leaf, label: "Smart Marketplace" },
    { icon: TrendingUp, label: "Price Intelligence" },
    { icon: Users, label: "Farmer Community" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-hero flex items-center justify-center animate-float">
              <span className="text-primary-foreground font-bold text-3xl">A</span>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-bounce-subtle">
            <Rocket className="h-4 w-4" />
            Launching Soon
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Something Amazing is{" "}
            <span className="text-primary">Growing</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
            AgriOne is preparing to revolutionize farming with smart marketplace, 
            real-time prices, and a thriving community. Be the first to know when we launch!
          </p>

          {/* Features Preview */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.label}</span>
                </div>
              );
            })}
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12"
              required
            />
            <Button type="submit" size="lg" className="gap-2 h-12">
              <Bell className="h-4 w-4" />
              Notify Me
            </Button>
          </form>

          {/* Social Proof */}
          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-foreground">2,500+</span> farmers already on the waitlist
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-border relative z-10">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} AgriOne. Engineered by{" "}
          <span className="font-semibold text-foreground">Samuel Adole</span>
        </p>
      </footer>
    </div>
  );
};

export default ComingSoon;
