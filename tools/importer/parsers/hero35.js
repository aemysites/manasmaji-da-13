/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, as required
  const headerRow = ['Hero (hero35)'];

  // Background image row (optional): none in the provided HTML, but check for it anyway for robustness
  let backgroundElem = '';
  // Look for any <img> anywhere inside the block (including decorations, backgrounds, etc.)
  const possibleImgs = element.querySelectorAll('img');
  if (possibleImgs.length > 0) {
    backgroundElem = possibleImgs[0];
  }
  const backgroundRow = [backgroundElem];

  // Content row: heading, subheading, CTA (button)
  const contentRowContent = [];
  // The HTML has a grid-layout with two children: one for heading/subheading, one for CTA
  // Get all direct children of .grid-layout
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    const children = grid.querySelectorAll(':scope > *');
    children.forEach(child => {
      // Look for heading and subheading
      const heading = child.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        contentRowContent.push(heading);
      }
      const subheading = child.querySelector('p');
      if (subheading) {
        contentRowContent.push(subheading);
      }
      // Look for CTA button (link)
      if (child.tagName === 'A') {
        contentRowContent.push(child);
      }
    });
  }
  const contentRow = [contentRowContent];

  // Compose block table
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
