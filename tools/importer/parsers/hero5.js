/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row
  const headerRow = ['Hero (hero5)'];

  // Find all direct children of the main grid (likely 2: content-div and img)
  // The main grid is usually the first (and only) child of the section
  const grid = element.querySelector(':scope > .w-layout-grid');
  let imgEl = null;
  let contentBlock = null;

  if (grid) {
    // Find direct children of the grid
    const gridChildren = Array.from(grid.children);
    // Identify image and content
    gridChildren.forEach(child => {
      if (!imgEl && child.tagName === 'IMG') {
        imgEl = child;
      } else if (
        !contentBlock &&
        child.querySelector &&
        (child.querySelector('h1, h2, h3, h4, h5, h6') ||
          child.querySelector('.rich-text') ||
          child.querySelector('.button-group'))
      ) {
        contentBlock = child;
      }
    });
  }

  // Fallback: in case structure is flatter
  if (!imgEl) {
    imgEl = element.querySelector('img');
  }
  if (!contentBlock) {
    // Look for a content div with heading or buttons
    contentBlock = element.querySelector('[class*="section"], .button-group');
  }

  // The spec says: row 2 is background image (optional)
  // row 3 is headline + paragraph + CTAs
  const secondRow = [imgEl || ''];
  const thirdRow = [contentBlock || ''];

  const cells = [headerRow, secondRow, thirdRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
