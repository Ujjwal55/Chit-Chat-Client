import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { RxAvatar } from "react-icons/rx";

const Avatar = () => {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  // Function to handle file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    if (selectedImage) {
      // You can perform additional validations here, e.g., file type, size, etc.
      setImage(URL.createObjectURL(selectedImage));
    }
  };
  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger click event on the input element
    }
  };

  return (
    <div className="flex flex-col items-center">
      {image ? (
        <Image src={image} alt="Selected avatar" className="w-32 h-32 rounded-full mb-4" />
      ) : (
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 cursor-pointer" onClick={handleDivClick}>
          <RxAvatar className='w-20 h-20'/>
          <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        ref={inputRef}
      />
        </div>
      )}
    </div>
  );
};

export default Avatar;