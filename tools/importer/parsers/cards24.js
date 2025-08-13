/* global WebImporter */
export default function parse(element, { document }) {
  // Block header matches required format
  const headerRow = ['Cards (cards24)'];

  // Find all direct card links
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // Reference image element (not clone)
    let imgEl = card.querySelector('img');

    // Compose text cell content
    const textContent = [];
    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Wrap tag/date together to preserve structure
      const tagRowDiv = document.createElement('div');
      // Reference tagRow directly
      tagRowDiv.appendChild(tagRow);
      textContent.push(tagRowDiv);
    }
    // Heading (h3)
    const heading = card.querySelector('h3, h4, h2, h1');
    if (heading) {
      textContent.push(heading);
    }
    // If textContent is empty (edge case), fill with empty string for semantic
    const textCell = textContent.length > 0 ? textContent : [''];
    return [imgEl, textCell];
  });

  // Table: first row header, next rows are cards
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}