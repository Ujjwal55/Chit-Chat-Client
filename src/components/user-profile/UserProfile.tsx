import { useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { useToast } from '../ui/use-toast';

const UserProfile = ({ profileImageURL, fullName, userName, editable, onSave }) => {
    const { toast } = useToast()
    const [newFullName, setNewFullName] = useState(fullName);
    const [newUserName, setNewUserName] = useState(userName);

    const handleSave = () => {
        onSave({ fullName: newFullName, userName: newUserName });
    };

    return (
        <div className="flex items-center flex-col gap-14">
            {profileImageURL ? (
                <img src={profileImageURL} alt="Profile" className="w-40 h-40 rounded-full mr-4" />
            ) : (
                <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 mr-4">
                    {userName.substring(0, 2)}
                </div>
            )}
            <div className='flex flex-col gap-2'>
                <div className='text-xl text-[#3390ec]'>
                    <div className='flex gap-5 justify-center items-center'>
                    {fullName}
                    <MdOutlineEdit size={20} onClick={() => {
                        toast({
                            title: 'Coming soon!',
                            description: "This feature is not available yet.",
                        })
                    }} className='cursor-pointer'/>
                    </div>
                </div>
            <div className='m-auto'>{userName}</div>
            </div>
        </div>
    );
};

export default UserProfile;