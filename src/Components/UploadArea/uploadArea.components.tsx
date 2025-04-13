import { useState } from "react";
import { ReactComponent as CrossIcon } from "../../Assets/cross.icon.svg";
import { ReactComponent as CloudUploadIcon } from "../../Assets/upload-cloud.icon.svg";
import storageServiceInstance from "../../Services/Storage/storage.service";
import Button from "../Button/button.component";
import Input from "../Input/input.component";
import "./uploadArea.style.css";

interface UploadAreaProps {
  pathPlaceholder: string;
  bucketId: string;
  bucketName: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({ bucketId, bucketName }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadPath, setUploadPath] = useState<string>("");
  const [uploadPathError, setUploadPathError] = useState<string | undefined>(
    undefined
  );
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
      await storageServiceInstance.UploadFile(bucketId, uploadPath, file);
    });

    setUploadButtonDisabled(true);
  };

  const handleUploadPathChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadPathRegex =
      /^(?!.*\/\/)(?!\/)(?!.*\/$)([a-zA-Z0-9._-]+\/)*[a-zA-Z0-9._-]+$/;

    const newUploadPath = event.target.value.trim();

    if (newUploadPath !== "" && !uploadPathRegex.test(newUploadPath)) {
      setUploadPathError("Invalid upload path.");
    } else {
      setUploadPathError(undefined);
    }

    setUploadPath(newUploadPath);
  };

  return (
    <section className="upload-area-wrapper">
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
              <div className="custom-path-wrapper">
                <span>{bucketName} / </span>
                <Input
                  errorMessage={uploadPathError}
                  placeholder="custom upload path"
                  type="text"
                  value={uploadPath}
                  onChange={(e: any) => handleUploadPathChange(e)}
                />
              </div>
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
                    </div>
                    <div
                      className="file-actions"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <CrossIcon className="trash-icon" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="options">
              <div className="browse-files-wrapper">
                <label className="custom-link" htmlFor="browse-files">
                  Continue file selection
                </label>
              </div>
              <Button
                text="upload"
                disabled={uploadButtonDisabled}
                color="orange"
                onClick={() => handleUpload()}
              ></Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UploadArea;
