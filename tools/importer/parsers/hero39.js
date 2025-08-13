/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches exactly:
  const headerRow = ['Hero (hero39)'];

  // --- Row 2: Background Image ---
  // Find the first grid child (contains background image)
  let imgCell = [''];
  const gridDivs = element.querySelectorAll(':scope > div');
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) imgCell = [img];
  }

  // --- Row 3: Headline, Paragraph, CTA ---
  // Find the second grid child (contains text content)
  let contentCellItems = [];
  if (gridDivs.length > 1) {
    // This div contains the actual content grid
    const contentGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // Headline (h1)
      const headline = contentGrid.querySelector('h1');
      if (headline) contentCellItems.push(headline);
      // Paragraph (p)
      const paragraph = contentGrid.querySelector('p');
      if (paragraph) contentCellItems.push(paragraph);
      // CTA (button or link)
      const buttonGroup = contentGrid.querySelector('.button-group');
      if (buttonGroup) contentCellItems.push(buttonGroup);
    }
  }
  // Edge case: if empty, fallback to all direct children (robust to HTML variations)
  if (contentCellItems.length === 0) {
    // Check for headline, paragraph, CTA at top level
    const headline = element.querySelector('h1');
    if (headline) contentCellItems.push(headline);
    const paragraph = element.querySelector('p');
    if (paragraph) contentCellItems.push(paragraph);
    const buttonGroup = element.querySelector('.button-group');
    if (buttonGroup) contentCellItems.push(buttonGroup);
  }
  // If still empty, put empty string to avoid invalid table
  if (contentCellItems.length === 0) {
    contentCellItems = [''];
  }

  const cells = [
    headerRow,
    imgCell,
    [contentCellItems]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
