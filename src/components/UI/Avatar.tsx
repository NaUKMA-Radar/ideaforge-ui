import React, { FC, useState } from 'react';
import { Label } from 'components/UI';
import { CameraIcon } from 'components/Icons/Icons';

interface AvatarProps {
    image?: File | null;
    onImageChange?: (file: File | null) => void;
}

const Avatar: FC<AvatarProps> = ({ image, onImageChange = () => {}, ...props }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(image || null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedImage(file);
        onImageChange(file);
    };

    return (
        <div className="w-[125px] h-[125px] flex flex-col items-center border-gradient-primary !rounded-full before:!rounded-full p-0" {...props}>
            <div className="relative w-[125px] h-[125px] rounded-full overflow-hidden ">
                {selectedImage ? (
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <CameraIcon className="w-16 h-16 text-gray-400" />
                    </div>
                )}
                <Label
                    htmlFor="avatar_upload"
                    className="absolute inset-0 flex items-center justify-center m-2 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full opacity-0 cursor-pointer hover:opacity-100"
                >
                    <span className="text-sm text-white">{selectedImage ? 'Change photo' : 'Add a photo'}</span>
                </Label>
                <input
                    id="avatar_upload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                />
            </div>
        </div>
    );
};

export default Avatar;
