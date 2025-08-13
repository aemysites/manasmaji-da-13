/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Tabs block (must match example: 'Tabs')
  const headerRow = ['Tabs'];

  // Find tab menu and tab content containers
  const tabMenu = Array.from(element.children).find(
    (el) => el.classList.contains('w-tab-menu')
  );
  const tabContent = Array.from(element.children).find(
    (el) => el.classList.contains('w-tab-content')
  );

  // Find all tab menu links (labels)
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];
  // Find all tab panes (content)
  const panes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];

  // Safeguard: If there are no tabs, do nothing
  if (tabLinks.length === 0 || panes.length === 0) return;

  // Build rows: each row represents one tab (Label, Content)
  const rows = tabLinks.map((link, i) => {
    // Tab label: get text content of div if present, else fallback to link text
    let label = '';
    const labelDiv = link.querySelector('div');
    label = labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();

    // Tab content: reference the main grid-layout (if present) or the pane itself
    const pane = panes[i];
    let contentEl = null;
    if (pane) {
      // Use immediate grid-layout div as the pane content if present
      const grid = Array.from(pane.children).find((child) => child.classList.contains('grid-layout'));
      contentEl = grid ? grid : pane;
    }
    return [label, contentEl];
  });

  // Final block: header row then each tab row
  const cells = [headerRow, ...rows];

  // Create table block using referenced elements (not cloning)
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
