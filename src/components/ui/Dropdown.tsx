import React, { useState } from 'react';

interface IDropdownComponent {
    isOpen: boolean;
    options: any;
    onClick: (option: any) => void;
    dropdownStyles?: any
}
const DropdownComponent = ({isOpen, options, onClick, dropdownStyles}: IDropdownComponent) => {
    

    const handleOptionClick = (option: any) => {
        onClick(option);
    };

    return (
        <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ${isOpen ? 'block' : 'hidden'}`} style={dropdownStyles}>
            <div className="py-1">
                {options.map((option: any) => (
                    <button
                        key={option.key}
                        onClick={() => handleOptionClick(option)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DropdownComponent;