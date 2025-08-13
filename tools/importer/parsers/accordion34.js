/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];
  // Header row, matches example: 'Accordion'
  cells.push(['Accordion']);

  // Select all immediate child divs (each accordion item)
  const accordionItems = element.querySelectorAll(':scope > div');
  accordionItems.forEach((item) => {
    // Title cell: .w-dropdown-toggle > .paragraph-lg
    const toggle = item.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      title = toggle.querySelector('.paragraph-lg');
    }
    // Content cell: .w-dropdown-list > [padding div] > .w-richtext
    const contentNav = item.querySelector('.w-dropdown-list');
    let content = null;
    if (contentNav) {
      // Find the deepest .w-richtext or fallback to contentNav
      const innerPad = contentNav.querySelector('.utility-padding-all-1rem');
      if (innerPad) {
        const richTextDiv = innerPad.querySelector('.w-richtext');
        if (richTextDiv) {
          content = richTextDiv;
        } else {
          // fallback: use the padding div itself
          content = innerPad;
        }
      } else {
        content = contentNav;
      }
    }
    // Only add if both exist
    if (title && content) {
      cells.push([title, content]);
    }
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
