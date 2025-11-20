import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";

const formSchema = z.object({
  commodity: z.string().min(1, "Please select a commodity"),
  condition: z.string().min(1, "Please select a condition"),
  targetPrice: z.string().min(1, "Target price is required"),
  notificationMethod: z.string().min(1, "Please select a notification method"),
});

const SetPriceAlert = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commodity: "",
      condition: "",
      targetPrice: "",
      notificationMethod: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Price Alert Set",
      description: "You will be notified when the price condition is met.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/prices" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Price Intelligence
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Set Price Alert
          </h1>
          <p className="text-muted-foreground">
            Get notified when prices match your criteria
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Alert Configuration</CardTitle>
            <CardDescription>
              Set up your custom price alert to stay informed about market changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="commodity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Product/Commodity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="npk-fertilizer">NPK Fertilizer 20-20-20</SelectItem>
                          <SelectItem value="organic-compost">Organic Compost Premium</SelectItem>
                          <SelectItem value="pesticide-spray">Pesticide Spray</SelectItem>
                          <SelectItem value="drip-irrigation">Drip Irrigation Kit</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="above">Price goes above</SelectItem>
                          <SelectItem value="below">Price goes below</SelectItem>
                          <SelectItem value="increase">Increase by more than</SelectItem>
                          <SelectItem value="decrease">Decrease by more than</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Price/Percentage</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            ₦
                          </span>
                          <Input 
                            placeholder="Enter amount or percentage" 
                            className="pl-8"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter price in Naira or percentage (e.g., 1200 or 10% for percentage-based alerts)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notificationMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How should we notify you?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="both">Email & SMS</SelectItem>
                          <SelectItem value="app">In-App Notification</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Alert
                  </Button>
                  <Link to="/prices" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-card mt-6">
          <CardHeader>
            <CardTitle>Your Active Alerts</CardTitle>
            <CardDescription>Manage your existing price alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="font-semibold">NPK Fertilizer 20-20-20</div>
                  <div className="text-sm text-muted-foreground">Alert when price goes below ₦1,100</div>
                </div>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="font-semibold">Organic Compost Premium</div>
                  <div className="text-sm text-muted-foreground">Alert when price increases by more than 5%</div>
                </div>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
              <div className="text-center text-muted-foreground text-sm py-4">
                You have 2 active alerts
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SetPriceAlert;
