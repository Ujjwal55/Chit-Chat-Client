import React from "react";
import { HiChevronDoubleRight } from "react-icons/hi";
import Button from "../ui/Button";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import Image from "next/image";

const IntroPage = () => {
    const fadeRightVariant = {
        hidden: { x: '40vw' }, // Start element off-screen to the right
        visible: { x: 0, transition: { duration: 1 } }, // Animate to its original position
      };
      const router = useRouter();
    
  return (
    <>
    <div className="absolute flex z-20 mt-4 px-4 justify-between w-full">
        <Image src="https://chitchat-react.vercel.app/assets/images/logo/landing-logo.png"
        height={250}
        width={250}
        alt="chit-chat"
        className="p-5 cursor-pointer"
        />
        <div className="flex gap-8">
        <button
        className="flex items-center justify-center h-10 px-8 py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
        onClick={() => {
            router.push("/register")
        }}>
        SignUp
        </button>
        <button
        className="flex items-center justify-center h-10 px-8 py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
        onClick={() => {
            router.push("/login")
        }}>
        Login
        </button>
        </div>
    </div>
    <section
      className="relative pt-36 bg-cover bg-center h-screen text-left overflow-hidden"
      style={{ backgroundImage: 'url("/images/2.png")', backgroundColor: '#your-secondary-bg-color' }} // Add your theme colors
      id="home"
    >
      <div className="relative z-10 flex h-full items-center px-4 md:px-20">
        <div className="flex">
          <motion.div
          variants={fadeRightVariant}
          initial="hidden" animate="visible"
            className="flex flex-col justify-start"
          >
            <p>Welcome to</p>
            <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl leading-10 max-w-2xl">
                Chit Chat
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-lg !leading-9 text-green-950">
              Chit Chat is a real-time chat application that allows you to connect with other users and share your thoughts and ideas. Whether you're looking to network, collaborate, or just have a chat, Chit Chat is the perfect platform for you.
            </p>
            <div className="mt-6">
                <button
                  className="flex items-center justify-center px-8 py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
                  onClick={() => {
                    router.push("/login")
                  }}
                >
                  Get Started
                  <HiChevronDoubleRight className="ml-2" />
                </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full">
        {/* Uncomment and update the image source */}
        <img src="https://chitchat-react.vercel.app/assets/images/landing/2.png" alt="bg" className="absolute right-0 top-0 w-1/2 h-full"/>
      </div>

      {/* Shapes */}
      <div className="absolute top-0 w-full h-full animate-zoom-fade repeat-infinite ease-linear duration-5000">
        <div className="absolute top-[-10%] left-[-3%] opacity-10">
          <Image src="/images/shape-1.png" height={200} width={200} alt="" />
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-10">
          <Image src="/images/shape-1.png" alt="" width={200} height={200} />
        </div>
        <div className="absolute bottom-[5%] left-[-8%] rotate-12 opacity-10">
          <Image src="/images/shape-3.png" alt="" height={200} width={200} />
        </div>
      </div>
    </section>
    </>
  );
};

export default IntroPage;
