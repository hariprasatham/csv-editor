# Book Data Manager

A powerful, scalable web application for managing large CSV datasets of book records. Built with React and Vite for optimal performance with 10,000+ records.

![Book Data Manager](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-4+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🚀 Features

### Core Functionality

* **📁 CSV Upload/Download** : Upload large CSV files and download edited versions
* **✏️ Inline Editing** : Click any cell to edit data with save/cancel functionality
* **🔍 Real-time Search** : Search across all columns with instant results
* **🏷️ Genre Filtering** : Filter books by genre with dropdown selection
* **📊 Column Sorting** : Click column headers to sort data (ascending/descending)
* **📄 Smart Pagination** : Efficient pagination for large datasets (50 items per page)

### Advanced Features

* **🔄 Reset All Changes** : Revert to original uploaded data with confirmation
* **🎨 Visual Indicators** :
* Orange highlighting for modified rows/cells
* Modified record counter
* Edit mode indicators
* **📱 Responsive Design** : Optimized for desktop, tablet, and mobile devices
* **⚡ Performance Optimized** :
* Virtual pagination for smooth performance
* Memoized calculations
* Efficient re-rendering
* **📈 Data Statistics** : Real-time display of total, filtered, and modified record counts

### User Experience

* **🔄 Loading States** : Smooth loading indicators during data processing
* **⌨️ Keyboard Navigation** : Enter to save, Escape to cancel edits
* **🎯 Smart Pagination** : Ellipsis handling for large page counts
* **📊 Data Validation** : CSV format validation on upload
* **💾 Auto-generated Data** : 10,000 fake book records for immediate testing

## 🛠️ Libraries & Dependencies

### Core Framework

* **React 18+** - UI framework with hooks and functional components
* **Vite** - Fast build tool and development server

### Data Processing

* **Papa Parse (papaparse)** - Robust CSV parsing and generation
  * Features: Dynamic typing, skip empty lines, delimiter detection
  * Used for: CSV upload/download functionality

### UI Components & Styling

* **Tailwind CSS** - Utility-first CSS framework for responsive design
* **Lucide React** - Beautiful, customizable SVG icons
  * Icons used: Upload, Download, Search, Edit, Save, Cancel, Sort arrows, etc.

### Performance & State Management

* **React Hooks** - Built-in state management (useState, useEffect, useMemo, useCallback)
* **Lodash** - Utility library for data manipulation (if needed for complex operations)

## 📦 Installation & Setup

### Prerequisites

* Node.js 16+
* npm or yarn

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd book-data-manager

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
├── components/
│   ├── BookDataManager.jsx    # Main application component
│   ├── LoadingSpinner.jsx     # Loading state component
│   ├── SearchAndFilters.jsx   # Search and filter controls
│   ├── ActionButtons.jsx      # Upload/Download/Reset buttons
│   ├── DataStats.jsx          # Statistics display
│   ├── EditableCell.jsx       # Individual editable cell
│   ├── TableHeader.jsx        # Sortable table header
│   ├── BookRow.jsx            # Table row component
│   ├── Pagination.jsx         # Pagination controls
│   ├── DataTable.jsx          # Complete table wrapper
│   └── ControlsPanel.jsx      # Controls container
└── App.jsx                    # Root component
```

## 📋 CSV Format Requirements

Your CSV file must contain the following columns:

* **Title** - Book title
* **Author** - Author name
* **Genre** - Book genre/category
* **PublishedYear** - Year of publication
* **ISBN** - International Standard Book Number

### Example CSV Format:

```csv
Title,Author,Genre,PublishedYear,ISBN
The Great Gatsby,F. Scott Fitzgerald,Fiction,1925,9780743273565
To Kill a Mockingbird,Harper Lee,Fiction,1960,9780061120084
1984,George Orwell,Science Fiction,1949,9780451524935
```

## 🎯 Usage Examples

### Uploading Data

1. Click "Upload CSV" button
2. Select your CSV file
3. Data will be validated and loaded automatically
4. Invalid files will show error messages

### Editing Data

1. Click any cell to start editing
2. Type new value
3. Press Enter to save or Escape to cancel
4. Modified cells will be highlighted in orange

### Filtering & Searching

1. Use the search box to find records across all columns
2. Select a genre from the dropdown to filter by category
3. Click column headers to sort data
4. Use pagination to navigate large datasets

### Downloading Results

1. Make your edits
2. Click "Download CSV" to export modified data
3. File will be saved as "edited_books.csv"

## ⚡ Performance Features

### Optimizations for Large Datasets

* **Virtual Pagination** : Only renders visible items (50 per page)
* **Memoized Calculations** : Efficient filtering, sorting, and pagination
* **Optimized State Updates** : Minimal re-renders with useCallback hooks
* **Lazy Loading** : Asynchronous data generation prevents UI blocking

### Memory Management

* **In-Memory Storage** : All data stored in React state (no localStorage dependencies)
* **Efficient Filtering** : Real-time search without performance impact
* **Smart Re-rendering** : Only affected components update when data changes

## 🎨 Design Principles

### Modern UI/UX

* **Clean Interface** : Minimal, professional design
* **Visual Feedback** : Clear indicators for all user actions
* **Responsive Layout** : Works seamlessly on all device sizes
* **Accessibility** : Proper contrast ratios and keyboard navigation

### Component Architecture

* **Modular Design** : Small, reusable components
* **Single Responsibility** : Each component has one clear purpose
* **Easy Maintenance** : Clear separation of concerns
* **Scalable Structure** : Easy to extend and modify

## 🐛 Error Handling

* **CSV Validation** : Checks for required columns before import
* **Data Integrity** : Validates data types and formats
* **User Feedback** : Clear error messages and confirmations
* **Graceful Degradation** : App remains functional with partial data

Built with ❤️ using React + Vite
