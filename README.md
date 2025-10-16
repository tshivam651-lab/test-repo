# Vulnerability Analyzer

A simple, browser-based web application for analyzing and summarizing vulnerabilities from CSV files. All processing happens client-side, ensuring your data never leaves your machine.

## Features

- **CSV Upload**: Drag-and-drop or browse to upload vulnerability CSV files
- **Automatic Analysis**: Intelligently detects severity, vulnerability types, and affected systems
- **Visual Summary**: Beautiful cards and charts showing vulnerability breakdown
- **Search & Filter**: Quickly search through vulnerabilities
- **Export**: Download analysis summary as text file
- **Privacy-First**: All processing happens in your browser - no data uploaded to servers

## Usage

1. Open `index.html` in your web browser
2. Upload a CSV file containing vulnerability data
3. View the instant analysis and summary
4. Search, filter, and export results as needed

## CSV Format

The application automatically detects common column names:

**Severity columns**: severity, risk, priority, level, criticality
**Type columns**: type, vulnerability, category, name, title, cve
**System columns**: system, host, asset, target, ip, hostname

### Example CSV Format

```csv
Severity,CVE,Description,System,Status
Critical,CVE-2024-1234,SQL Injection vulnerability,web-server-01,Open
High,CVE-2024-5678,Remote Code Execution,app-server-02,Open
Medium,CVE-2024-9012,Cross-Site Scripting,web-server-01,In Progress
Low,CVE-2024-3456,Information Disclosure,db-server-01,Open
```

## Supported Severity Levels

- Critical
- High
- Medium/Moderate
- Low
- Info/Informational

## Technology Stack

- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript (no dependencies)

## Deployment

### GitHub Pages
1. Push to GitHub
2. Go to repository Settings > Pages
3. Select branch to deploy
4. Access at: `https://yourusername.github.io/vulnerability-analyzer`

### Local Server
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```

Then open: `http://localhost:8000`

## Security Features

- Client-side only processing
- No data transmission
- No external dependencies
- No tracking or analytics

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT License - Feel free to use and modify

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
