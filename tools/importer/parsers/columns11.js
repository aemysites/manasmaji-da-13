/* global WebImporter */
export default function parse(element, { document }) {
  // Section root: <section class="section">
  const container = element.querySelector('.container');
  if (!container) return;

  // The first grid contains the left and right content (headline/eyebrow, description, author, button)
  const contentGrid = container.querySelector('.grid-layout.tablet-1-column');
  let leftCell = document.createElement('div');
  let rightCell = document.createElement('div');

  if (contentGrid) {
    // Left column: headline and eyebrow
    const leftCol = contentGrid.children[0];
    if (leftCol) {
      // Eyebrow
      const eyebrow = leftCol.querySelector('.eyebrow');
      if (eyebrow) leftCell.appendChild(eyebrow);
      // Heading
      const heading = leftCol.querySelector('h1');
      if (heading) leftCell.appendChild(heading);
    }
    // Right column: paragraph, author, button
    const rightCol = contentGrid.children[1];
    if (rightCol) {
      // Paragraph
      const para = rightCol.querySelector('.w-richtext');
      if (para) rightCell.appendChild(para);
      // Author info (row)
      const authorRow = rightCol.querySelector('.grid-layout .flex-horizontal.y-center');
      if (authorRow) rightCell.appendChild(authorRow);
      // Button
      const button = rightCol.querySelector('a.button');
      if (button) rightCell.appendChild(button);
    }
  }

  // The second grid contains 2 images
  const imagesGrid = container.querySelector('.grid-layout.mobile-portrait-1-column');
  let img1 = '';
  let img2 = '';
  if (imagesGrid) {
    const imgDivs = imagesGrid.querySelectorAll('.utility-aspect-1x1');
    if (imgDivs[0]) {
      const imgTag = imgDivs[0].querySelector('img');
      if (imgTag) img1 = imgTag;
    }
    if (imgDivs[1]) {
      const imgTag = imgDivs[1].querySelector('img');
      if (imgTag) img2 = imgTag;
    }
  }

  // Build the table rows: header, then two rows of two columns each
  const cells = [
    ['Columns block (columns11)'],
    [leftCell, rightCell],
    [img1, img2]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
