/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero28)'];

  // Find immediate grid children
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = undefined;
  let headlineContent = undefined;

  if (grid) {
    const gridDivs = grid.querySelectorAll(':scope > div');
    // First grid cell: look for background image
    if (gridDivs.length > 0) {
      const img = gridDivs[0].querySelector('img');
      if (img) bgImg = img;
    }
    // Second grid cell: headline and CTAs
    if (gridDivs.length > 1) {
      // Grab the entire container of text, as structure may vary
      const contentDiv = gridDivs[1];
      // Use the whole content block for resilience
      if (contentDiv) headlineContent = contentDiv;
    }
  }

  // Cells: always produce 3 rows, 1 column each
  const cells = [
    headerRow,
    [bgImg || ''],
    [headlineContent || '']
  ];

  // Build block table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
