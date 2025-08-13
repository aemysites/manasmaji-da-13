/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the main grid layout
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Extract heading and quote (first two direct children)
  const heading = grid.querySelector('.h2-heading');
  const quote = grid.querySelector('.paragraph-lg');

  // Get the bottom row grid
  const innerGrid = grid.querySelector('.w-layout-grid.grid-layout.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  if (!innerGrid) return;
  // Find avatar+name
  const authorRow = innerGrid.querySelector('.flex-horizontal');
  // Find logo
  const logo = innerGrid.querySelector('.utility-display-inline-block');

  // Table structure
  // Header row
  const headerRow = ['Columns block (columns26)'];

  // First content row: left = heading + quote, right = empty
  const leftColTop = document.createElement('div');
  if (heading) leftColTop.appendChild(heading);
  if (quote) leftColTop.appendChild(quote);
  const row1 = [leftColTop, document.createElement('div')];

  // Second content row: left = author/avatar, right = logo
  const leftColBottom = document.createElement('div');
  if (authorRow) leftColBottom.appendChild(authorRow);
  const rightColBottom = document.createElement('div');
  if (logo) rightColBottom.appendChild(logo);
  const row2 = [leftColBottom, rightColBottom];

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row1,
    row2
  ], document);
  element.replaceWith(table);
}
