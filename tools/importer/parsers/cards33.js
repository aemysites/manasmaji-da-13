/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];
  // All cards are direct <a> children of the main element
  const cardElements = Array.from(element.querySelectorAll(':scope > a'));
  cardElements.forEach(card => {
    // 1st column: image (mandatory)
    // Get the first img inside this card
    const img = card.querySelector('img');
    // 2nd column: text content (mandatory)
    // Content container is the sibling of the img inside the inner grid
    // Find the grid (first div), then get its children
    const gridDiv = card.querySelector(':scope > div');
    let contentDiv = null;
    if (gridDiv) {
      const gridChildren = Array.from(gridDiv.children);
      // Find the child that is not the img
      contentDiv = gridChildren.find(child => child !== img && child.tagName === 'DIV');
    }
    // Collect text content (tag/min-read, heading, paragraph, CTA)
    let cellContent = [];
    if (contentDiv) {
      // Top tags flex (optional)
      const flex = contentDiv.querySelector('.flex-horizontal');
      if (flex && flex.textContent.trim()) cellContent.push(flex);
      // Heading (mandatory)
      const heading = contentDiv.querySelector('h3.h4-heading');
      if (heading && heading.textContent.trim()) cellContent.push(heading);
      // Description (optional)
      const desc = contentDiv.querySelector('p');
      if (desc && desc.textContent.trim()) cellContent.push(desc);
      // CTA (optional, bottom 'Read' div; avoid flex/top tags)
      // There may be multiple divs; find one with only 'Read'
      // Exclude divs that are flex or contain other structures
      const ctaDivs = Array.from(contentDiv.querySelectorAll(':scope > div'));
      const cta = ctaDivs.find(div => div.textContent.trim().toLowerCase() === 'read' && div.children.length === 0);
      if (cta) cellContent.push(cta);
    }
    // If contentDiv is missing, fallback gracefully
    if (!img && cellContent.length === 0) return; // skip empty cards
    rows.push([img, cellContent.length === 1 ? cellContent[0] : cellContent]);
  });
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
