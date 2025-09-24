import { ChevronDown, ChevronUp } from "lucide-react";

const TableHeader = ({ columns, sortConfig, onSort }) => (
  <thead className="bg-gray-50">
    <tr>
      {columns.map(header => (
        <th key={header} className="px-6 py-3 text-left">
          <button
            onClick={() => onSort(header)}
            className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
          >
            <span>{header}</span>
            {sortConfig.key === header && (
              sortConfig.direction === 'asc' 
                ? <ChevronUp className="w-4 h-4" />
                : <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;