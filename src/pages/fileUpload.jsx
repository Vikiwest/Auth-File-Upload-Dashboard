import React, { useState } from "react";
import {
  setUploadedFileData,
  getUploadedFile,
  setFileDetails,
} from "../services/transmitters";
import { useNavigate } from "react-router-dom";

const ColorfulFileUpload = () => {
  const [showModal, setShowModal] = useState(false);
  const [fileDB, setFileDB] = useState([]);
  const [uploadedFile, setUploadedFile] = useState("");
  const [fileData, setFileData] = useState({});
  const [showFileUploaded, setShowFileUploaded] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);
  const navigate = useNavigate();
  const [editDescription, setEditDescription] = useState("");

  const handleChange = (event) => {
    const currentTime = new Date();
    const fileTargetProperties = event.target.files[0];
    let fileData = {
      fileName: fileTargetProperties.name,
      fileSize: `${fileTargetProperties.size / 1000} kB`,
      fileType: fileTargetProperties.type,
      fileExtension: fileTargetProperties.name.split(".")[1],
      timeUploaded: `${currentTime.getDate()}/${
        currentTime.getMonth() + 1
      }/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`,
    };

    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileTargetProperties);
    fileReader.onload = (_event) => {
      setShowFileUploaded(true);
      setFileData({ ...fileData, base64Image: fileReader.result });
    };
  };

  const handleSubmit = async () => {
    setShowModal(false);
    await setUploadedFileData(fileData);

    setTimeout(async () => {
      const getRecord = await getUploadedFile();
      const transformArray = getRecord.map((item, index) => ({
        id: index + 1,
        fileId: `file ${index + 1}`,
        ...item,
      }));
      setFileDB(transformArray);
      //  console.log("transformArray>>",transformArray);
    }, 200);
  };

  const handleView = (file) => {
    setFileDetails(file);
    navigate("/view-file");
  };
  const handleEdit = (file) => {
    setUpdateModal(true);
    setEditDescription(`Ready to replace ${file.fileName}`);
    setShowFileUploaded(false);
  };
  const handleDelete = (id) => {
    const filterData = fileDB.filter((item) => item.id !== id);
    setFileDB(filterData);
  };
  const handleDownload = async (fileProfile) => {
    try {
      const img = new Image();
      img.src = fileProfile?.base64Image;

      // Fetch the receipt as a blob
      const res = await fetch(fileProfile?.base64Image);
      if (!res.ok) {
        console.error("Failed to fetch payment receipt");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download =
        `${fileProfile.fileName}.png` || `${fileProfile.fileName}.jpg`;

      // Trigger the download
      a.click();

      // Clean up the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading payment receipt:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl shadow-md">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Cloud File Manager
            </h1>
            <p className="text-gray-600">
              Upload and manage your files with ease
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Upload Files
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm font-medium">Total Files</h3>
            <p className="text-2xl font-bold text-purple-600">
              {fileDB.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-medium">Storage Used</h3>
            <p className="text-2xl font-bold text-blue-600">0 kb</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">Images</h3>
            <p className="text-2xl font-bold text-green-600">
              {fileDB.filter((file) => file.fileType.includes("image")).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-medium">Documents</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {
                fileDB.filter(
                  (file) =>
                    file.fileType.includes("pdf") ||
                    file.fileType.includes("document") ||
                    file.fileExtension === "docx"
                ).length
              }
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-medium">Video</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {
                fileDB.filter(
                  (file) =>
                    file.fileExtension === "mp4" ||
                    file.fileExtension === "avi" ||
                    file.fileExtension === "mkv"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Files Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500">
            <h2 className="text-xl font-semibold text-white">Your Files</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fileDB.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          {item.fileType.includes("image") ? (
                            <svg
                              className="h-6 w-6 text-purple-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          ) : item.fileType.includes("pdf") ? (
                            <svg
                              className="h-6 w-6 text-purple-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-6 w-6 text-purple-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {item.fileName}
                          </div>
                          <div className="text-sm text-gray-500">
                            .{item.fileExtension}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          item.fileType.includes("image")
                            ? "bg-green-100 text-green-800"
                            : item.fileType.includes("pdf")
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.fileType.split("/")[1] || item.fileType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.timeUploaded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleView(item)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Edit"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDownload(item)}
                          className="text-green-600 hover:text-green-900"
                          title="Download"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {fileDB.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No files uploaded yet. Click the "Upload Files" button to
                      get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4">
              <h2 className="text-xl font-semibold text-white">
                Upload New File
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 border-purple-300 hover:border-purple-400 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {showFileUploaded ? (
                      <>
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                          File ready for upload!
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {uploadedFile}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-purple-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF, DOCX (MAX. 10MB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    value={uploadedFile}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white hover:from-purple-600 hover:to-blue-600 transition-all shadow-md"
                >
                  Upload File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <>
        {/* Modal Overlay */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Update File</h2>
                <button
                  onClick={() => setUpdateModal(false)}
                  className="text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-gray-400"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    {showFileUploaded === true ? (
                      <>
                        <p className="text-xs text-gray-500">
                          File selected Successfully!
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs text-gray-500">
                          {editDescription}
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    value={uploadedFile}
                    name="uploadedFile"
                    onChange={(event) => handleChange(event)}
                  />
                </label>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ColorfulFileUpload;
