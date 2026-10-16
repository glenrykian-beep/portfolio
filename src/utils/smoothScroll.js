/**
 * Smoothly scrolls to a target element by its ID, accounting for sticky navbar offset.
 * @param {string} targetId - ID of the target element (with or without '#')
 * @param {number} [offset=80] - Top offset in pixels (for fixed/sticky header)
 */
export function smoothScroll(targetId, offset = 80) {
  const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
  const element = document.getElementById(id);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  } else if (id === 'home' || id === '') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
