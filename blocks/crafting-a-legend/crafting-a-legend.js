/**
 * Crafting a Legend Block - Quote Style Layout
 */
export default function decorate(block) {
  console.log('🏆 Crafting-a-legend: Initializing...');
  const rows = [...block.children];
  console.log('🏆 Total rows found:', rows.length);

  let heading = '';
  let quote = '';
  let author = '';

  rows.forEach((row, index) => {
    const cells = [...row.children];
    console.log(`🏆 Row ${index}: ${cells.length} cells`);

    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();
      console.log(`🏆 Row ${index} - Label: "${label}", Value: "${value.substring(0, 50)}..."`);

      if (label.includes('heading')) {
        heading = cells[1].textContent.trim();
        console.log('🏆 ✓ Matched as HEADING:', heading);
      } else if (label.includes('quote')) {
        quote = cells[1].innerHTML.trim();
        console.log('🏆 ✓ Matched as QUOTE');
      } else if (label.includes('author')) {
        author = cells[1].textContent.trim();
        console.log('🏆 ✓ Matched as AUTHOR:', author);
      } else {
        console.log(`🏆 ✗ No match for label: "${label}"`);
      }
    } else {
      console.log(`🏆 Row ${index}: Skipped (insufficient cells)`);
    }
  });

  console.log('🏆 Final values - heading:', heading, 'quote:', quote ? 'exists' : 'missing', 'author:', author);

  block.innerHTML = `
    <div class="crafting-a-legend-container">
      ${heading ? `<h2 class="crafting-a-legend-heading">${heading}</h2>` : ''}
      ${quote ? `
        <blockquote class="crafting-a-legend-quote">
          ${quote}
          ${author ? `<cite class="crafting-a-legend-author">— ${author}</cite>` : ''}
        </blockquote>
      ` : ''}
    </div>
  `;
  console.log(' Crafting-a-legend: Complete');
}
