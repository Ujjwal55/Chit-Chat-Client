import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
  const [header, setHeader] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  return (
    <header className="fixed z-99 w-full transition-all duration-500">
      <div className={`${header ? "bg-bg2-primary shadow-lg" : ""} flex justify-between items-center w-full py-4 px-6 h-24`}>
          <div className="flex justify-center items-center w-full">
            <img src="./images/logo.png" alt="Chit Chat logo" loading="lazy" className="h-16" />
          </div>
      </div>
    </header>
  );
};

export default Header;
