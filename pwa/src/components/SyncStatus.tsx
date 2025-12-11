import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Wifi, WifiOff, Cloud, CloudOff } from "lucide-react";
import { useBackgroundSync } from "@/hooks/useBackgroundSync";

export const SyncStatus = () => {
  const { isOnline, pendingCount, isSyncing, syncAll } = useBackgroundSync();

  return (
    <div className="flex items-center gap-2">
      {/* Online Status */}
      <Badge 
        variant={isOnline ? "outline" : "destructive"} 
        className="gap-1"
      >
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3" />
            Online
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            Offline
          </>
        )}
      </Badge>

      {/* Pending Actions */}
      {pendingCount > 0 && (
        <Badge variant="secondary" className="gap-1">
          {isSyncing ? (
            <>
              <RefreshCw className="h-3 w-3 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <CloudOff className="h-3 w-3" />
              {pendingCount} pending
            </>
          )}
        </Badge>
      )}

      {/* Sync Button */}
      {pendingCount > 0 && isOnline && !isSyncing && (
        <Button variant="ghost" size="sm" onClick={syncAll} className="h-7 px-2">
          <RefreshCw className="h-3 w-3 mr-1" />
          Sync
        </Button>
      )}

      {/* All Synced */}
      {pendingCount === 0 && isOnline && (
        <Badge variant="outline" className="gap-1 text-success border-success/30">
          <Cloud className="h-3 w-3" />
          Synced
        </Badge>
      )}
    </div>
  );
};
