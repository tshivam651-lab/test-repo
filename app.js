// Global variables
let vulnerabilities = [];
let originalData = [];

// DOM Elements
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const resultsSection = document.getElementById('resultsSection');
const resetBtn = document.getElementById('resetBtn');
const searchInput = document.getElementById('searchInput');
const exportBtn = document.getElementById('exportBtn');

// Event Listeners
uploadBox.addEventListener('click', () => fileInput.click());
uploadBox.addEventListener('dragover', handleDragOver);
uploadBox.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', handleFileSelect);
resetBtn.addEventListener('click', resetApp);
searchInput.addEventListener('input', handleSearch);
exportBtn.addEventListener('click', exportSummary);

// File handling
function handleDragOver(e) {
    e.preventDefault();
    uploadBox.style.borderColor = '#764ba2';
}

function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
        processFile(file);
    } else {
        alert('Please upload a CSV file');
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
}

// CSV Processing
function processFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const csvData = e.target.result;
        parseCSV(csvData);
    };
    reader.readAsText(file);
}

function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

    vulnerabilities = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;

        const values = parseCSVLine(lines[i]);
        const vuln = {};

        headers.forEach((header, index) => {
            vuln[header] = values[index] ? values[index].trim().replace(/^"|"$/g, '') : '';
        });

        vulnerabilities.push(vuln);
    }

    originalData = [...vulnerabilities];
    analyzeVulnerabilities();
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);

    return result;
}

// Vulnerability Analysis
function analyzeVulnerabilities() {
    if (vulnerabilities.length === 0) {
        alert('No vulnerability data found in the CSV file');
        return;
    }

    // Detect severity column (common names)
    const severityColumns = ['severity', 'risk', 'priority', 'level', 'criticality'];
    const severityKey = Object.keys(vulnerabilities[0]).find(key =>
        severityColumns.some(col => key.toLowerCase().includes(col))
    );

    // Count by severity
    const severityCounts = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        info: 0
    };

    vulnerabilities.forEach(vuln => {
        const severity = (vuln[severityKey] || '').toLowerCase();
        if (severity.includes('critical')) severityCounts.critical++;
        else if (severity.includes('high')) severityCounts.high++;
        else if (severity.includes('medium') || severity.includes('moderate')) severityCounts.medium++;
        else if (severity.includes('low')) severityCounts.low++;
        else severityCounts.info++;
    });

    // Find vulnerability type column
    const typeColumns = ['type', 'vulnerability', 'category', 'name', 'title', 'cve'];
    const typeKey = Object.keys(vulnerabilities[0]).find(key =>
        typeColumns.some(col => key.toLowerCase().includes(col))
    );

    // Count vulnerability types
    const typeCounts = {};
    vulnerabilities.forEach(vuln => {
        const type = vuln[typeKey] || 'Unknown';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    // Find affected system column
    const systemColumns = ['system', 'host', 'asset', 'target', 'ip', 'hostname'];
    const systemKey = Object.keys(vulnerabilities[0]).find(key =>
        systemColumns.some(col => key.toLowerCase().includes(col))
    );

    // Count affected systems
    const systemCounts = {};
    vulnerabilities.forEach(vuln => {
        const system = vuln[systemKey] || 'Unknown';
        systemCounts[system] = (systemCounts[system] || 0) + 1;
    });

    displayResults(severityCounts, typeCounts, systemCounts);
}

// Display Results
function displayResults(severityCounts, typeCounts, systemCounts) {
    // Update summary cards
    document.getElementById('totalVulns').textContent = vulnerabilities.length;
    document.getElementById('criticalCount').textContent = severityCounts.critical;
    document.getElementById('highCount').textContent = severityCounts.high;
    document.getElementById('mediumCount').textContent = severityCounts.medium;
    document.getElementById('lowCount').textContent = severityCounts.low;

    // Display severity chart
    displaySeverityChart(severityCounts);

    // Display top vulnerability types
    displayTopItems(typeCounts, 'topVulnTypes', 'vulnerability types');

    // Display affected systems
    displayTopItems(systemCounts, 'affectedSystems', 'systems');

    // Display data table
    displayTable();

    // Show results section
    document.querySelector('.upload-section').style.display = 'none';
    resultsSection.style.display = 'block';
}

function displaySeverityChart(severityCounts) {
    const chart = document.getElementById('severityChart');
    const total = Object.values(severityCounts).reduce((a, b) => a + b, 0);

    chart.innerHTML = '';

    Object.entries(severityCounts).forEach(([severity, count]) => {
        if (count > 0) {
            const percentage = total > 0 ? (count / total * 100).toFixed(1) : 0;

            const barContainer = document.createElement('div');
            barContainer.className = 'chart-bar';

            barContainer.innerHTML = `
                <div class="chart-label">${severity.charAt(0).toUpperCase() + severity.slice(1)}</div>
                <div class="chart-bar-wrapper">
                    <div class="chart-bar-fill ${severity}" style="width: ${percentage}%">
                        ${count}
                    </div>
                </div>
                <div class="chart-percentage">${percentage}%</div>
            `;

            chart.appendChild(barContainer);
        }
    });
}

function displayTopItems(counts, elementId, label) {
    const container = document.getElementById(elementId);
    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    container.innerHTML = '';

    if (sorted.length === 0) {
        container.innerHTML = `<p style="color: #666;">No ${label} data available</p>`;
        return;
    }

    sorted.forEach(([name, count]) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-label">${name}</div>
            <div class="list-item-count">${count}</div>
        `;
        container.appendChild(item);
    });
}

function displayTable() {
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');

    // Get headers
    const headers = Object.keys(vulnerabilities[0]);

    tableHeader.innerHTML = '';
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    renderTableRows(vulnerabilities);
}

function renderTableRows(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(vuln => {
        const tr = document.createElement('tr');
        Object.entries(vuln).forEach(([key, value]) => {
            const td = document.createElement('td');

            // Check if this is a severity column
            if (key.toLowerCase().includes('severity') ||
                key.toLowerCase().includes('risk') ||
                key.toLowerCase().includes('priority')) {
                const severity = value.toLowerCase();
                let severityClass = 'info';
                if (severity.includes('critical')) severityClass = 'critical';
                else if (severity.includes('high')) severityClass = 'high';
                else if (severity.includes('medium') || severity.includes('moderate')) severityClass = 'medium';
                else if (severity.includes('low')) severityClass = 'low';

                td.innerHTML = `<span class="severity-badge severity-${severityClass}">${value}</span>`;
            } else {
                td.textContent = value;
            }

            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === '') {
        renderTableRows(vulnerabilities);
        return;
    }

    const filtered = vulnerabilities.filter(vuln => {
        return Object.values(vuln).some(value =>
            value.toLowerCase().includes(searchTerm)
        );
    });

    renderTableRows(filtered);
}

// Export functionality
function exportSummary() {
    const severityCounts = {
        critical: parseInt(document.getElementById('criticalCount').textContent),
        high: parseInt(document.getElementById('highCount').textContent),
        medium: parseInt(document.getElementById('mediumCount').textContent),
        low: parseInt(document.getElementById('lowCount').textContent)
    };

    const total = parseInt(document.getElementById('totalVulns').textContent);

    let summary = `Vulnerability Analysis Summary\n`;
    summary += `Generated: ${new Date().toLocaleString()}\n\n`;
    summary += `Total Vulnerabilities: ${total}\n\n`;
    summary += `Severity Breakdown:\n`;
    summary += `- Critical: ${severityCounts.critical}\n`;
    summary += `- High: ${severityCounts.high}\n`;
    summary += `- Medium: ${severityCounts.medium}\n`;
    summary += `- Low: ${severityCounts.low}\n`;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vulnerability-summary-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Reset application
function resetApp() {
    vulnerabilities = [];
    originalData = [];
    fileInput.value = '';
    searchInput.value = '';
    resultsSection.style.display = 'none';
    document.querySelector('.upload-section').style.display = 'block';
}
