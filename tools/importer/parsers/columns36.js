/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the grid layout within the container
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;
  const gridColumns = Array.from(mainGrid.children);

  // There should be two main columns: left (text/buttons) and right (images)
  const leftCol = gridColumns[0];
  const rightCol = gridColumns[1];

  // Left column: find heading, paragraph, and button group
  const leftParts = [];
  const h1 = leftCol.querySelector('h1');
  if (h1) leftParts.push(h1);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftParts.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftParts.push(buttonGroup);

  // Right column: gather images
  let images = [];
  const rightInnerGrid = rightCol.querySelector('.grid-layout');
  if (rightInnerGrid) {
    images = Array.from(rightInnerGrid.querySelectorAll('img'));
  }

  // Table header: matches example exactly
  const headerRow = ['Columns block (columns36)'];
  // Table content row: each side-by-side
  const contentRow = [leftParts, images];
  const cells = [headerRow, contentRow];

  // Create the block table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
