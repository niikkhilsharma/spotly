"use client";

import React, { useState } from "react";

interface FileUploadFieldProps {
  label: string;
  name: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  name,
  file,
  onChange,
}) => {
  const [showUpload, setShowUpload] = useState(false);

  const handleChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setShowUpload(true); // Show upload after file is selected
  };

  const handleUpload = () => {
    if (file) {
      alert("✅ File Uploaded: " + file.name);
      setShowUpload(false);
    } else {
      alert("⚠️ No file selected");
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Choose File Button */}
        <label className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
          Choose File
          <input
            type="file"
            name={name}
            onChange={handleChoose}
            className="hidden"
          />
        </label>

        {/* Upload Button */}
        {/* {showUpload && ( */}
        <button
          type="button"
          onClick={handleUpload}
          className="px-4 py-2 bg-[#ff6900] text-white rounded hover:bg-[#ff6f00] transition-colors"
        >
          Upload File
        </button>
        {/* )} */}

        {/* File Name Display */}
        {file && (
          <span className="text-sm text-gray-700 truncate max-w-[200px]">
            📎 {file.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default FileUploadField;
