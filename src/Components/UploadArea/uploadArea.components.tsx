import { useState } from "react";
import { ReactComponent as CloudUploadIcon } from "../../Assets/upload-cloud.icon.svg";
import storageServiceInstance from "../../Services/Objects/storage.service";
import Button from "../Button/button.component";
import Input from "../Input/input.component";
import "./uploadArea.style.css";

interface UploadAreaProps {
  onFilesSelected?: (files: File[]) => void;
  pathPlaceholder: string;
  bucketId: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  pathPlaceholder,
  bucketId,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadPath, setUploadPath] = useState<string>(pathPlaceholder);
  const [uploadButtonDisabled, setUploadButtonDisabled] =
    useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles) as File[];
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles) as File[];
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (uploadButtonDisabled) return;

    files.forEach(async (file) => {
      await storageServiceInstance.UploadFile(bucketId, file.name, file);
    });

    setUploadButtonDisabled(true);
  };

  return (
    <section className="upload-area-container">
      <div
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {files.length === 0 && (
          <>
            <CloudUploadIcon className="upload-cloud-icon" />
            <div className="welcome-upload-info">
              <div>Your bucket is ready. Add files to get started. </div>

              <div>
                Drag and drop your files here to upload or{" "}
                <label className="custom-link" htmlFor="browse-files">
                  select from you computer
                </label>
                .
              </div>
            </div>
          </>
        )}

        <input
          type="file"
          hidden
          id="browse-files"
          onChange={handleFileChange}
          accept=".pdf,.docx,.pptx,.txt,.xlsx"
          multiple
        />

        {files.length > 0 && (
          <>
            <div className="upload-info">
              <label className="custom-link" htmlFor="browse-files">
                Continue file selection
              </label>
              <Input
                type="text"
                value={uploadPath}
                onChange={(e: any) =>
                  setUploadPath(e.target.value.toLowerCase())
                }
              />
              <div className="success-file">
                <p>
                  {files.length} file{files.length > 1 ? "s" : ""} selected
                </p>
              </div>
            </div>

            <div className="file-list">
              <div className="file-list__container">
                {files.map((file, index) => (
                  <div className="file-item" key={index}>
                    <div className="file-info">
                      <p>{file.name}</p>
                      <p>{file.type}</p>
                    </div>
                    <div className="file-actions">
                      {/* <MdClear onClick={() => handleRemoveFile(index)} /> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              text="upload"
              disabled={uploadButtonDisabled}
              onClick={() => handleUpload()}
            ></Button>
          </>
        )}
      </div>
    </section>
  );
};

export default UploadArea;
