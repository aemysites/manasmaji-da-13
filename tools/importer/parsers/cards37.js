/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  // Collect all card elements, including nested grid cards
  let cardLinks = Array.from(mainGrid.children).flatMap(child => {
    if (child.classList.contains('utility-link-content-block')) {
      return [child];
    }
    if (child.classList.contains('grid-layout')) {
      return Array.from(child.children).filter(e => e.classList.contains('utility-link-content-block'));
    }
    return [];
  });
  // Assemble card rows: [image, text]
  const rows = cardLinks.map(card => {
    // Find image inside .utility-aspect-* or directly inside card
    let imgContainer = card.querySelector('div[class*="utility-aspect"]');
    let img = imgContainer ? imgContainer.querySelector('img') : card.querySelector('img');
    // Find text container (either inside .utility-padding-all-2rem or card itself)
    let textContainer = card.querySelector('.utility-padding-all-2rem') || card;
    // Heading (h3 or h4)
    let heading = textContainer.querySelector('h3, h4');
    // Description (first p)
    let desc = textContainer.querySelector('p');
    // CTA (button or a.button)
    let cta = textContainer.querySelector('.button, a.button');
    // Compose text cell content
    let textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    // Edge case: No heading, desc, or cta
    if (textCell.length === 0) {
      let div = document.createElement('div');
      div.textContent = textContainer.textContent.trim();
      textCell.push(div);
    }
    return [img, textCell];
  });
  // Table header row
  const cells = [['Cards (cards37)'], ...rows];
  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element with block table
  element.replaceWith(block);
}
