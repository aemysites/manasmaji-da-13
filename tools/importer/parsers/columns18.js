/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct column elements (should be 2: left content, right list, right image)
  const gridChildren = Array.from(grid.children);
  // Defensive: only process up to the first image as a column
  // For this layout: [text, contact list, image] -> combine text+list, image as another column
  // But the provided HTML for this example is:
  // [left: text block, middle: contact list, right: image]

  // Group the first two children (text and contact list) as one column
  const leftCol = document.createElement('div');
  leftCol.appendChild(gridChildren[0]); // text block
  leftCol.appendChild(gridChildren[1]); // contact list
  // The third child is the image column
  const rightCol = gridChildren[2];

  // Build the table structure
  const headerRow = ['Columns (columns18)'];
  const columnsRow = [leftCol, rightCol];
  const cells = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
