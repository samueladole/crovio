import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface QueuedAction {
  id: string;
  type: string;
  data: Record<string, unknown>;
  timestamp: number;
  retries: number;
}

const SYNC_QUEUE_KEY = 'agrione-sync-queue';
const MAX_RETRIES = 3;

export const useBackgroundSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedActions, setQueuedActions] = useState<QueuedAction[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load queued actions from localStorage
  const loadQueue = useCallback(() => {
    try {
      const stored = localStorage.getItem(SYNC_QUEUE_KEY);
      if (stored) {
        setQueuedActions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading sync queue:', error);
    }
  }, []);

  // Save queue to localStorage
  const saveQueue = useCallback((actions: QueuedAction[]) => {
    try {
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(actions));
      setQueuedActions(actions);
    } catch (error) {
      console.error('Error saving sync queue:', error);
    }
  }, []);

  // Add action to queue
  const queueAction = useCallback((type: string, data: Record<string, unknown>) => {
    const action: QueuedAction = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      data,
      timestamp: Date.now(),
      retries: 0,
    };

    const newQueue = [...queuedActions, action];
    saveQueue(newQueue);

    if (!isOnline) {
      toast({
        title: 'Action queued',
        description: 'This will be synced when you\'re back online.',
      });
    }

    return action.id;
  }, [queuedActions, isOnline, saveQueue]);

  // Process a single action (mock implementation)
  const processAction = async (action: QueuedAction): Promise<boolean> => {
    // Simulate API call - replace with actual API calls
    console.log('Processing action:', action);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, this would make actual API calls based on action.type
    switch (action.type) {
      case 'set-price-alert':
        console.log('Setting price alert:', action.data);
        break;
      case 'contact-dealer':
        console.log('Contacting dealer:', action.data);
        break;
      case 'submit-review':
        console.log('Submitting review:', action.data);
        break;
      case 'save-favorite':
        console.log('Saving favorite:', action.data);
        break;
      default:
        console.log('Unknown action type:', action.type);
    }
    
    return true; // Return false to retry
  };

  // Sync all queued actions
  const syncAll = useCallback(async () => {
    if (!isOnline || queuedActions.length === 0 || isSyncing) return;

    setIsSyncing(true);
    const remainingActions: QueuedAction[] = [];
    let successCount = 0;

    for (const action of queuedActions) {
      try {
        const success = await processAction(action);
        if (success) {
          successCount++;
        } else if (action.retries < MAX_RETRIES) {
          remainingActions.push({ ...action, retries: action.retries + 1 });
        }
      } catch (error) {
        console.error('Error processing action:', error);
        if (action.retries < MAX_RETRIES) {
          remainingActions.push({ ...action, retries: action.retries + 1 });
        }
      }
    }

    saveQueue(remainingActions);
    setIsSyncing(false);

    if (successCount > 0) {
      toast({
        title: 'Sync complete',
        description: `${successCount} queued action${successCount > 1 ? 's' : ''} synced successfully.`,
      });
    }

    if (remainingActions.length > 0) {
      toast({
        title: 'Some actions pending',
        description: `${remainingActions.length} action${remainingActions.length > 1 ? 's' : ''} will retry later.`,
        variant: 'destructive',
      });
    }
  }, [isOnline, queuedActions, isSyncing, saveQueue]);

  // Remove action from queue
  const removeFromQueue = useCallback((actionId: string) => {
    const newQueue = queuedActions.filter(a => a.id !== actionId);
    saveQueue(newQueue);
  }, [queuedActions, saveQueue]);

  // Clear entire queue
  const clearQueue = useCallback(() => {
    saveQueue([]);
  }, [saveQueue]);

  // Online/offline event listeners
  useEffect(() => {
    loadQueue();

    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: 'Back online',
        description: 'Syncing queued actions...',
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: 'You\'re offline',
        description: 'Actions will be queued and synced when back online.',
        variant: 'destructive',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadQueue]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && queuedActions.length > 0) {
      syncAll();
    }
  }, [isOnline, queuedActions.length, syncAll]);

  return {
    isOnline,
    queuedActions,
    isSyncing,
    queueAction,
    syncAll,
    removeFromQueue,
    clearQueue,
    pendingCount: queuedActions.length,
  };
};
