import { useDebounce } from "@/services/helper";
import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

interface ISearchbarProps {
  searchOpen: boolean;
  setSearchOpen: (value: boolean) => void;
  setQuery: (value: string) => void;
}

const Searchbar = ({ searchOpen, setSearchOpen, setQuery }: ISearchbarProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedInputValue = useDebounce(inputValue, 500);


  useEffect(() => {
    setQuery(debouncedInputValue);
  }, [debouncedInputValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleToggleSearch = (e: MouseEvent<SVGElement>) => {
    setSearchOpen(!searchOpen);
    setInputValue("");
    setQuery("");
  };

  return (
    <>
      {searchOpen ? (
        <div className="input-group flex w-full justify-between overflow-hidden">
          <div className="relative">
            <BiSearch className="icon absolute top-6 left-1" size={20} />
          </div>
          <input
            className="w-3/4 pl-9 px-5 py-5 focus:outline-none"
            id="searchInput"
            placeholder="Search..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="flex items-center p-2 cursor-pointer">
            <RxCross1 className="icon" onClick={handleToggleSearch} />
          </div>
        </div>
      ) : (
        <div className="search-icon p-2 rounded-full flex justify-center items-center cursor-pointer">
          <BiSearch className="icon" onClick={handleToggleSearch} />
        </div>
      )}
    </>
  );
};

export default Searchbar;
