import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Scan, AlertTriangle, CheckCircle, Leaf, Bug, Droplets, Info } from "lucide-react";
import { useState } from "react";

const CropDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
    treatment: string[];
    prevention: string[];
  } | null>(null);

  const commonDiseases = [
    { name: "Leaf Blight", crops: ["Maize", "Rice"], icon: Leaf },
    { name: "Root Rot", crops: ["Cassava", "Yam"], icon: Bug },
    { name: "Bacterial Wilt", crops: ["Tomato", "Pepper"], icon: Droplets },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setResult({
      disease: "Leaf Blight (Helminthosporium)",
      confidence: 87,
      severity: 'medium',
      treatment: [
        "Apply fungicide (Mancozeb or Copper-based) immediately",
        "Remove and destroy infected leaves",
        "Improve air circulation between plants",
        "Reduce overhead irrigation"
      ],
      prevention: [
        "Use disease-resistant varieties",
        "Practice crop rotation (2-3 years)",
        "Maintain proper plant spacing",
        "Apply preventive fungicide during wet seasons"
      ]
    });
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🔬 Crop Disease Detection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your crop and our AI will identify diseases and recommend treatments
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Upload Crop Image
              </CardTitle>
              <CardDescription>
                Take a clear photo of the affected leaf or plant part
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded crop" 
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <Button variant="outline" onClick={() => setSelectedImage(null)}>
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Drag and drop or click to upload
                    </p>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>Choose File</span>
                      </Button>
                    </Label>
                    <Input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full gap-2" 
                disabled={!selectedImage || isAnalyzing}
                onClick={handleAnalyze}
              >
                {isAnalyzing ? (
                  <>
                    <Scan className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Scan className="h-4 w-4" />
                    Analyze Image
                  </>
                )}
              </Button>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  For best results, take photos in natural daylight and focus on the affected area
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {result ? (
              <>
                <Card className="shadow-card border-l-4 border-l-warning">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        Detection Result
                      </CardTitle>
                      <Badge variant={result.severity === 'high' ? 'destructive' : result.severity === 'medium' ? 'secondary' : 'outline'}>
                        {result.severity.toUpperCase()} Severity
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xl font-semibold text-foreground">{result.disease}</p>
                      <p className="text-muted-foreground">
                        Confidence: {result.confidence}%
                      </p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <Bug className="h-5 w-5" />
                      Recommended Treatment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.treatment.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-bold">{index + 1}.</span>
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-success">
                      <CheckCircle className="h-5 w-5" />
                      Prevention Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.prevention.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Common Crop Diseases</CardTitle>
                  <CardDescription>
                    Diseases frequently detected in Nigerian farms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {commonDiseases.map((disease, index) => {
                      const Icon = disease.icon;
                      return (
                        <div key={index} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{disease.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Affects: {disease.crops.join(", ")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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

export default CropDiseaseDetection;
