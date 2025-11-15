import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, Users } from "lucide-react";
import { useState } from "react";

const ChatRoom = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const chatRoom = {
    id: id,
    name: "Wheat Farmers Punjab",
    members: 156,
    category: "Wheat",
  };

  const messages = [
    {
      id: 1,
      author: "Rajesh Kumar",
      content: "Good morning everyone! Has anyone started sowing yet?",
      time: "9:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      author: "Suresh Patel",
      content: "Yes, I started last week. Weather seems good this year.",
      time: "9:32 AM",
      isOwn: false,
    },
    {
      id: 3,
      author: "You",
      content: "I'm planning to start next week. Any tips?",
      time: "9:35 AM",
      isOwn: true,
    },
    {
      id: 4,
      author: "Amit Singh",
      content: "Make sure to prepare the field well. I use a rotavator.",
      time: "9:38 AM",
      isOwn: false,
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 py-4 flex-1 flex flex-col">
        <Link to="/community/chats" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Chat Rooms
        </Link>

        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <Card className="shadow-card mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                    {chatRoom.name}
                    <Badge variant="secondary">{chatRoom.category}</Badge>
                  </h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {chatRoom.members} members
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card flex-1 flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{msg.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col ${msg.isOwn ? "items-end" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold">{msg.author}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <div
                        className={`rounded-lg px-4 py-2 max-w-md ${
                          msg.isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
