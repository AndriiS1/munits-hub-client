import localizationService from "@/Localization/localization.service";
import { useState } from "react";
import UploadCloud from "../../Assets/uploadCloud.icon";
import storageServiceInstance from "../../Services/Storage/storage.service";
import Button from "../Button/button.component";
import Input from "../Input/input.component";
import "./uploadArea.style.css";

interface UploadAreaProps {
  pathPlaceholder: string;
  bucketId: string;
  bucketName: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh?: () => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  bucketId,
  bucketName,
  setIsOpen,
  onRefresh,
  pathPlaceholder,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadPath, setUploadPath] = useState<string>(pathPlaceholder);
  const [uploadPathError, setUploadPathError] = useState<string | undefined>(
    undefined
  );
  const [uploadStarted, setUploadStarted] = useState<boolean>(false);

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

  const handleRemoveFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleUpload = async () => {
    if (uploadStarted) return;

    const fileUploadTasks = files.map((file) =>
      storageServiceInstance.UploadFile(bucketId, uploadPath, file, onRefresh)
    );

    await Promise.all(fileUploadTasks);

    setUploadStarted(true);
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
            <UploadCloud className="upload-cloud-icon" />
            <div className="welcome-upload-info">
              <div>{localizationService.translate("your_bucket_is_ready")}</div>
              <div>
                {localizationService.translate("drag_and_drop_files_here")}{" "}
                <label className="custom-link" htmlFor="browse-files">
                  {localizationService.translate("select_from_your_computer")}
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
                  placeholder={localizationService.translate(
                    "custom_upload_path"
                  )}
                  type="text"
                  value={uploadPath}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUploadPathChange(e)
                  }
                />
              </div>
              <div className="success-file">
                <p>
                  {files.length}
                  {localizationService.translate("file_selected")}
                </p>
              </div>
            </div>

            <div className="file-list">
              <div className="file-list__container">
                {files.map((file) => (
                  <div className="file-item" key={file.name}>
                    <div className="file-info">
                      <p>{file.name}</p>
                    </div>
                    <div
                      className="file-actions"
                      onClick={() => handleRemoveFile(file.name)}
                    >
                      <Button inverted color="red">
                        {localizationService.translate("remove")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="options">
              <div className="browse-files-wrapper">
                <label className="custom-link" htmlFor="browse-files">
                  {localizationService.translate("continue_file_selection")}
                </label>
              </div>
              {uploadStarted ? (
                <Button color="blue" onClick={() => setIsOpen(false)}>
                  {localizationService.translate("close")}
                </Button>
              ) : (
                <Button color="orange" inverted onClick={() => handleUpload()}>
                  {localizationService.translate("upload")}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UploadArea;
