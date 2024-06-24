import { useEffect } from 'react';
interface ErrorObject {
    isError?: boolean;
    error: Error | { message: string };
    fallback?: () => void;
}


export const useSocketEvents = (socket: any, eventHandler: any) => {
    useEffect(() => {
        Object.keys(eventHandler).forEach((event) => {
          socket.on(event, eventHandler[event]);
        });
    
        return () => {
          Object.keys(eventHandler).forEach((event) => {
            socket.off(event, eventHandler[event]);
          });
        }
      }, [eventHandler])
}