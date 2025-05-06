import React, { useState, ChangeEvent } from "react";

interface ImageUploadProps {
  onImageChange?: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
      onImageChange?.(file);
    }
  };

  return (
    <div className="max-w-96">
      <div className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 my-4">
        Poster Image
      </div>
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center w-full h-56 p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all dark:border-gray-600 border-gray-300 bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="object-contain h-full w-full rounded-lg shadow-md"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 16l4-4 4 4m0 0l4-4 4 4M4 4h16"
              />
            </svg>
            <p className="text-sm">Click to upload or drag and drop</p>
            <p className="text-xs text-center">PNG, JPG, or JPEG (Max 5MB)</p>
          </div>
        )}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {fileName && (
        <p className="mt-2 text-center text-sm text-gray-700 dark:text-gray-300">
          {fileName}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
