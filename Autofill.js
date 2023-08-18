const PDFDocument = require('pdfkit');
const fs = require('fs');

// Read input sections from a file
const inputSections = fs.readFileSync('input.txt', 'utf-8').split('\n\n');

// Create a new PDF document
const doc = new PDFDocument();

// Pipe the PDF content to a writable stream (file)
const outputStream = fs.createWriteStream('output.pdf');
doc.pipe(outputStream);

// Define text fields and their corresponding section labels
const textFields = [
  { id: 'field1', x: 100, y: 100, section: 'Information Collected' },
  { id: 'field2', x: 100, y: 150, section: 'Information Usage' },
  { id: 'field3', x: 100, y: 200, section: 'Information Storage' },
  { id: 'field4', x: 100, y: 250, section: 'Information Sharing' },
  { id: 'field5', x: 100, y: 300, section: 'User Rights' }
];

// Add content to the PDF
doc.fontSize(16);

for (const field of textFields) {
  // Draw the text field
  doc.rect(field.x, field.y, 200, 60).stroke();
  
  // Fill the text field with content from the input sections
  const sectionContent = inputSections.find(section => section.startsWith(field.section));
  if (sectionContent) {
    const content = sectionContent.substring(field.section.length).trim();
    doc.text(content, field.x + 5, field.y + 5, { width: 190 });
  }
}

// Finalize and close the PDF
doc.end();
