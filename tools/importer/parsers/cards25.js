/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as in the example
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Get all direct child divs (cards)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach((cardDiv) => {
    // Find the image (mandatory), select the first img inside this card
    const img = cardDiv.querySelector('img');

    // Find the text block; look for h3 and p inside any .utility-padding-all-2rem (which is always present if text)
    const textWrapper = cardDiv.querySelector('.utility-padding-all-2rem');
    let textCell;
    if (textWrapper) {
      // Reference the actual text container directly
      textCell = textWrapper;
    } else {
      // If no text, just an empty string
      textCell = '';
    }

    // Only add rows with an image
    if (img) {
      rows.push([img, textCell]);
    }
    // If no image, skip this card (per block definition)
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
