import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = (url, options) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(url, options);

    // Clean up on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url, options]);

  return socketRef.current;
};

export default useSocket;