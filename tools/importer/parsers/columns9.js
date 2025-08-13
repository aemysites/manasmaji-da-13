/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the element is a footer
  if (!element || !element.classList.contains('footer')) return;

  // Find the grid layout container
  const container = element.querySelector('.container');
  if (!container) return;

  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all top-level columns (children of the grid)
  const columns = Array.from(grid.children);
  // Defensive: Only proceed if we have at least 4 columns (per screenshot/HTML)
  if (columns.length < 4) return;

  // Reference each column's entire content element
  const col1 = columns[0]; // Logo + social icons
  const col2 = columns[1]; // Trends menu (ul)
  const col3 = columns[2]; // Inspire menu (ul)
  const col4 = columns[3]; // Explore menu (ul)

  // Block header as per instructions
  const headerRow = ['Columns block (columns9)'];
  // Create the content row with referenced columns
  const contentRow = [col1, col2, col3, col4];

  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
