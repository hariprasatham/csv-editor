import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Papa from 'papaparse';
import ControlsPanel from './ControlsPanel';
import DataStats from './DataStats';
import DataTable from './DataTable';
import LoadingSpinner from './LoadingSpinner';

const generateFakeBooks = (count = 10000) => {
  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Fantasy', 'Biography', 'History', 'Self-Help', 'Thriller', 'Horror', 'Poetry', 'Drama', 'Adventure', 'Young Adult'];
  
  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  
  const titleWords = ['The', 'Secret', 'Lost', 'Dark', 'Silent', 'Hidden', 'Forgotten', 'Last', 'First', 'Golden', 'Shadow', 'Broken', 'Ancient', 'Crimson', 'Azure', 'Emerald', 'Crystal', 'Midnight', 'Dawn', 'Twilight'];
  const titleNouns = ['Journey', 'Mystery', 'Adventure', 'Legend', 'Kingdom', 'Empire', 'Castle', 'Forest', 'Ocean', 'Mountain', 'Dragon', 'Phoenix', 'Warrior', 'Princess', 'Knight', 'Wizard', 'Quest', 'Treasure', 'Crown', 'Sword'];

  const books = [];
  
  for (let i = 0; i < count; i++) {
    const title = `${titleWords[Math.floor(Math.random() * titleWords.length)]} ${titleNouns[Math.floor(Math.random() * titleNouns.length)]}`;
    const author = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const year = Math.floor(Math.random() * (2024 - 1900) + 1900);
    const isbn = `978${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
    
    books.push({
      id: i + 1,
      Title: title,
      Author: author,
      Genre: genre,
      PublishedYear: year,
      ISBN: isbn,
      isModified: false
    });
  }
  
  return books;
};

export default function BookDataManager() {
  const [books, setBooks] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterGenre, setFilterGenre] = useState('');
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(false);

  const ITEMS_PER_PAGE = 50;
  const COLUMNS = ['Title', 'Author', 'Genre', 'PublishedYear', 'ISBN'];

  // Prepare book data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const fakeBooks = generateFakeBooks(10000);
      setBooks(fakeBooks);
      setOriginalBooks(fakeBooks);
      setLoading(false);
    }, 100);
  }, []);

//getting book genres(unique)
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(books.map(book => book.Genre))];
    return uniqueGenres.sort();
  }, [books]);

  // Filter and search books
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = Object.values(book).some(value => 
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesGenre = !filterGenre || book.Genre === filterGenre;
      return matchesSearch && matchesGenre;
    });
  }, [books, searchTerm, filterGenre]);

  // Sort books
  const sortedBooks = useMemo(() => {
    if (!sortConfig.key) return filteredBooks;
    
    return [...filteredBooks].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredBooks, sortConfig]);

  // Paginate books
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedBooks, currentPage]);

  const totalPages = Math.ceil(sortedBooks.length / ITEMS_PER_PAGE);
  const modifiedCount = books.filter(book => book.isModified).length;

  // Handle CSV upload
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    Papa.parse(file, {
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const headers = results.data[0];
          const requiredColumns = ['Title', 'Author', 'Genre', 'PublishedYear', 'ISBN'];
          
          const hasAllColumns = requiredColumns.every(col => headers.includes(col));
          
          if (!hasAllColumns) {
            alert('CSV must contain columns: Title, Author, Genre, PublishedYear, ISBN');
            setLoading(false);
            return;
          }

          const parsedBooks = results.data.slice(1).map((row, index) => {
            const book = { id: index + 1, isModified: false };
            headers.forEach((header, i) => {
              book[header] = row[i];
            });
            return book;
          }).filter(book => book.Title);

          setBooks(parsedBooks);
          setOriginalBooks(parsedBooks);
          setCurrentPage(1);
        }
        setLoading(false);
      },
      header: false,
      skipEmptyLines: true
    });

    event.target.value = '';
  }, []);

  // Handle CSV download
  const handleDownload = useCallback(() => {
    const csvData = books.map(book => ({
      Title: book.Title,
      Author: book.Author,
      Genre: book.Genre,
      PublishedYear: book.PublishedYear,
      ISBN: book.ISBN
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'edited_books.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [books]);

  // Reset to original data
  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      setBooks(originalBooks);
      setCurrentPage(1);
    }
  }, [originalBooks]);

  // Handle sorting
  const handleSort = useCallback((key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  // Handle cell editing
  const handleCellEdit = useCallback((bookId, field, value) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId 
          ? { ...book, [field]: value, isModified: true }
          : book
      )
    );
  }, []);

  // Start editing a cell
  const startEditing = useCallback((bookId, field, currentValue) => {
    setEditingCell({ bookId, field });
    setEditValue(currentValue);
  }, []);

  // Save cell edit
  const saveEdit = useCallback(() => {
    if (editingCell) {
      handleCellEdit(editingCell.bookId, editingCell.field, editValue);
      setEditingCell(null);
      setEditValue('');
    }
  }, [editingCell, editValue, handleCellEdit]);

  // Cancel cell edit
  const cancelEdit = useCallback(() => {
    setEditingCell(null);
    setEditValue('');
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Data Manager</h1>
        
        <ControlsPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterGenre={filterGenre}
          setFilterGenre={setFilterGenre}
          genres={genres}
          onFileUpload={handleFileUpload}
          onDownload={handleDownload}
          onReset={handleReset}
          modifiedCount={modifiedCount}
        />

        <DataStats
          totalBooks={books.length}
          filteredCount={filteredBooks.length}
          modifiedCount={modifiedCount}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        <DataTable
          books={paginatedBooks}
          columns={COLUMNS}
          sortConfig={sortConfig}
          onSort={handleSort}
          editingCell={editingCell}
          editValue={editValue}
          setEditValue={setEditValue}
          onStartEdit={startEditing}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          filteredCount={sortedBooks.length}
        />
      </div>
    </div>
  );
}