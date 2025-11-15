import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, ThumbsUp } from "lucide-react";

const DiscussionDetail = () => {
  const { id } = useParams();

  const discussion = {
    id: id,
    title: "Best fertilizer for wheat crop in winter?",
    author: "Rajesh Kumar",
    region: "Punjab",
    category: "Wheat",
    content: "I'm planning to sow wheat this winter season. What's the best fertilizer to use for better yield? I have 5 acres of land.",
    replies: 12,
    likes: 8,
    createdAt: "2 days ago",
  };

  const replies = [
    {
      id: 1,
      author: "Suresh Patel",
      region: "Haryana",
      content: "I recommend using DAP fertilizer at the time of sowing. Follow up with urea after 3-4 weeks.",
      likes: 5,
      createdAt: "2 days ago",
    },
    {
      id: 2,
      author: "Amit Singh",
      region: "Punjab",
      content: "NPK 20-20-20 works well. Also add zinc sulfate for better root development.",
      likes: 3,
      createdAt: "1 day ago",
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

        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">{discussion.category}</Badge>
                  <CardTitle className="text-2xl mb-3">{discussion.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                      </Avatar>
                      <span>{discussion.author}</span>
                    </div>
                    <span>•</span>
                    <span>{discussion.region}</span>
                    <span>•</span>
                    <span>{discussion.createdAt}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-4">{discussion.content}</p>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {discussion.likes}
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  {discussion.replies} replies
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{replies.length} Replies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {replies.map((reply) => (
                <div key={reply.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{reply.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{reply.author}</span>
                        <span className="text-sm text-muted-foreground">• {reply.region}</span>
                        <span className="text-sm text-muted-foreground">• {reply.createdAt}</span>
                      </div>
                      <p className="text-foreground">{reply.content}</p>
                      <Button variant="ghost" size="sm" className="gap-2 mt-2">
                        <ThumbsUp className="h-3 w-3" />
                        {reply.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Add Your Reply</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Textarea 
                  placeholder="Share your thoughts or advice..."
                  rows={4}
                />
                <Button size="lg">Post Reply</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
