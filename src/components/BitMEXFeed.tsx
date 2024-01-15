import React, { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface Props {
  currency: string;
  onDataReceived: (data: any) => void;
}

const BitMEXFeed: React.FC<Props> = ({ currency, onDataReceived }) => {
  const socketURL = 'wss://www.bitmex.com/realtime';
  const { sendMessage, lastMessage, readyState, sendJsonMessage } =
    useWebSocket(socketURL);

  //Subscribe to feed when connection is open..
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      const subscribeMessage = {
        op: 'subscribe',
        args: [`trade:${currency}`],
      };
      sendMessage(JSON.stringify(subscribeMessage));
    }

    //Clean up after unmount
    return () => {
      sendJsonMessage({ op: 'unsubscribe', args: [`trade${currency}`] });
    };
  }, [readyState, sendMessage, currency, sendJsonMessage]);

  //Handle incoming messages
  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      const data = JSON.parse(lastMessage.data);
      if (data.data) {
        onDataReceived(data.data);
      }
    }
  }, [lastMessage, onDataReceived]);

  return (
    <div>
      {readyState === ReadyState.OPEN ? (
        <p>Connected to {currency} BitMEX feed</p>
      ) : (
        <p> Connecting... </p>
      )}
    </div>
  );
};

export default BitMEXFeed;
