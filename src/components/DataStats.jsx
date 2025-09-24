const DataStats = ({ totalBooks, filteredCount, modifiedCount, currentPage, totalPages }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
      <span>Total Records: <strong>{totalBooks}</strong></span>
      <span>Filtered: <strong>{filteredCount}</strong></span>
      <span>Modified: <strong className="text-orange-600">{modifiedCount}</strong></span>
      <span>Page {currentPage} of {totalPages}</span>
    </div>
  </div>
);

export default DataStats;