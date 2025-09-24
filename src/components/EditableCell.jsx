import { Edit3, Save, X } from "lucide-react";

const EditableCell = ({ book, field, editingCell, editValue, setEditValue, onStartEdit, onSaveEdit, onCancelEdit }) => {
  const isEditing = editingCell?.bookId === book.id && editingCell?.field === field;
  
  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSaveEdit();
            if (e.key === 'Escape') onCancelEdit();
          }}
          autoFocus
        />
        <button onClick={onSaveEdit} className="text-green-600 hover:text-green-800">
          <Save className="w-4 h-4" />
        </button>
        <button onClick={onCancelEdit} className="text-red-600 hover:text-red-800">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`group flex items-center space-x-2 cursor-pointer ${book.isModified ? 'text-orange-800 font-medium' : 'text-gray-900'}`}
      onClick={() => onStartEdit(book.id, field, book[field])}
    >
      <span className="flex-1">{book[field]}</span>
      <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default EditableCell;