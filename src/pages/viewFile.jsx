import React, { useEffect, useState } from "react";
import { getFileDetails } from "../services/transmitters";
import { useNavigate } from "react-router-dom";

function ViewFile() {
  const [fileProfile, setFileProfile] = useState({
    // fileName: "example-image.png",
    // fileType: "image/png",
    // fileSize: "245 kB",
    // fileExtension: "png",
    // timeUploaded: "15/06/2023 14:30:45",
    // base64Image: "https://via.placeholder.com/600x400?text=File+Preview"
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getData = getFileDetails();
    console.log("setData>>", getData);
    setFileProfile(getData);
  }, []);
  
  async function downloadFile() {
    try{
      const img = new Image();
      img.src = fileProfile.base64Image;
      const res = await fetch(fileProfile.base64Image);
      if (!res.ok){
        console.error("Failed to download file");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      //create a link element
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileProfile.fileName}.png`; // Set the file name for download

      //trigger the download
      a.click();

      // Clean up the URL object
      URL.revokeObjectURL(url);
    }catch (error) {
      console.error("Error downloading file:", error);
    }
  }

 function handleBack (){
  navigate(-1);
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            File Details Viewer
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage your uploaded files
          </p>
        </div>

        {/* File Metadata Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  File Name
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {fileProfile.fileName}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  File Type
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {fileProfile.fileType}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  File Size
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {fileProfile.fileSize}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  File Extension
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  .{fileProfile.fileExtension}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 mr-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Upload Time
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {fileProfile.timeUploaded}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transition-shadow flex items-center justify-center">
            <button onClick={downloadFile} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Download File
            </button>
          </div>
        </div>

        {/* File Preview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600">
            <h2 className="text-xl font-semibold text-white">File Preview</h2>
          </div>
          <div className="p-6 flex justify-center">
            <div className="border-4 border-dashed border-gray-200 rounded-xl p-2">
              <img
                src={fileProfile.base64Image}
                alt="File preview"
                className="max-h-[60vh] max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-center space-x-4">
          <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-md transition-all">
            Edit Metadata
          </button>
          <button className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-md transition-all">
            Share File
          </button>
          <button onClick={handleBack} className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-md transition-all">
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewFile;
