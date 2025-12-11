import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, BellOff, TrendingUp, ShoppingBag, MessageSquare } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useState } from "react";

export const NotificationSettings = () => {
  const { permission, isSupported, requestPermission } = usePushNotifications();
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);
  const [communityAlerts, setCommunityAlerts] = useState(false);

  const handleEnableNotifications = async () => {
    await requestPermission();
  };

  if (!isSupported) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="h-5 w-5 text-muted-foreground" />
            Notifications Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your browser doesn't support push notifications. Try using a modern browser like Chrome, Firefox, or Edge.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Push Notifications
        </CardTitle>
        <CardDescription>
          Get alerts for price changes, new deals, and community updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {permission !== 'granted' ? (
          <div className="p-4 bg-muted rounded-lg text-center space-y-4">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="text-foreground">
              Enable notifications to stay updated on price changes and new deals
            </p>
            <Button onClick={handleEnableNotifications}>
              <Bell className="h-4 w-4 mr-2" />
              Enable Notifications
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="price-alerts" className="font-medium">Price Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when crop prices change significantly
                  </p>
                </div>
              </div>
              <Switch 
                id="price-alerts" 
                checked={priceAlerts} 
                onCheckedChange={setPriceAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-secondary" />
                <div>
                  <Label htmlFor="deal-alerts" className="font-medium">Deal Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new deals and discounts
                  </p>
                </div>
              </div>
              <Switch 
                id="deal-alerts" 
                checked={dealAlerts} 
                onCheckedChange={setDealAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-accent" />
                <div>
                  <Label htmlFor="community-alerts" className="font-medium">Community Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about replies and mentions
                  </p>
                </div>
              </div>
              <Switch 
                id="community-alerts" 
                checked={communityAlerts} 
                onCheckedChange={setCommunityAlerts}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-success flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications are enabled
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
