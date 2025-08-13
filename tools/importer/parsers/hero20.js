/* global WebImporter */
export default function parse(element, { document }) {
  // 1. HEADER ROW
  const headerRow = ['Hero (hero20)'];

  // 2. BACKGROUND IMAGE(S) CELL
  // The example only shows one image in the cell, but this HTML has multiple images.
  // To preserve semantic meaning and resilience, combine all images into one div (as in guidelines).
  let bgImages = [];
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (grid) {
    bgImages = Array.from(grid.querySelectorAll('img'));
  } else {
    // fallback: find all images directly under element
    bgImages = Array.from(element.querySelectorAll('img'));
  }
  const bgDiv = document.createElement('div');
  bgImages.forEach(img => bgDiv.appendChild(img));

  // 3. TEXT/CALL TO ACTION CELL
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  const textDiv = document.createElement('div');
  if (contentContainer) {
    // Title (Heading)
    const h1 = contentContainer.querySelector('h1');
    if (h1) textDiv.appendChild(h1);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) textDiv.appendChild(subheading);
    // CTA buttons (all links)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      Array.from(buttonGroup.children).forEach(btn => {
        textDiv.appendChild(btn);
      });
    }
  }

  // 4. Compose table cells array
  const cells = [
    headerRow,
    [bgDiv],
    [textDiv],
  ];

  // 5. Replace original element with block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
