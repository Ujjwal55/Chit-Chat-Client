import { createContext, useMemo } from "react";
import io, { Socket } from "socket.io-client";


const SocketContext = createContext<any>(null);

const SocketProvider = ({children}: {children: React.ReactNode}) => {
    const socket = useMemo(() => {
       return io("http://localhost:8000", {withCredentials: true});
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketContext, SocketProvider};