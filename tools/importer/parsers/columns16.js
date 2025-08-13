/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout div containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Each direct child of grid is a column div
  const columnDivs = Array.from(grid.children);

  // For each column, reference the immediate child div (the full content of each column)
  const columns = columnDivs.map((colDiv) => {
    // In this HTML, each column's entire block is colDiv, which may wrap a nested structure
    return colDiv;
  });

  // Block table as per requirements: header row (1 column), then 1 row with all cells as columns
  const headerRow = ['Columns block (columns16)'];
  const cells = [
    headerRow,
    columns
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
