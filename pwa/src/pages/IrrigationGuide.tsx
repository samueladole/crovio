import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, Cloud, Sun, Thermometer, Clock, AlertTriangle, CheckCircle, Calculator, Waves } from "lucide-react";
import { useState } from "react";

const IrrigationGuide = () => {
  const [crop, setCrop] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [soilType, setSoilType] = useState("");
  const [results, setResults] = useState<{
    dailyWater: number;
    weeklySchedule: { day: string; amount: number; time: string }[];
    recommendations: string[];
  } | null>(null);

  const crops = ["Maize", "Rice", "Tomato", "Pepper", "Cassava", "Vegetables"];
  const soilTypes = ["Sandy", "Loamy", "Clay", "Sandy Loam"];

  const irrigationMethods = [
    {
      name: "Drip Irrigation",
      efficiency: 90,
      cost: "High",
      bestFor: ["Vegetables", "Tomato", "Pepper"],
      description: "Water delivered directly to plant roots through tubes"
    },
    {
      name: "Sprinkler System",
      efficiency: 75,
      cost: "Medium",
      bestFor: ["Maize", "Vegetables", "Groundnut"],
      description: "Water sprayed over crops like rainfall"
    },
    {
      name: "Furrow Irrigation",
      efficiency: 60,
      cost: "Low",
      bestFor: ["Maize", "Rice", "Sugarcane"],
      description: "Water flows through channels between crop rows"
    },
    {
      name: "Basin Irrigation",
      efficiency: 55,
      cost: "Low",
      bestFor: ["Rice", "Vegetables"],
      description: "Water floods enclosed basins around crops"
    }
  ];

  const waterConservationTips = [
    { icon: Clock, tip: "Irrigate early morning (6-8 AM) or evening (5-7 PM) to reduce evaporation" },
    { icon: Droplets, tip: "Mulch around plants to retain soil moisture by up to 70%" },
    { icon: Cloud, tip: "Check weather forecast - skip irrigation before expected rainfall" },
    { icon: Sun, tip: "Install shade nets during peak heat to reduce water requirements" },
  ];

  const handleCalculate = () => {
    if (!crop || !farmSize || !soilType) return;
    
    setResults({
      dailyWater: 5000,
      weeklySchedule: [
        { day: "Monday", amount: 5000, time: "6:00 AM" },
        { day: "Wednesday", amount: 5000, time: "6:00 AM" },
        { day: "Friday", amount: 5000, time: "6:00 AM" },
        { day: "Sunday", amount: 3000, time: "6:00 AM" },
      ],
      recommendations: [
        "Use drip irrigation for 40% water savings",
        "Monitor soil moisture before each irrigation",
        "Consider rainwater harvesting to supplement",
        "Apply mulch to reduce evaporation by 25-30%"
      ]
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            💧 Irrigation Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Optimize water usage and irrigation schedules for maximum crop yield
          </p>
        </div>

        {/* Water Calculator */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Water Requirement Calculator
            </CardTitle>
            <CardDescription>
              Calculate optimal water needs for your farm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Crop Type</Label>
                <Select onValueChange={setCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Farm Size (Hectares)</Label>
                <Input 
                  type="number" 
                  placeholder="e.g., 2" 
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Soil Type</Label>
                <Select onValueChange={setSoilType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full" onClick={handleCalculate}>
                  <Droplets className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
              </div>
            </div>

            {results && (
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">Daily Water Requirement</p>
                  <p className="text-3xl font-bold text-primary">
                    {results.dailyWater.toLocaleString()} L
                  </p>
                  <p className="text-sm text-muted-foreground">per hectare</p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-muted-foreground">Weekly Total</p>
                  <p className="text-3xl font-bold text-success">
                    {(results.dailyWater * 4).toLocaleString()} L
                  </p>
                  <p className="text-sm text-muted-foreground">4 irrigation days</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Irrigation Schedule */}
        {results && (
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recommended Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.weeklySchedule.map((day, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg text-center">
                    <p className="font-semibold text-foreground">{day.day}</p>
                    <p className="text-2xl font-bold text-primary my-2">{day.amount.toLocaleString()}L</p>
                    <Badge variant="outline">{day.time}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
                <p className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <strong>Note:</strong> Adjust schedule based on rainfall. Skip irrigation day if 10mm+ rain expected.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Irrigation Methods Comparison */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-primary" />
              Irrigation Methods Comparison
            </CardTitle>
            <CardDescription>
              Choose the best method for your farm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {irrigationMethods.map((method, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{method.name}</h3>
                    <Badge variant={method.cost === "Low" ? "secondary" : method.cost === "Medium" ? "outline" : "default"}>
                      {method.cost} Cost
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Water Efficiency</span>
                      <span className="font-medium text-foreground">{method.efficiency}%</span>
                    </div>
                    <Progress value={method.efficiency} className="h-2" />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-1">Best for:</p>
                    <div className="flex flex-wrap gap-1">
                      {method.bestFor.map((crop, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Water Conservation Tips */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Water Conservation Tips
            </CardTitle>
            <CardDescription>
              Save water and reduce irrigation costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {waterConservationTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-foreground">{tip.tip}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default IrrigationGuide;
