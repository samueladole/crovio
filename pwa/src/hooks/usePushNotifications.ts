import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  data?: Record<string, unknown>;
}

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('Notification' in window && 'serviceWorker' in navigator);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      toast({
        title: 'Notifications not supported',
        description: 'Your browser does not support push notifications.',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        toast({
          title: 'Notifications enabled',
          description: 'You will now receive alerts for price changes and new deals.',
        });
        return true;
      } else {
        toast({
          title: 'Notifications blocked',
          description: 'Enable notifications in your browser settings to receive alerts.',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const sendNotification = useCallback(async (options: NotificationOptions) => {
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(options.title, {
        body: options.body,
        icon: options.icon || '/icons/icon-192x192.png',
        tag: options.tag,
        data: options.data,
        badge: '/icons/icon-72x72.png',
      });
    } catch (error) {
      // Fallback to basic notification
      new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/icons/icon-192x192.png',
        tag: options.tag,
      });
    }
  }, [permission]);

  const notifyPriceChange = useCallback((cropName: string, oldPrice: number, newPrice: number, trend: 'up' | 'down') => {
    const trendEmoji = trend === 'up' ? '📈' : '📉';
    const changePercent = Math.abs(((newPrice - oldPrice) / oldPrice) * 100).toFixed(1);
    
    sendNotification({
      title: `${trendEmoji} Price Alert: ${cropName}`,
      body: `Price changed from ₦${oldPrice.toLocaleString()} to ₦${newPrice.toLocaleString()} (${changePercent}% ${trend})`,
      tag: `price-${cropName}`,
      data: { type: 'price-change', cropName, oldPrice, newPrice },
    });
  }, [sendNotification]);

  const notifyNewDeal = useCallback((dealTitle: string, discount: number, dealerName: string) => {
    sendNotification({
      title: `🎉 New Deal: ${dealTitle}`,
      body: `${discount}% off from ${dealerName}! Limited time offer.`,
      tag: `deal-${dealTitle}`,
      data: { type: 'new-deal', dealTitle, discount, dealerName },
    });
  }, [sendNotification]);

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
    notifyPriceChange,
    notifyNewDeal,
  };
};
