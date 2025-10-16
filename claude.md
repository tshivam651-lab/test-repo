# Claude Code - Vulnerability Analyzer Documentation

## Project Overview

**Vulnerability Analyzer** is a browser-based web application for analyzing and summarizing security vulnerabilities from CSV files. All processing happens client-side for maximum security and privacy.

**Repository:** https://github.com/tshivam651-lab/test-repo

## Project Structure

```
vulnerability-analyzer/
├── index.html              # Main HTML page with UI structure
├── style.css              # Responsive styling and theme
├── app.js                 # Core JavaScript logic
├── README.md              # User documentation
├── sample-vulnerabilities.csv  # Test data
└── claude.md              # This file - Claude Code documentation
```

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, flexbox, grid
- **Vanilla JavaScript** - No dependencies, pure JS
- **CSV Parsing** - Custom parser with quote handling
- **Client-side only** - No backend required

## Key Features

### 1. CSV Upload & Parsing
- Drag-and-drop or file browser upload
- Custom CSV parser handles quoted values and commas
- Intelligent column detection for common vulnerability fields

### 2. Smart Column Detection
The application automatically detects columns based on common naming patterns:

**Severity columns:**
- severity, risk, priority, level, criticality

**Type columns:**
- type, vulnerability, category, name, title, cve

**System columns:**
- system, host, asset, target, ip, hostname

### 3. Analysis & Visualization
- Severity breakdown (Critical, High, Medium, Low, Info)
- Top vulnerability types ranking
- Most affected systems
- Visual charts and progress bars
- Real-time search and filtering

### 4. Export Functionality
- Generate text summary of analysis
- Download as timestamped file

## Code Architecture

### app.js Structure

**Global State:**
- `vulnerabilities` - Current filtered data
- `originalData` - Unfiltered source data

**Key Functions:**

**File Handling:**
- `handleDragOver()` - Drag-and-drop support
- `handleDrop()` - Process dropped files
- `handleFileSelect()` - File input handler
- `processFile()` - FileReader wrapper

**CSV Processing:**
- `parseCSV()` - Main CSV parsing logic
- `parseCSVLine()` - Handle quotes and commas properly

**Analysis:**
- `analyzeVulnerabilities()` - Core analysis engine
- Detects columns automatically
- Counts by severity, type, and system

**Display:**
- `displayResults()` - Render summary cards
- `displaySeverityChart()` - Animated bar charts
- `displayTopItems()` - Ranked lists
- `displayTable()` - Full data table
- `renderTableRows()` - Table rendering with badges

**Utilities:**
- `handleSearch()` - Real-time search filter
- `exportSummary()` - Generate downloadable summary
- `resetApp()` - Clear state and restart

## Development Guidelines

### Adding New Features

**To add a new chart type:**
1. Create display function in app.js
2. Call from `displayResults()`
3. Add corresponding HTML container in index.html
4. Style in style.css

**To support new CSV formats:**
1. Add column name patterns to detection arrays
2. Update `analyzeVulnerabilities()` logic
3. Test with sample data

**To add new severity levels:**
1. Update `severityCounts` object
2. Add CSS classes in style.css
3. Update chart rendering logic

### Code Style

- Use descriptive variable names
- Comment complex logic
- Keep functions focused and small
- Maintain consistency with existing code
- No external dependencies unless necessary

## Common Tasks with Claude Code

### Testing the Application

```bash
# Open in browser
start C:\Users\shivamtripathi\vulnerability-analyzer\index.html

# Or serve with Python
cd C:\Users\shivamtripathi\vulnerability-analyzer
python -m http.server 8000
```

### Making Changes

Ask Claude Code to:
- "Add a new chart showing vulnerabilities by date"
- "Add export to CSV functionality"
- "Improve the color scheme"
- "Add filtering by severity"
- "Create a print-friendly view"

### Git Workflow

```bash
# After making changes
git add .
git commit -m "Description of changes"
git push origin main
```

### Deploying to GitHub Pages

Ask Claude Code to:
- "Enable GitHub Pages for this repository"
- "Create a custom domain setup"
- "Add deployment instructions to README"

## Sample CSV Format

```csv
Severity,CVE,Vulnerability Type,Description,Affected System,Status,Date Discovered
Critical,CVE-2024-1234,SQL Injection,Description here,web-server-01,Open,2024-01-15
High,CVE-2024-5678,XSS,Description here,web-server-02,Open,2024-01-16
```

## Security Considerations

- **No server-side processing** - All data stays in browser
- **No external requests** - No telemetry or tracking
- **No dependencies** - Reduces attack surface
- **Input validation** - CSV parsing handles malformed data
- **XSS protection** - Uses `textContent` instead of `innerHTML` where possible

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Required features:
- FileReader API
- ES6 JavaScript
- CSS Grid & Flexbox

## Performance Notes

- Handles CSVs up to ~10,000 rows smoothly
- Table rendering may slow with 50,000+ rows
- Consider implementing virtual scrolling for large datasets

## Future Enhancement Ideas

1. **Data Persistence**
   - LocalStorage for recent analyses
   - IndexedDB for large datasets

2. **Advanced Filtering**
   - Multi-column filters
   - Date range filtering
   - Custom filter builder

3. **Visualization Enhancements**
   - Pie charts
   - Timeline view
   - Network graph for related vulnerabilities

4. **Export Options**
   - PDF reports
   - Excel format
   - JSON export

5. **Comparison Features**
   - Compare multiple CSV files
   - Track changes over time
   - Trend analysis

6. **Integration**
   - Direct import from scanning tools
   - API for automation
   - Webhook support

## Troubleshooting

**CSV not parsing correctly:**
- Check for proper comma separation
- Verify quotes are balanced
- Look for special characters

**Charts not displaying:**
- Open browser console (F12)
- Check for JavaScript errors
- Verify CSV has severity column

**Slow performance:**
- Check file size (>10MB may be slow)
- Close other browser tabs
- Try a smaller sample first

## Contact & Support

For issues or questions:
- GitHub Issues: https://github.com/tshivam651-lab/test-repo/issues
- Email: tshivam651@gmail.com

## Credits

Built with Claude Code by Anthropic
Created: October 2025
License: MIT
