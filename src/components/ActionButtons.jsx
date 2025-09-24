import { Upload, Download, RotateCcw } from "lucide-react";

const ActionButtons = ({ onFileUpload, onDownload, onReset, modifiedCount }) => (
  <div className="flex flex-wrap gap-4">
    <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
      <Upload className="w-4 h-4 mr-2" />
      Upload CSV
      <input
        type="file"
        accept=".csv"
        onChange={onFileUpload}
        className="hidden"
      />
    </label>
    
    <button
      onClick={onDownload}
      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
    >
      <Download className="w-4 h-4 mr-2" />
      Download CSV
    </button>
    
    <button
      onClick={onReset}
      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      disabled={modifiedCount === 0}
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      Reset All ({modifiedCount} modified)
    </button>
  </div>
);

export default ActionButtons;