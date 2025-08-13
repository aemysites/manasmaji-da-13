/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example EXACTLY
  const headerRow = ['Cards (cards19)'];
  // Get all card containers (direct children)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [headerRow];
  cardDivs.forEach(card => {
    // First column: Icon (must reference existing element)
    let icon = null;
    // Find the topmost icon div (class 'icon')
    const iconDiv = card.querySelector(':scope > div .icon');
    if (iconDiv) {
      icon = iconDiv;
    }
    // Second column: Text content (should use the entire p element)
    let textContent = null;
    const p = card.querySelector('p');
    if (p) {
      textContent = p;
    } else {
      // If no p tag is found, fallback to all text nodes
      textContent = document.createElement('span');
      textContent.textContent = card.textContent.trim();
    }
    rows.push([icon, textContent]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
