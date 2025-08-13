/* global WebImporter */
export default function parse(element, { document }) {
  // Only proceed if the grid layout exists
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Extract columns (immediate children of grid)
  const columnElems = Array.from(grid.children);
  // Defensive: ensure we have exactly two columns
  if (columnElems.length < 2) return;

  // Table header row with block name exactly as required
  const headerRow = ['Columns block (columns32)'];

  // Second row: two columns (as per example structure)
  // - First cell: Left column (image)
  // - Second cell: Right column (text content block)
  // Reference the existing elements directly
  const cellsRow = [columnElems[0], columnElems[1]];

  // Construct the block table
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(blockTable);
}
