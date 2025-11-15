import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, Package, TrendingUp, MessageSquare, Settings, BarChart3 } from "lucide-react";

const Admin = () => {
  const adminSections = [
    {
      title: "Dealers Management",
      description: "Manage dealer accounts and permissions",
      icon: Users,
      path: "/admin/dealers",
      color: "text-blue-500",
    },
    {
      title: "Products Management",
      description: "Add, edit, and remove marketplace products",
      icon: Package,
      path: "/admin/products",
      color: "text-green-500",
    },
    {
      title: "Prices & Alerts",
      description: "Manage price data and alert settings",
      icon: TrendingUp,
      path: "/admin/prices",
      color: "text-orange-500",
    },
    {
      title: "Discussions",
      description: "Moderate community discussions",
      icon: MessageSquare,
      path: "/admin/discussions",
      color: "text-purple-500",
    },
    {
      title: "Analytics",
      description: "View platform analytics and insights",
      icon: BarChart3,
      path: "/admin/analytics",
      color: "text-pink-500",
    },
    {
      title: "Settings",
      description: "Configure platform settings",
      icon: Settings,
      path: "/settings",
      color: "text-gray-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage all aspects of the AgriOne platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.path} to={section.path}>
                <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 h-full cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className={`h-6 w-6 ${section.color}`} />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
