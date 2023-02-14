'use client';

import { createContext, useEffect, useState } from 'react';

export enum From {
   ai,
   user,
}

interface Message {
   text: string;
   from: From;
}

export interface MessagesContextInterface {
   messages: Message[];
   setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
   isLoading: boolean;
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MessagesContext = createContext<MessagesContextInterface | null>(null);

const MessagesContextProvider = ({ children }: { children: any }) => {
   const [messages, setMessages] = useState<Message[]>([
      {
         from: From.ai,
         text: 'Hi, how can I help you today?',
      },
   ]);
   const [isLoading, setIsLoading] = useState(false);

   return (
      <MessagesContext.Provider value={{ messages, setMessages, isLoading, setIsLoading }}>
         {children}
      </MessagesContext.Provider>
   );
};

export default MessagesContextProvider;
