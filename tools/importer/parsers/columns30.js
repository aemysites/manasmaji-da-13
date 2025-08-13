/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout for the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid (each is a column)
  const columnNodes = Array.from(grid.children);
  // Table header: must match example
  const headerRow = ['Columns block (columns30)'];
  // Second row: each column content as a cell, reference the node directly
  const columnsRow = columnNodes.map(node => node);
  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);
  // Replace the original element with the structured table block
  element.replaceWith(table);
}
