import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePhotoSelector = ({image, setImage, preview, setPreview}) => {
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            setImage(file)
            const preview = URL.createObjectURL(file)
            if(setPreview) {
                setPreview(preview)
            }
            setPreviewUrl(preview)
        }
    }
    
    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
        if(setPreview) {
            setPreview(null)
        }
    }
    
    const onChooseFile = () => {
        inputRef.current.click()
    }

    return (
        <div className="flex flex-col items-center">
            {/* Hidden file input */}
            <input 
                type="file" 
                ref={inputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*"
            />
            
            {/* Image preview or placeholder */}
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-3 relative">
                {(previewUrl || preview) ? (
                    <img 
                        src={previewUrl || preview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <LuUser size={40} className="text-gray-400" />
                    </div>
                )}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
                <button 
                    type="button"
                    onClick={onChooseFile}
                    className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-100"
                >
                    <LuUpload size={16} />
                    {(previewUrl || preview) ? 'Change' : 'Upload'}
                </button>
                
                {(previewUrl || preview) && (
                    <button 
                        type="button"
                        onClick={handleRemoveImage}
                        className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-100"
                    >
                        <LuTrash size={16} />
                        Remove
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProfilePhotoSelector