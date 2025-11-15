import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, MessageSquare } from "lucide-react";

const ChatRooms = () => {
  const chatRooms = [
    {
      id: 1,
      name: "Wheat Farmers Punjab",
      members: 156,
      lastMessage: "Anyone tried the new wheat variety?",
      time: "5m ago",
      category: "Wheat",
      unread: 3,
    },
    {
      id: 2,
      name: "Cotton Growing Tips",
      members: 89,
      lastMessage: "Best time to spray pesticides?",
      time: "12m ago",
      category: "Cotton",
      unread: 0,
    },
    {
      id: 3,
      name: "Rice Farming Maharashtra",
      members: 234,
      lastMessage: "Water management is crucial",
      time: "1h ago",
      category: "Rice",
      unread: 7,
    },
    {
      id: 4,
      name: "Organic Farming",
      members: 178,
      lastMessage: "Sharing my compost recipe",
      time: "2h ago",
      category: "Organic",
      unread: 0,
    },
    {
      id: 5,
      name: "Vegetable Growers",
      members: 145,
      lastMessage: "Tomato prices are up this week",
      time: "3h ago",
      category: "Vegetables",
      unread: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/community" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Community
        </Link>

        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Chat Rooms
            </h1>
            <p className="text-muted-foreground">Join conversations with farmers in your region</p>
          </div>

          <div className="grid gap-4">
            {chatRooms.map((room) => (
              <Link key={room.id} to={`/community/chat/${room.id}`}>
                <Card className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {room.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-foreground">{room.name}</h3>
                            <Badge variant="secondary">{room.category}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2 truncate">
                            {room.lastMessage}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {room.members} members
                            </div>
                            <span>•</span>
                            <span>{room.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {room.unread > 0 && (
                          <Badge variant="default" className="rounded-full">
                            {room.unread}
                          </Badge>
                        )}
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;
