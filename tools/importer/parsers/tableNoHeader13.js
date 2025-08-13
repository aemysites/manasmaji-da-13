/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the example
  const cells = [['Table (no header)']];
  // Each immediate child .divider is a row in the table
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach((divider) => {
    // Each divider should contain one grid, which has the row's columns
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      // Each grid has two children: question heading and answer text
      const gridChildren = Array.from(grid.children);
      // Defensive: Only add if both question and answer exist
      if (gridChildren.length >= 2) {
        const question = gridChildren[0];
        const answer = gridChildren[1];
        cells.push([[question, answer]]); // single cell containing both elements
      } else if (gridChildren.length === 1) {
        cells.push([[gridChildren[0]]]); // fallback: add the only child
      } else {
        // grid is present but empty, push empty cell
        cells.push(['']);
      }
    } else {
      // If divider has no grid, fallback to its content
      if (divider.children.length > 0) {
        cells.push([[...divider.children]]);
      } else {
        cells.push([divider.innerText || '']);
      }
    }
  });
  // Replace the original element with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
