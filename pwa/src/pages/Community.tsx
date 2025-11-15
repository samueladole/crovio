import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Users, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Crovio Connect
          </h1>
          <p className="text-muted-foreground text-lg">
            Join the farming community, share knowledge, and get expert advice
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Link to="/ai-assistant">
              <Card className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Farming Assistant
                  </CardTitle>
                  <CardDescription>Get expert advice on your farming questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Ask about crops, diseases, weather..." />
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Try asking: "What's the best fertilizer for wheat?"
                  </p>
                </CardContent>
              </Card>
            </Link>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Popular Discussions</h2>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Link key={discussion.id} to={`/community/discussion/${discussion.id}`}>
                    <Card className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <h3 className="font-semibold text-lg text-foreground">{discussion.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>by {discussion.author}</span>
                              <span>•</span>
                              <span>{discussion.region}</span>
                            </div>
                          </div>
                          <Badge variant="outline">{discussion.category}</Badge>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">{discussion.replies} replies</span>
                          </div>
                          <Button size="sm" variant="outline">View Discussion</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
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

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Active Chat Rooms</CardTitle>
                <Link to="/community/chats">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeChats.map((chat) => (
                  <Link key={chat.id} to={`/community/chat/${chat.id}`}>
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{chat.name}</span>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <Users className="h-3 w-3" />
                          {chat.members} members
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
