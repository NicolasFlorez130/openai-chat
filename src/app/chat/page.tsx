import Chat from './components/Chat';
import ChatInput from './components/ChatInput';
import MessagesContextProvider from './context/MessagesContextProvider';

const page = () => {
   return (
      <MessagesContextProvider>
         <div className="grid grid-rows-[1fr_auto] h-full">
            <Chat />
            <ChatInput />
         </div>
      </MessagesContextProvider>
   );
};

export default page;
