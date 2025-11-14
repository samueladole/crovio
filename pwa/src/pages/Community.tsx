import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Users, Send, Bot } from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "Best practices for monsoon preparation",
    author: "Rajesh Kumar",
    region: "Maharashtra",
    replies: 23,
    category: "Weather & Seasons",
  },
  {
    id: 2,
    title: "Organic fertilizer recommendations needed",
    author: "Priya Singh",
    region: "Punjab",
    replies: 15,
    category: "Fertilizers",
  },
  {
    id: 3,
    title: "Drip irrigation setup guide",
    author: "Amit Patel",
    region: "Gujarat",
    replies: 34,
    category: "Irrigation",
  },
];

const activeChats = [
  {
    id: 1,
    name: "Maharashtra Farmers",
    members: 234,
    lastMessage: "Anyone using biofertilizers this season?",
    time: "5m ago",
  },
  {
    id: 2,
    name: "Rice Cultivation Tips",
    members: 456,
    lastMessage: "Pest control methods discussion",
    time: "15m ago",
  },
  {
    id: 3,
    name: "Organic Farming",
    members: 189,
    lastMessage: "Compost preparation techniques",
    time: "1h ago",
  },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Crovio Connect
          </h1>
          <p className="text-muted-foreground text-lg">
            Join the farming community, share knowledge, and get expert advice
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Assistant */}
            <Card className="shadow-card border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle>AI Farming Assistant</CardTitle>
                    <CardDescription>Get instant advice powered by AI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">
                      Ask me anything about crop management, pest control, weather planning, and more...
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Type your question..." />
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Discussions */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Popular Discussions</h2>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="shadow-card hover:shadow-card-hover transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <CardTitle className="text-lg">{discussion.title}</CardTitle>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>by {discussion.author}</span>
                            <span>•</span>
                            <span>{discussion.region}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{discussion.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm">{discussion.replies} replies</span>
                        </div>
                        <Button size="sm" variant="outline">View Discussion</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-primary">50,000+</div>
                  <div className="text-sm text-muted-foreground">Active Farmers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-muted-foreground">Verified Dealers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1,200+</div>
                  <div className="text-sm text-muted-foreground">Active Discussions</div>
                </div>
              </CardContent>
            </Card>

            {/* Active Chats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Chat Rooms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-3 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{chat.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {chat.members} members
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 truncate">
                          {chat.lastMessage}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {chat.time}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Chats
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
