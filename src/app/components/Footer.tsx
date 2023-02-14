'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BsFillChatDotsFill, BsCodeSlash, BsImages } from 'react-icons/bs';

const pages = {
   Chat: {
      name: 'Chat',
      icon: <BsFillChatDotsFill size="1.5rem" />,
   },
   'Dall-e': {
      name: 'Dall-e',
      icon: <BsImages size="1.5rem" />,
   },
   Codex: {
      name: 'Codex',
      icon: <BsCodeSlash size="1.5rem" />,
   },
};

export type Pages = keyof typeof pages;

const Footer = () => {
   const pathName = usePathname();

   const [selected, setSelected] = useState<Pages>();

   useEffect(() => {
      setSelected(pathName?.replaceAll('/', '') as Pages);
   }, [pathName]);

   return (
      <footer>
         <div className="border-t border-gray-300 btm-nav sticky">
            {Object.entries(pages).map(page => (
               <Link
                  className={`${
                     selected?.toLowerCase() === page[0]?.toLowerCase() ? 'active bg-base-200' : ''
                  } `}
                  key={page[0]}
                  href={page[0].toLowerCase()}>
                  {page[1].icon}
               </Link>
            ))}
         </div>
      </footer>
   );
};

export default Footer;
