import ActionButtons from "./ActionButtons";
import SearchAndFilters from "./SearchAndFilters";

const ControlsPanel = ({ 
  searchTerm, 
  setSearchTerm, 
  filterGenre, 
  setFilterGenre, 
  genres, 
  onFileUpload, 
  onDownload, 
  onReset, 
  modifiedCount 
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <SearchAndFilters
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filterGenre={filterGenre}
      setFilterGenre={setFilterGenre}
      genres={genres}
    />
    <ActionButtons
      onFileUpload={onFileUpload}
      onDownload={onDownload}
      onReset={onReset}
      modifiedCount={modifiedCount}
    />
  </div>
);

export default ControlsPanel;