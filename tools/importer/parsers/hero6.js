/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match example exactly
  const headerRow = ['Hero (hero6)'];

  // Find background image: the first img inside the first grid cell
  let backgroundImg = null;
  const gridCells = element.querySelectorAll(':scope > div > div');
  if (gridCells.length > 0) {
    backgroundImg = gridCells[0].querySelector('img');
  }
  // Row 2: background image (if present)
  const row2 = [backgroundImg ? backgroundImg : ''];

  // Find hero content: the card with heading, subheading, buttons
  let contentEl = null;
  // The card is inside the second grid cell
  if (gridCells.length > 1) {
    contentEl = gridCells[1].querySelector('.card');
  }
  // Row 3: content (heading, subheading, call-to-actions)
  const row3 = [contentEl ? contentEl : ''];

  // Compose table
  const cells = [headerRow, row2, row3];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
