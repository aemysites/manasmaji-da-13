/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell/column
  const headerRow = ['Columns block (columns14)'];

  // Find the grid (columns container) in the block
  const grid = element.querySelector('.w-layout-grid');
  let cells = [];
  if (grid) {
    // Each immediate child of the grid is a column cell
    cells = Array.from(grid.children);
  } else {
    // Fallback: treat all immediate children as columns
    cells = Array.from(element.children);
  }

  // Only the header row must be a single cell, even if there are multiple columns in the content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // single cell
    cells      // as many cells as needed for columns
  ], document);
  element.replaceWith(table);
}