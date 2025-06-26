// Hebrew Text Editor JavaScript
class HebrewTextEditor {
    constructor() {
        this.textEditor = document.getElementById('textEditor');
        this.fileInput = document.getElementById('fileInput');
        this.loadBtn = document.getElementById('loadBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.fileName = document.getElementById('fileName');
        this.charCount = document.getElementById('charCount');
        this.statusMessage = document.getElementById('statusMessage');
        this.autoSaveStatus = document.getElementById('autoSaveStatus');
        
        this.autoSaveTimer = null;
        this.currentContent = '';
        
        this.initializeEventListeners();
        this.loadFromLocalStorage();
        this.updateCharCount();
    }
    
    initializeEventListeners() {
        // File operations
        this.loadBtn.addEventListener('click', () => this.triggerFileLoad());
        this.saveBtn.addEventListener('click', () => this.saveFile());
        this.fileInput.addEventListener('change', (e) => this.handleFileLoad(e));
        
        // Text editor events
        this.textEditor.addEventListener('input', () => {
            this.updateCharCount();
            this.scheduleAutoSave();
        });
        
        // Auto-indentation on Enter key
        this.textEditor.addEventListener('keydown', (e) => this.handleTextEditorKeydown(e));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // File name changes
        this.fileName.addEventListener('input', () => this.scheduleAutoSave());
        
        // Drag and drop support
        this.setupDragAndDrop();
    }
    
    triggerFileLoad() {
        this.fileInput.click();
    }
    
    handleFileLoad(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (!file.type.match('text.*')) {
            this.showStatus('שגיאה: יש לבחור קובץ טקסט בלבד (Error: Please select a text file only)', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.textEditor.value = e.target.result;
            this.fileName.value = file.name;
            this.updateCharCount();
            this.saveToLocalStorage();
            this.showStatus(`קובץ נטען בהצלחה: ${file.name} (File loaded successfully: ${file.name})`, 'success');
        };
        
        reader.onerror = () => {
            this.showStatus('שגיאה בטעינת הקובץ (Error loading file)', 'error');
        };
        
        reader.readAsText(file, 'UTF-8');
    }
    
    saveFile() {
        const content = this.textEditor.value;
        const filename = this.fileName.value || 'hebrew_text.txt';
        
        if (!content.trim()) {
            this.showStatus('אין תוכן לשמירה (No content to save)', 'error');
            return;
        }
        
        try {
            // Create blob with UTF-8 encoding
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.style.display = 'none';
            
            // Trigger download
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Clean up
            URL.revokeObjectURL(url);
            
            this.showStatus(`קובץ נשמר בהצלחה: ${filename} (File saved successfully: ${filename})`, 'success');
        } catch (error) {
            this.showStatus('שגיאה בשמירת הקובץ (Error saving file)', 'error');
            console.error('Save error:', error);
        }
    }
    
    updateCharCount() {
        const count = this.textEditor.value.length;
        this.charCount.textContent = `${count.toLocaleString('he-IL')} תווים`;
    }
    
    handleKeyboardShortcuts(event) {
        // Ctrl+S or Cmd+S for save
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            this.saveFile();
        }
        
        // Ctrl+O or Cmd+O for open
        if ((event.ctrlKey || event.metaKey) && event.key === 'o') {
            event.preventDefault();
            this.triggerFileLoad();
        }
        
        // Ctrl+N or Cmd+N for new file
        if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
            event.preventDefault();
            this.newFile();
        }
    }
    
    newFile() {
        if (this.textEditor.value.trim() && 
            !confirm('האם אתה בטוח שברצונך ליצור קובץ חדש? השינויים הלא שמורים יאבדו.\n(Are you sure you want to create a new file? Unsaved changes will be lost.)')) {
            return;
        }
        
        this.textEditor.value = '';
        this.fileName.value = 'hebrew_text.txt';
        this.updateCharCount();
        this.clearLocalStorage();
        this.showStatus('קובץ חדש נוצר (New file created)', 'success');
    }
    
    scheduleAutoSave() {
        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = setTimeout(() => {
            this.saveToLocalStorage();
        }, 1000); // Auto-save after 1 second of inactivity
    }
    
    saveToLocalStorage() {
        try {
            const data = {
                content: this.textEditor.value,
                fileName: this.fileName.value,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('hebrewTextEditor', JSON.stringify(data));
            this.autoSaveStatus.textContent = 'נשמר אוטומטית (Auto-saved)';
            setTimeout(() => {
                this.autoSaveStatus.textContent = '';
            }, 2000);
        } catch (error) {
            console.error('Auto-save error:', error);
        }
    }
    
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('hebrewTextEditor');
            if (saved) {
                const data = JSON.parse(saved);
                this.textEditor.value = data.content || '';
                this.fileName.value = data.fileName || 'hebrew_text.txt';
                
                if (data.content) {
                    this.showStatus('תוכן קודם שוחזר (Previous content restored)', 'success');
                }
            }
        } catch (error) {
            console.error('Load from localStorage error:', error);
        }
    }
    
    clearLocalStorage() {
        localStorage.removeItem('hebrewTextEditor');
    }
    
    setupDragAndDrop() {
        const dropZone = this.textEditor;
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-over');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-over');
            });
        });
        
        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.match('text.*')) {
                    // Simulate file input change
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    this.fileInput.files = dataTransfer.files;
                    this.handleFileLoad({ target: { files: [file] } });
                } else {
                    this.showStatus('שגיאה: יש לגרור קובץ טקסט בלבד (Error: Please drag a text file only)', 'error');
                }
            }
        });
    }
    
    handleTextEditorKeydown(event) {
        // Handle Enter key for auto-indentation
        if (event.key === 'Enter') {
            event.preventDefault();
            
            const textarea = this.textEditor;
            const cursorPos = textarea.selectionStart;
            const textBeforeCursor = textarea.value.substring(0, cursorPos);
            const textAfterCursor = textarea.value.substring(cursorPos);
            
            // Find the current line
            const lines = textBeforeCursor.split('\n');
            const currentLine = lines[lines.length - 1];
            
            // Extract leading spaces/tabs from current line
            const indentMatch = currentLine.match(/^(\s*)/);
            const indent = indentMatch ? indentMatch[1] : '';
            
            // Insert new line with same indentation
            const newText = textBeforeCursor + '\n' + indent + textAfterCursor;
            textarea.value = newText;
            
            // Position cursor after the indentation on the new line
            const newCursorPos = cursorPos + 1 + indent.length;
            textarea.selectionStart = textarea.selectionEnd = newCursorPos;
            
            // Trigger input event for character count and auto-save
            this.updateCharCount();
            this.scheduleAutoSave();
        }
    }
    
    showStatus(message, type = 'info') {
        this.statusMessage.textContent = message;
        this.statusMessage.className = type;
        
        // Clear status after 5 seconds
        setTimeout(() => {
            this.statusMessage.textContent = 'מוכן לעריכה (Ready to edit)';
            this.statusMessage.className = '';
        }, 5000);
    }
    
    // Hebrew text direction detection and handling
    detectTextDirection(text) {
        const hebrewRegex = /[\u0590-\u05FF]/;
        const englishRegex = /[a-zA-Z]/;
        
        const hebrewChars = (text.match(hebrewRegex) || []).length;
        const englishChars = (text.match(englishRegex) || []).length;
        
        return hebrewChars > englishChars ? 'rtl' : 'ltr';
    }
    
    // Enhanced text editing features for Hebrew
    insertHebrewPunctuation(char) {
        const cursorPos = this.textEditor.selectionStart;
        const textBefore = this.textEditor.value.substring(0, cursorPos);
        const textAfter = this.textEditor.value.substring(cursorPos);
        
        this.textEditor.value = textBefore + char + textAfter;
        this.textEditor.selectionStart = this.textEditor.selectionEnd = cursorPos + 1;
        this.textEditor.focus();
        
        this.updateCharCount();
        this.scheduleAutoSave();
    }
}

// Initialize the editor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HebrewTextEditor();
});

// Add some CSS for drag and drop visual feedback
const style = document.createElement('style');
style.textContent = `
    .drag-over {
        border-color: #3498db !important;
        background-color: #ebf3fd !important;
    }
    
    #statusMessage.success {
        color: #27ae60;
    }
    
    #statusMessage.error {
        color: #e74c3c;
    }
    
    #statusMessage.info {
        color: #3498db;
    }
`;
document.head.appendChild(style);
