/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the block name.
  const headerRow = ['Columns block (columns7)'];

  // Collect all top-level divs for the columns content row
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  const columnsRow = columnDivs;

  // Structure: header row (1 cell), then content row (multiple cells)
  const cells = [
    headerRow,           // [ 'Columns block (columns7)' ]
    columnsRow           // [ <div>...</div>, <div>...</div>, <div>...</div> ]
  ];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
