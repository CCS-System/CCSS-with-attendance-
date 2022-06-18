import * as React from 'react';
import { FileUploader } from 'baseui/file-uploader';
import useAPI from "../hooks/useAPI";
import storageAPI from "../api/storage";
export default function FileUpload({ onUpload, accept }) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
  const onComplete = ({ filename }) => { if (onUpload) onUpload(`${BASE_URL}/storage/${filename}`); };
  const { request: upload, loading: isUploading } = useAPI(storageAPI.upload, { errorMessage: "Could not complete upload", onComplete })
  return (
    <FileUploader
      accept={accept || "application/pdf"}
      onDrop={async (acceptedFiles) => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        if (upload)
          await upload(formData);
      }}
      progressMessage={
        isUploading ? `Uploading... hang tight.` : ''
      }
    />
  );
}