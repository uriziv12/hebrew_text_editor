# עורך טקסט עברי - Hebrew Text Editor

A web-based text editor specifically designed for editing Hebrew text files with proper RTL (Right-to-Left) support.

## Features

### Core Functionality
- **Load Files**: Load text files from your computer
- **Save Files**: Download edited text files to your computer
- **RTL Text Editing**: Proper Hebrew text display with right-to-left direction
- **Character Count**: Real-time character counting in Hebrew
- **Auto-save**: Automatic saving to browser's local storage

### Additional Features
- **Drag & Drop**: Drag text files directly onto the editor
- **Keyboard Shortcuts**:
  - `Ctrl+S` / `Cmd+S`: Save file
  - `Ctrl+O` / `Cmd+O`: Open file
  - `Ctrl+N` / `Cmd+N`: New file
- **Responsive Design**: Works on desktop and mobile devices
- **Bilingual Interface**: Hebrew and English labels
- **UTF-8 Support**: Full Unicode support for Hebrew characters

## Usage

1. **Open the Editor**: Open `index.html` in your web browser
2. **Load a File**: Click "טען קובץ (Load File)" or use `Ctrl+O`
3. **Edit Text**: Type Hebrew text in the editor - it will automatically display RTL
4. **Save File**: Click "שמור קובץ (Save File)" or use `Ctrl+S`
5. **File Name**: Edit the file name in the input field before saving

## Technical Details

### File Structure
```
hebrew_text_editor/
├── index.html          # Main application page
├── styles.css          # RTL-optimized styling
├── script.js           # Core functionality
├── README.md           # This documentation
└── LICENSE             # MIT license
```

### Browser Compatibility
- Modern browsers with File API support
- Chrome, Firefox, Safari, Edge (latest versions)
- No server required - runs entirely client-side
- Works offline once loaded

### Hebrew Text Support
- **Direction**: `direction: rtl` for proper Hebrew text flow
- **Alignment**: `text-align: right` for Hebrew text alignment
- **Fonts**: Hebrew-optimized font stack including 'David' and 'Times New Roman'
- **Unicode**: Full Unicode-bidi support for mixed Hebrew/English text

## Development

### Technologies Used
- **HTML5**: Semantic markup with RTL support
- **CSS3**: Responsive design with Hebrew-specific styling
- **Vanilla JavaScript**: File operations using modern Web APIs
- **File API**: For reading local files
- **Blob API**: For creating downloadable files
- **LocalStorage**: For auto-save functionality

### Key Components

#### File Operations
- Uses HTML5 File API for reading files
- Creates downloadable files using Blob API and URL.createObjectURL
- Supports UTF-8 encoding for proper Hebrew character handling

#### RTL Text Handling
- CSS `direction: rtl` for Hebrew text flow
- `unicode-bidi: embed` for mixed content support
- Hebrew-optimized font stack for better rendering

#### Auto-save Feature
- Saves content to localStorage every second after changes
- Restores content on page reload
- Visual feedback for auto-save status

## Installation

No installation required! Simply:

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start editing Hebrew text files

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Future Enhancements (Planned)

- Support for additional file formats (RTF, DOCX)
- Advanced Hebrew typography features
- Text search and replace functionality
- Multiple file tabs
- Syntax highlighting for Hebrew poetry/prose
- Export to PDF with RTL support
- Cloud storage integration

---

**עורך טקסט עברי** - Built with ❤️ for the Hebrew-speaking community
