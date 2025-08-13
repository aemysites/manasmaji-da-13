/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block spec
  const headerRow = ['Hero (hero12)'];

  // 1. Extract the background image: the first .cover-image directly under the grid-layout (i.e. not the card image)
  let backgroundImg = null;
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    const directDivs = grid.querySelectorAll(':scope > div');
    for (const div of directDivs) {
      const img = div.querySelector(':scope > img.cover-image');
      // Only pick the first one before the content container (structure-based)
      if (img) {
        backgroundImg = img;
        break;
      }
    }
  }

  // 2. Extract the content block: the big container div with .card
  let contentBlock = null;
  const container = element.querySelector('.container');
  if (container) {
    const card = container.querySelector('.card');
    if (card) {
      contentBlock = card;
    }
  }

  // Ensure at least empty string for missing content (edge case)
  const cells = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    [contentBlock ? contentBlock : '']
  ];

  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
