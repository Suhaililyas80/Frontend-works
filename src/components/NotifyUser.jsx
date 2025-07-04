import { useEffect, useRef } from "react";
import Pusher from "pusher-js";

export function NotifyUser({ userId }) {
  const pusherRef = useRef(null);
  const channelRef = useRef(null);

  useEffect(() => {
    console.log("NotifyUser component mounted with userId:", userId);
    if (!userId) return; // Don't subscribe if no user ID
    const pusher = new Pusher("b0a4a0abc09ff4dc52d2", {
      cluster: "ap2",
      forceTLS: true,
    });
    pusherRef.current = pusher;
    const channel = pusher.subscribe(`task.${userId}`);
    channelRef.current = channel;
    channel.bind("TaskCreated", function (data) {
      alert(
        `New Task!\nTitle: ${data.title}\nDescription: ${data.description}\nEnd Date: ${data.end_date}`
      );
    });

    // Cleanup on unmount or when userId changes
    return () => {
      if (channelRef.current && pusherRef.current) {
        channelRef.current.unbind_all();
        pusherRef.current.unsubscribe(channelRef.current.name);
        pusherRef.current.disconnect();
      }
    };
  }, [userId]);
  return null;
}
