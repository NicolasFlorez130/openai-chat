'use client';

import { responseCodes } from '@/pages/api/_codes';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import {
   From,
   MessagesContext,
   MessagesContextInterface,
} from '../context/MessagesContextProvider';

const ChatInput = () => {
   const { setMessages, setIsLoading, isLoading } = useContext(
      MessagesContext
   ) as MessagesContextInterface;

   const [query, setQuery] = useState('');
   const [alertInfo, setAlertInfo] = useState({
      shown: false,
      content: '',
      type: '',
   });

   const ask = async () => {
      interface ApiResponse {
         response: string;
         code: responseCodes;
      }

      setIsLoading(true);

      const res = await fetch(`/api/chat?string=${query}`);
      const data: ApiResponse = await res.json();


      setIsLoading(false);

      switch (data.code) {
         case responseCodes.success:
            setMessages(last => [...last, { from: From.ai, text: data.response }]);
            break;
         case responseCodes.userError:
            setAlertInfo({ content: data.response, shown: true, type: 'alert-warning' });
            break;
         default:
            setAlertInfo({ content: data.response, shown: true, type: 'alert-error' });
            break;
      }
   };

   const sendMessage = () => {
      if (query.split(' ').length < 3) {
         setAlertInfo({
            content: 'You must write at least 3 words to send a message.',
            shown: true,
            type: 'alert-warning',
         });
      } else {
         setMessages(last => [...last, { from: From.user, text: query }]);
         setQuery('');
         ask();
      }
   };

   return (
      <>
         {alertInfo.shown &&
            createPortal(
               <Alert
                  info={alertInfo}
                  hide={() => setAlertInfo(last => ({ ...last, shown: false }))}
               />,
               document.body
            )}
         <section className="form-control p-4">
            <label className="input-group">
               <input
                  type="text"
                  placeholder="Your prompt"
                  className="input input-bordered w-full focus:border-primary"
                  disabled={isLoading}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
               />
               <button
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="btn-primary px-4 text-primary-content disabled:btn-secondary">
                  Send
               </button>
            </label>
         </section>
      </>
   );
};

interface AlertProps {
   hide: () => void;
   info: {
      shown: boolean;
      content: string;
      type: string;
   };
}

const Alert = ({ hide, info }: AlertProps) => (
   <div onClick={hide} className="cursor-pointer toast z-10">
      <div className={`alert ${info.type}`}>
         <span>
            {info.content}
            <br />
            <span className="font-bold text-center">Click to hide</span>
         </span>
      </div>
   </div>
);

export default ChatInput;
