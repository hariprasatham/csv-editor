import { Search } from "lucide-react";

const SearchAndFilters = ({ searchTerm, setSearchTerm, filterGenre, setFilterGenre, genres }) => (
  <div className="flex flex-wrap gap-4 mb-4">
    <div className="flex-1 min-w-64">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
    
    <select
      value={filterGenre}
      onChange={(e) => setFilterGenre(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">All Genres</option>
      {genres.map(genre => (
        <option key={genre} value={genre}>{genre}</option>
      ))}
    </select>
  </div>
);

export default SearchAndFilters;