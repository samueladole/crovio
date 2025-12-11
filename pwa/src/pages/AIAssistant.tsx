import { Navigation } from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Send, Image, MapPin, Calendar, Droplet } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AIAssistant = () => {
  const [message, setMessage] = useState("");

  const conversations = [
    {
      id: 1,
      question: "What's the best time to plant rice?",
      answer:
        "The best time to plant rice is during the monsoon season, typically from June to July. Ensure the soil is well-prepared and has adequate moisture.",
      time: "2 hours ago",
    },
    {
      id: 2,
      question: "How do I deal with pest infestation?",
      answer:
        "For pest control, identify the pest type first. Use neem-based organic pesticides for minor infestations. For severe cases, consult with local agricultural experts for appropriate chemical solutions.",
      time: "Yesterday",
    },
  ];

  const quickActions = [
    {
      icon: Image,
      label: "Crop Disease Detection",
      description: "Upload crop image",
      link: "/tools/disease-detection",
    },
    {
      icon: MapPin,
      label: "Soil Analysis",
      description: "Check soil health",
      link: "/tools/soil-analysis",
    },
    {
      icon: Calendar,
      label: "Planting Schedule",
      description: "Best times to sow",
      link: "/tools/planting-schedule",
    },
    {
      icon: Droplet,
      label: "Irrigation Guide",
      description: "Water management",
      link: "/tools/irrigation-guide",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              AI Farming Assistant
            </h1>
            <p className="text-muted-foreground">
              Get expert advice on crops, diseases, weather, and more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
              >
                <Link to={action.link}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {action.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>
                Your recent interactions with AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="border-b border-border last:border-0 pb-6 last:pb-0"
                >
                  <div className="flex gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">You</span>
                        <span className="text-xs text-muted-foreground">
                          {conv.time}
                        </span>
                      </div>
                      <p className="text-foreground">{conv.question}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 ml-11">
                    <Badge
                      variant="secondary"
                      className="h-6 w-6 rounded-full p-0 flex items-center justify-center"
                    >
                      <Sparkles className="h-3 w-3" />
                    </Badge>
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="font-semibold">AI Assistant</span>
                      </div>
                      <p className="text-muted-foreground">{conv.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask anything about farming..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Try asking about crop diseases, weather patterns, or best
                farming practices
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
