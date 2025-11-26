import { useEffect, useState } from 'react';
import api from '../utils/api';
import { FileText, Upload } from 'lucide-react';
import { format } from 'date-fns';

const Documents = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/documents/my-documents');
      setDocuments(response.data.documents || []);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <button className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <Upload className="h-5 w-5" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <div key={doc.id} className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.type}</p>
                  <p className="text-xs text-gray-400">
                    {format(new Date(doc.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-indigo-700"
              >
                View Document →
              </a>
            </div>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="rounded-lg bg-white p-12 text-center shadow">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-600">No documents uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default Documents;

