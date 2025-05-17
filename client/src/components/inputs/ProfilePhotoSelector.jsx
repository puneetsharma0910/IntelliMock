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
        <div className="flex flex-col items-center space-y-4">
            {/* Hidden file input */}
            <input 
                type="file" 
                ref={inputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*"
            />
            
            {/* Image preview or placeholder */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-50 border-2 border-gray-300 shadow-sm mb-1 relative">
                {(previewUrl || preview) ? (
                    <img 
                        src={previewUrl || preview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <LuUser size={48} className="text-gray-400" />
                    </div>
                )}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3">
                <button 
                    type="button"
                    onClick={onChooseFile}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-700 transition"
                >
                    <LuUpload size={18} />
                    {(previewUrl || preview) ? 'Change' : 'Upload'}
                </button>
                
                {(previewUrl || preview) && (
                    <button 
                        type="button"
                        onClick={handleRemoveImage}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-red-700 transition"
                    >
                        <LuTrash size={18} />
                        Remove
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProfilePhotoSelector
