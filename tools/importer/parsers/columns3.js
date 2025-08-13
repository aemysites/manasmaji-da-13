/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate child divs of the grid - these are the columns
  const columns = Array.from(grid.children);

  // Compose header row
  const headerRow = ['Columns block (columns3)'];

  // Compose content row - each cell is an array of all elements in that column
  const contentRow = columns.map(col => {
    // Defensive: Only include element children
    const kids = Array.from(col.children).filter(
      el => el.nodeType === 1
    );
    if (kids.length === 0) return '';
    if (kids.length === 1) return kids[0];
    return kids;
  });

  // Compose table cells
  const cells = [headerRow, contentRow];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}
