/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards10)'];

  // Get all immediate card anchors
  const cardAnchors = Array.from(element.querySelectorAll(':scope > a.card-link'));

  const rows = cardAnchors.map(card => {
    // Image: find the first img inside the aspect ratio div
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }

    // Text content
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    const contentParts = [];
    if (contentDiv) {
      // Tag (optional, as a span for styling, but reference the DIV for semantic retention)
      const tagGroup = contentDiv.querySelector('.tag-group');
      if (tagGroup) {
        // Reference the tag group div directly to preserve structure
        contentParts.push(tagGroup);
      }
      // Heading (h3, h4, etc)
      const heading = contentDiv.querySelector('h3, .h4-heading');
      if (heading) {
        contentParts.push(heading);
      }
      // Description (paragraph)
      const paragraph = contentDiv.querySelector('p');
      if (paragraph) {
        contentParts.push(paragraph);
      }
    }
    // Compose the row: [img, [tagGroup, heading, paragraph]]
    return [img, contentParts];
  });

  // Compose table
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
