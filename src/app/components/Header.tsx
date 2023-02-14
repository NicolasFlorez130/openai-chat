import OpenAiIcon from '@/shared/icons/OpenAiIcon';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
   return (
      <header className="navbar border-b border-gray-300">
         <Link className="aspect-square m-2 relative w-10" href="/">
            <OpenAiIcon className="h-full w-full fill-primary" />
         </Link>
         <h1 className="font-medium text-xl">OpenAI App</h1>
      </header>
   );
};

export default Header;
