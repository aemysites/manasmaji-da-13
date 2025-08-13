/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout inside the container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid which correspond to columns
  const cols = Array.from(grid.children);

  // Block header: must be a single-cell row
  const headerRow = ['Columns block (columns1)'];

  // Content row: as many columns as needed (from grid.children)
  const contentRow = cols.map(col => col);

  // Use createTable with header as a single column, content with columns
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,      // ["Columns block (columns1)"] as a single cell
    contentRow      // [col1, col2, ...] as the columns
  ], document);

  // Replace original element with block table
  element.replaceWith(blockTable);
}
