import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Beaker, Droplets, Leaf, Mountain, Sun, Thermometer, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

const SoilAnalysis = () => {
  const [location, setLocation] = useState("");
  const [soilType, setSoilType] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organicMatter: number;
    moisture: number;
    recommendations: string[];
    suitableCrops: string[];
  } | null>(null);

  const nigerianRegions = [
    "North Central", "North East", "North West", 
    "South East", "South South", "South West"
  ];

  const soilTypes = [
    "Sandy", "Loamy", "Clay", "Sandy Loam", "Clay Loam", "Silty"
  ];

  const handleAnalyze = async () => {
    if (!location || !soilType) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis results based on region and soil type
    setResults({
      ph: 6.2,
      nitrogen: 65,
      phosphorus: 45,
      potassium: 78,
      organicMatter: 3.5,
      moisture: 42,
      recommendations: [
        "Apply NPK 15-15-15 fertilizer at 200kg/hectare",
        "Add organic compost to improve nitrogen levels",
        "Consider lime application to raise pH slightly",
        "Implement mulching to retain soil moisture"
      ],
      suitableCrops: ["Maize", "Cassava", "Yam", "Groundnut", "Cowpea", "Sorghum"]
    });
    setIsAnalyzing(false);
  };

  const getNutrientStatus = (value: number) => {
    if (value >= 70) return { label: "Good", color: "text-success" };
    if (value >= 40) return { label: "Moderate", color: "text-warning" };
    return { label: "Low", color: "text-destructive" };
  };

  const getPhStatus = (ph: number) => {
    if (ph >= 6 && ph <= 7) return { label: "Optimal", color: "text-success" };
    if (ph >= 5.5 || ph <= 7.5) return { label: "Acceptable", color: "text-warning" };
    return { label: "Needs Correction", color: "text-destructive" };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🧪 Soil Analysis
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get detailed soil health insights and fertilizer recommendations for your farm
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <Card className="shadow-card lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mountain className="h-5 w-5 text-primary" />
                Farm Details
              </CardTitle>
              <CardDescription>
                Enter your farm location and soil information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianRegions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soil-type">Soil Type</Label>
                <Select onValueChange={setSoilType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farm-size">Farm Size (Hectares)</Label>
                <Input id="farm-size" type="number" placeholder="e.g., 2.5" />
              </div>

              <Button 
                className="w-full" 
                disabled={!location || !soilType || isAnalyzing}
                onClick={handleAnalyze}
              >
                {isAnalyzing ? (
                  <>
                    <Beaker className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Beaker className="h-4 w-4 mr-2" />
                    Analyze Soil
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Nutrient Levels */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Nutrient Analysis</CardTitle>
                    <CardDescription>Current soil nutrient levels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* pH Level */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Beaker className="h-4 w-4 text-primary" />
                            pH Level
                          </span>
                          <span className={`text-sm font-medium ${getPhStatus(results.ph).color}`}>
                            {results.ph} - {getPhStatus(results.ph).label}
                          </span>
                        </div>
                        <Progress value={(results.ph / 14) * 100} className="h-2" />
                      </div>

                      {/* Nitrogen */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Leaf className="h-4 w-4 text-success" />
                            Nitrogen (N)
                          </span>
                          <span className={`text-sm font-medium ${getNutrientStatus(results.nitrogen).color}`}>
                            {results.nitrogen}% - {getNutrientStatus(results.nitrogen).label}
                          </span>
                        </div>
                        <Progress value={results.nitrogen} className="h-2" />
                      </div>

                      {/* Phosphorus */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Sun className="h-4 w-4 text-warning" />
                            Phosphorus (P)
                          </span>
                          <span className={`text-sm font-medium ${getNutrientStatus(results.phosphorus).color}`}>
                            {results.phosphorus}% - {getNutrientStatus(results.phosphorus).label}
                          </span>
                        </div>
                        <Progress value={results.phosphorus} className="h-2" />
                      </div>

                      {/* Potassium */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-destructive" />
                            Potassium (K)
                          </span>
                          <span className={`text-sm font-medium ${getNutrientStatus(results.potassium).color}`}>
                            {results.potassium}% - {getNutrientStatus(results.potassium).label}
                          </span>
                        </div>
                        <Progress value={results.potassium} className="h-2" />
                      </div>

                      {/* Organic Matter */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Mountain className="h-4 w-4 text-secondary" />
                            Organic Matter
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {results.organicMatter}%
                          </span>
                        </div>
                        <Progress value={results.organicMatter * 10} className="h-2" />
                      </div>

                      {/* Moisture */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-primary" />
                            Moisture Content
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {results.moisture}%
                          </span>
                        </div>
                        <Progress value={results.moisture} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-warning" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Suitable Crops */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      Suitable Crops
                    </CardTitle>
                    <CardDescription>
                      Crops that will thrive in your soil conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {results.suitableCrops.map((crop, index) => (
                        <Badge key={index} variant="secondary" className="text-base py-1 px-3">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <Beaker className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Enter your farm details
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Select your region and soil type to get personalized soil analysis and recommendations
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SoilAnalysis;
