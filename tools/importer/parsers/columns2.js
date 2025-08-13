/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row - matches example
  const headerRow = ['Columns block (columns2)'];

  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  // Defensive: check minimum required columns
  if (gridChildren.length < 3) return;

  // LEFT COLUMN: Main feature (large card)
  const mainFeature = gridChildren[0];

  // MIDDLE COLUMN: stacked smaller cards (2 anchor blocks)
  const middleColumn = gridChildren[1];
  // Find all .utility-link-content-block children
  const middleCards = Array.from(middleColumn.querySelectorAll(':scope > a.utility-link-content-block'));
  // Compose as a fragment for this cell
  const middleFrag = document.createDocumentFragment();
  middleCards.forEach(card => middleFrag.appendChild(card));

  // RIGHT COLUMN: vertical list (6 anchor blocks separated by dividers)
  const rightColumn = gridChildren[2];
  // We'll include the entire rightColumn block (which includes dividers and links) for resilience

  // Compose rows for table
  // Example has 2 columns
  //  [left block, right block]
  // We'll combine left feature + middle cards in left column as they represent a single logical grouping
  // Right column is vertical list
  const leftCol = [mainFeature, middleFrag];
  const rightCol = [rightColumn];

  const row2 = [leftCol, rightCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row2
  ], document);

  element.replaceWith(table);
}
