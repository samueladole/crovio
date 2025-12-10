import { ShoppingBag, TrendingUp, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    number: 1,
    icon: ShoppingBag,
    title: "Browse & Connect",
    description: "Find verified dealers and quality agricultural products in the marketplace",
    color: "bg-primary",
  },
  {
    number: 2,
    icon: TrendingUp,
    title: "Track Prices",
    description: "Monitor real-time prices and set smart alerts for your commodities",
    color: "bg-secondary",
  },
  {
    number: 3,
    icon: MessageSquare,
    title: "Join Community",
    description: "Connect with farmers, share knowledge, and get AI-powered advice",
    color: "bg-accent",
  },
  {
    number: 4,
    icon: Sparkles,
    title: "Grow Together",
    description: "Make informed decisions and grow your farming success with AgriOne",
    color: "bg-success",
  },
];

export const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Animate steps appearing one by one
    const timer = setInterval(() => {
      setVisibleSteps((prev) => {
        if (prev.length < steps.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Cycle through active step highlight
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-bounce-subtle">
            <Sparkles className="h-4 w-4" />
            Easy to Get Started
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How AgriOne Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in just a few simple steps and transform your farming experience
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-1 bg-border rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-1000"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isVisible = visibleSteps.includes(index);
              const isActive = activeStep === index;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center text-center transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Step Number & Icon Container */}
                  <div className="relative mb-4 md:mb-6">
                    {/* Pulse ring for active step */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full animate-ping-slow bg-primary/20" />
                    )}
                    
                    {/* Icon Circle */}
                    <div
                      className={`relative z-10 h-16 w-16 md:h-20 md:w-20 rounded-full ${step.color} flex items-center justify-center transform transition-all duration-300 ${
                        isActive ? "scale-110 shadow-lg" : "scale-100"
                      }`}
                    >
                      <Icon className="h-7 w-7 md:h-8 md:w-8 text-primary-foreground" />
                    </div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-1 -right-1 h-6 w-6 md:h-7 md:w-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      <span className="text-xs md:text-sm font-bold text-primary">{step.number}</span>
                    </div>
                  </div>

                  {/* Step Content */}
                  <h3 className={`text-lg md:text-xl font-semibold text-foreground mb-2 transition-colors duration-300 ${
                    isActive ? "text-primary" : ""
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-4 text-muted-foreground animate-bounce-subtle">
                      <ArrowRight className="h-5 w-5 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Dots - Mobile friendly indicator */}
        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStep === index 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
