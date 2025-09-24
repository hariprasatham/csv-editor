import BookRow from "./BookRow";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";

const DataTable = ({ 
  books, 
  columns, 
  sortConfig, 
  onSort, 
  editingCell, 
  editValue, 
  setEditValue, 
  onStartEdit, 
  onSaveEdit, 
  onCancelEdit,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  filteredCount
}) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <TableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} />
        <tbody className="divide-y divide-gray-200">
          {books.map(book => (
            <BookRow
              key={book.id}
              book={book}
              columns={columns}
              editingCell={editingCell}
              editValue={editValue}
              setEditValue={setEditValue}
              onStartEdit={onStartEdit}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </tbody>
      </table>
    </div>

    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      totalItems={books.length}
      itemsPerPage={itemsPerPage}
      filteredCount={filteredCount}
    />
  </div>
);

export default DataTable;