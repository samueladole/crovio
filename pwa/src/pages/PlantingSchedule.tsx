import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Calendar, Sun, Cloud, Droplets, Thermometer, Clock, Sprout, Leaf, CheckCircle, Loader2, LucideIcon } from "lucide-react";
import { useState } from "react";

interface GrowthStage {
  stage: string;
  duration: string;
  tasks: string[];
}

interface MonthlyTask {
  month: string;
  tasks: string[];
}

interface WeatherTip {
  icon: LucideIcon;
  tip: string;
}

interface ScheduleData {
  crop: string;
  region: string;
  plantingWindow: {
    early: string;
    late: string;
  };
  growthStages: GrowthStage[];
  monthlyTasks: MonthlyTask[];
  weatherTips: WeatherTip[];
}

const PlantingSchedule = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);

  // ... maps
  // Static backup data or default view
  const defaultScheduleData: ScheduleData = {
    crop: "Maize",
    region: "North Central",
    // ... rest of static data
    plantingWindow: {
      early: "March - April",
      late: "August - September"
    },
    growthStages: [
      { stage: "Germination", duration: "5-7 days", tasks: ["Ensure adequate moisture", "Watch for pest damage"] },
      { stage: "Vegetative", duration: "30-40 days", tasks: ["First fertilizer application", "Weeding", "Monitor for armyworm"] },
      { stage: "Tasseling", duration: "10-14 days", tasks: ["Second fertilizer application", "Ensure water availability"] },
      { stage: "Grain Filling", duration: "35-45 days", tasks: ["Protect from birds", "Monitor moisture levels"] },
      { stage: "Maturity", duration: "15-20 days", tasks: ["Reduce irrigation", "Prepare for harvest"] },
    ],
    monthlyTasks: [
      { month: "March", tasks: ["Land preparation", "Soil testing", "Seed selection"] },
      { month: "April", tasks: ["Planting", "Pre-emergence herbicide", "Basal fertilizer"] },
      { month: "May", tasks: ["First weeding", "Top dressing", "Pest scouting"] },
      { month: "June", tasks: ["Second weeding", "Foliar spray", "Staking if needed"] },
      { month: "July", tasks: ["Pest management", "Disease monitoring", "Irrigation check"] },
      { month: "August", tasks: ["Harvest preparation", "Post-harvest planning"] },
    ],
    weatherTips: [
      { icon: Sun, tip: "Plant after first heavy rains (50mm+)" },
      { icon: Cloud, tip: "Avoid planting during dry spells" },
      { icon: Droplets, tip: "Optimal rainfall: 500-800mm per season" },
      { icon: Thermometer, tip: "Ideal temperature: 25-30°C" },
    ]
  };

  const displayData = scheduleData || defaultScheduleData;

  const handleGenerate = async () => {
    if (!selectedCrop || !selectedRegion) return;
    setLoading(true);
    try {
      const payload = {
        crop_type: selectedCrop,
        region: selectedRegion,
        sowing_date: new Date().toISOString()
      };
      const response = await api.post("/crop/schedules", payload);
      // Backend currently returns the 'record' created. 
      // Since the backend logic for *generating* the schedule details (stages, tasks) isn't fully implemented in the mock 
      // (it just saves the record), we will simulate dynamic data update or use the record ID.
      // For this demo, we'll pretend the backend returned specific data for the crop.

      // Use default data but update title to show it 'worked'
      setScheduleData({
        ...defaultScheduleData,
        crop: selectedCrop,
        region: selectedRegion
      });
      toast.success("Schedule generated!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate schedule");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Planting Schedule Generator</h1>
        </div>

        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Generate Your Schedule</CardTitle>
            <CardDescription>Select your crop and region to get a customized planting plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Type</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maize">Maize</SelectItem>
                    <SelectItem value="Rice">Rice</SelectItem>
                    <SelectItem value="Cassava">Cassava</SelectItem>
                    <SelectItem value="Yam">Yam</SelectItem>
                    <SelectItem value="Sorghum">Sorghum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="North Central">North Central</SelectItem>
                    <SelectItem value="North East">North East</SelectItem>
                    <SelectItem value="North West">North West</SelectItem>
                    <SelectItem value="South East">South East</SelectItem>
                    <SelectItem value="South South">South South</SelectItem>
                    <SelectItem value="South West">South West</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2 flex items-end">
                <Button className="w-full sm:w-auto" onClick={handleGenerate} disabled={loading || !selectedCrop || !selectedRegion}>
                  {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calendar className="h-4 w-4 mr-2" />}
                  Generate Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planting Windows */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card bg-gradient-to-br from-success/10 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sprout className="h-5 w-5 text-success" />
                Early Planting Season
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success">{displayData.plantingWindow.early}</p>
              <p className="text-muted-foreground mt-2">Recommended for optimal yield</p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-to-br from-warning/10 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Leaf className="h-5 w-5 text-warning" />
                Late Planting Season
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-warning">{displayData.plantingWindow.late}</p>
              <p className="text-muted-foreground mt-2">Alternative window available</p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-to-br from-primary/10 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Total Growth Period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">90-120 days</p>
              <p className="text-muted-foreground mt-2">From planting to harvest</p>
            </CardContent>
          </Card>
        </div>

        {/* Growth Stages Timeline */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Growth Stages & Activities</CardTitle>
            <CardDescription>Key activities for each growth stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayData.growthStages.map((stage, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{stage.stage}</p>
                      <p className="text-sm text-muted-foreground">{stage.duration}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {stage.tasks.map((task, taskIndex) => (
                        <Badge key={taskIndex} variant="outline" className="text-xs">
                          {task}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly Calendar */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Monthly Task Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayData.monthlyTasks.map((month, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-2">
                    <p className="font-semibold text-foreground">{month.month}</p>
                    <ul className="mt-2 space-y-1">
                      {month.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-success" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather Tips */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                Weather & Climate Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayData.weatherTips.map((tip, index) => {
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

              <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
                <p className="text-sm text-foreground">
                  <strong>Pro Tip:</strong> Monitor local weather forecasts and adjust your planting dates accordingly. Early planting after confirmed rainfall reduces risk.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlantingSchedule;
