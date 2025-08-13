/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches the example exactly
  const headerRow = ['Cards (cards21)'];

  // 2. Find all card containers (resilient to variations)
  // The provided HTML is only a single card, so this function extracts just one.
  // But structure makes it easy to extend for multiple cards.

  // Find the innermost card-body containing all relevant card content
  let cardBody = element.querySelector('.card-body');

  // Defensive: If there's no cardBody, fallback to element itself (edge case)
  if (!cardBody) cardBody = element;

  // Extract image: must be present
  const img = cardBody.querySelector('img');

  // Extract heading: usually styled with .h4-heading
  const heading = cardBody.querySelector('.h4-heading');

  // Extract description (if any) below heading and not part of heading
  // In this HTML, only heading and image are present. No description or CTA.
  // If the heading is followed by text nodes or elements, add that as description.
  let textCellContent = [];
  if (heading) {
    textCellContent.push(heading);
    // Look for sibling nodes after heading (e.g., paragraphs)
    let sibling = heading.nextSibling;
    while (sibling) {
      // Only append element nodes with visible text (for future HTMLs)
      if (sibling.nodeType === 1 && sibling.textContent.trim()) {
        textCellContent.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
  }

  // Build final table rows
  // Each card is a row: [image, text cell]
  const rows = [
    headerRow,
    [img, textCellContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
