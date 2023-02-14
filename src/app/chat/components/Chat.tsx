'use client';

import Image from 'next/image';
import { useContext, useEffect } from 'react';
import {
   From,
   MessagesContext,
   MessagesContextInterface,
} from '../context/MessagesContextProvider';

const Chat = () => {
   const { messages, isLoading } = useContext(MessagesContext) as MessagesContextInterface;

   return (
      <section className="p-4 max-h-full overflow-y-auto">
         <div className="mb-4">The chat will be cleared any time you leave this screen</div>
         {messages.map((message, i) => (
            <div key={i} className={`chat ${message.from === From.ai ? 'chat-start' : 'chat-end'}`}>
               <div
                  className={`chat-bubble ${
                     message.from === From.ai ? 'chat-bubble-primary' : 'chat-bubble-secondary'
                  }`}>
                  {message.text}
               </div>
            </div>
         ))}
         {isLoading && (
            <div className="chat chat-start">
               <div className="chat-bubble chat-bubble-primary relative w-20">
                  <Image src="/text_loading.gif" className='object-contain opacity-50 w-10' alt="Loading response gif" fill />
               </div>
            </div>
         )}
      </section>
   );
};

export default Chat;
