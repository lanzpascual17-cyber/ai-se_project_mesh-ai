import { useState, useEffect } from "react";
import type { KnowledgeDoc } from "../../utils/api";
import { getDocuments, uploadDocument } from "../../utils/api";
import "./KnowledgeBase.css";
import UploadArea from "../../components/UploadArea/UploadArea";
import deleteIcon from "../../assets/delete.svg";

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);

    try {
      const res = await uploadDocument(file);

      if (res.data) {
        setDocuments((prev) => [res.data!, ...prev]);
      }
    } catch {
      setError("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc._id !== id));
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getDocuments();
        setDocuments(res.data ?? []);
      } catch {
        setError("Failed to load documents");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="knowledge-base">
      <h1>Manage Your Knowledge Base</h1>
      <section className="knowledge-base__content">
        <p>Upload documents (PDF)</p>
        <UploadArea onFileSelect={handleFileSelect} isUploading={isUploading} />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && documents.length === 0 && (
          <p>No documents yet.</p>
        )}
        {!isLoading && !error && documents.length > 0 && (
          <div className="knowledge-base__document-list">
            {documents.map((doc) => (
              <div className="knowledge-base__document" key={doc._id}>
                <p>{doc.fileName}</p>
                <button
                  className="knowledge-base__delete-btn"
                  type="button"
                  aria-label={`Delete ${doc.fileName}`}
                  onClick={() => handleDelete(doc._id)}
                >
                  <img
                    className="knowledge-base__delete-icon"
                    src={deleteIcon}
                    alt="Delete document icon"
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
