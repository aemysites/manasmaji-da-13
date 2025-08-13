/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child column elements
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Create header row according to the markdown example
  const headerRow = ['Columns block (columns4)'];

  // Each column must support mixed content: text, buttons, lists, images, etc.
  const contentRow = columns.map(col => {
    // Collect all non-empty element nodes and non-empty text nodes in column
    const nodes = Array.from(col.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) return true;
      return false;
    });
    // If only one node, just return it; else return array of nodes for the cell
    if (nodes.length === 1) return nodes[0];
    if (nodes.length > 1) return nodes;
    return '';
  });

  // Compose the table with header and content row
  const cells = [headerRow, contentRow];

  // Generate the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
