/* global WebImporter */
export default function parse(element, { document }) {
  // Safely find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate column elements within the grid
  const columns = Array.from(grid.children);

  // If there are no columns, do nothing
  if (columns.length === 0) return;

  // Create the header row exactly as specified
  const headerRow = ['Columns block (columns31)'];

  // Create the content row containing each column's content reference
  // Each cell should reference the entire column element so that all text and semantic meaning is preserved
  const contentRow = columns.map(col => col);

  // Create the block table using the helper
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original container element with the new table
  element.replaceWith(table);
}
