/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Cards (cards17), exactly as in the example
  const headerRow = ['Cards (cards17)'];

  // Get all immediate card containers (each card is a direct child div)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Each card row should have two columns: [image, text content]
  // For this HTML, only images present, so image goes in first cell, second cell is empty
  const rows = Array.from(cardDivs, (cardDiv) => {
    const img = cardDiv.querySelector('img');
    // Always create two cells per row to match the example structure
    return [img, ''];
  });

  // Build table: header row, then all card rows
  const cells = [headerRow, ...rows];

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
