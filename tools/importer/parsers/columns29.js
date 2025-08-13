/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (columnDivs.length === 0) return;

  // Each cell in the content row is the child(ren) of each column div
  const contentRow = columnDivs.map(colDiv => {
    if (colDiv.children.length === 1) return colDiv.children[0];
    return Array.from(colDiv.children);
  });

  // Header row must be a single cell (array of length 1)
  const headerRow = ['Columns block (columns29)'];

  // Table: header row (single cell), then row with one cell per column
  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
