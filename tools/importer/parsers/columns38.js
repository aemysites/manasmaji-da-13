/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each represents a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Build the table structure: header row must be a single cell, content row has one cell per column
  const cells = [];
  // Header row: single cell
  cells.push(['Columns block (columns38)']);
  // Content row: each column is a cell
  cells.push(columns);
  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
