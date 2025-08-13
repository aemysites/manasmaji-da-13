/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];

  // Find all tabs (each contains a card grid)
  const tabPanes = Array.from(element.querySelectorAll(':scope > div.w-tab-pane'));
  tabPanes.forEach((pane) => {
    // Find the grid container
    const grids = Array.from(pane.querySelectorAll('.grid-layout'));
    grids.forEach((grid) => {
      // Each card is an <a> direct child of grid
      const cards = Array.from(grid.querySelectorAll(':scope > a'));
      cards.forEach((card) => {
        // Find image (mandatory)
        let img = card.querySelector('img');
        // Find heading (optional)
        let heading = card.querySelector('h3');
        // Find paragraph(s) (optional)
        let paragraph = card.querySelector('.paragraph-sm');
        // Compose text cell, keeping semantic structure
        const textCell = [];
        if (heading) textCell.push(heading);
        if (paragraph) textCell.push(paragraph);
        cells.push([
          img ? img : '', // Always one cell for image (may be empty)
          textCell.length > 0 ? textCell : '' // Second cell for text content (may be empty)
        ]);
      });
    });
  });

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}