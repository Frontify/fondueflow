export function initQuotations() {
    // Ensure quotation marks are facing the correct way on all quotes across the website
    const pageContent = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = pageContent.nextNode())) {
        node.nodeValue = node.nodeValue
        // Fix misused opening double quote at the end of a word/sentence within the copy
        .replace(/“(?=\W|$)/g, '”')
        // Fix misused opening single quote at the end of a word/sentence within the copy
        .replace(/‘(?=\W|$)/g, '’');
    }
}