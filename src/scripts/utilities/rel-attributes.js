export function initRelAttributes() {
    // Set the rel attribute for links that open in a tab/window
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
}