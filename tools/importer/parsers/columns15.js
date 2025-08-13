/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container for the columns block
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Each column: collect all semantic content (text, headings, lists, buttons, imgs)
  // For image columns - use the image directly
  // For content columns - collect all child elements and text
  const secondRow = columns.map(col => {
    // If it's an image element, use it directly
    if (col.tagName === 'IMG') return col;
    // For divs or similar, collect child nodes that are not empty
    const kids = Array.from(col.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
      return false;
    });
    // If only one child, use it directly, if many, use array
    if (kids.length === 1) return kids[0];
    if (kids.length > 1) return kids;
    // Fallback: the column div itself
    return col;
  });

  // Must have at least one content column to proceed
  if (secondRow.length === 0) return;

  // Create the header row exactly as in the specification
  const headerRow = ['Columns block (columns15)'];
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
