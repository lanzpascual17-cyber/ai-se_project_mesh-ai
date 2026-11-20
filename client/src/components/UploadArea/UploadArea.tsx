import "./UploadArea.css";
import uploadIcon from "../../assets/Frame.svg";

type Props = {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
};

export default function UploadArea({ onFileSelect, isUploading }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && !isUploading) onFileSelect(file);
  };

  return (
    <div
      className="upload-area"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <label className="upload-area__label">
        <img src={uploadIcon} alt="Upload PDF icon" width="24" height="24" />
        <span>{isUploading ? "Uploading..." : "Drag 'n' Drop or"}</span>
        <span className="underline">Upload</span>
        <input
          type="file"
          accept=".pdf"
          className="upload-area__input"
          onChange={handleChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
