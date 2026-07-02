export function initSlidingUnderlines() {
    // Apply the sliding underline CSS styling to each link added in Richtext within the pages
    const richTextLinks = document.querySelectorAll('.resources_rich-text.w-richtext a, .futures_rich-text.w-richtext a');
    richTextLinks.forEach((link) => {
        link.classList.add('link-slide-underline');
        link.style.textDecoration = 'none';
    });
}