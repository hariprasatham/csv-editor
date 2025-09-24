import EditableCell from "./EditableCell";

const BookRow = ({ book, columns, editingCell, editValue, setEditValue, onStartEdit, onSaveEdit, onCancelEdit }) => (
  <tr className={book.isModified ? 'bg-orange-50' : 'hover:bg-gray-50'}>
    {columns.map(field => (
      <td key={field} className="px-6 py-4 whitespace-nowrap">
        <EditableCell
          book={book}
          field={field}
          editingCell={editingCell}
          editValue={editValue}
          setEditValue={setEditValue}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      </td>
    ))}
  </tr>
);

export default BookRow;