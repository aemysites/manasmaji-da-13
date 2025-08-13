/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row exactly as specified
  const headerRow = ['Columns block (columns27)'];

  // Get the grid layout contents
  const container = element.querySelector('.container');
  const grid = container && container.querySelector('.grid-layout');
  // Fallback if grid is missing
  const gridChildren = grid ? Array.from(grid.children) : Array.from(container ? container.children : element.children);

  // Find the first non-IMG child (for text) and first IMG child (for image)
  let textBlock = null;
  let imageBlock = null;
  for (const child of gridChildren) {
    if (!textBlock && child.tagName !== 'IMG') {
      textBlock = child;
    } else if (!imageBlock && child.tagName === 'IMG') {
      imageBlock = child;
    }
    if (textBlock && imageBlock) break;
  }

  // If either column is missing, use empty div placeholder for robustness
  if (!textBlock) textBlock = document.createElement('div');
  if (!imageBlock) imageBlock = document.createElement('div');

  // Build the table structure: header, then two columns (text, image)
  const cells = [
    headerRow,
    [textBlock, imageBlock]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
