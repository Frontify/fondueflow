export function initAccordion() {
    const accordions = document.querySelectorAll(".ff-accordion");

    accordions.forEach((accordion) => {
        const accordionButtons = accordion.querySelectorAll(".js-ff-accordion__button");
        const mode = accordion.dataset.accordion || "multiple";

        setDefaultOpenItems(accordion, accordionButtons, mode);

        accordionButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const content = getAccordionContent(button);

                if (!content) return;

                const inner = getAccordionInner(content);

                if (!inner) return;

                const isOpen = button.getAttribute("aria-expanded") === "true";

                if (isOpen) {
                    closeAccordionItem(button, content, inner);
                    return;
                }

                if (mode === "single") {
                    accordionButtons.forEach((otherButton) => {
                        if (otherButton === button) return;

                        const otherContent = getAccordionContent(otherButton);

                        if (!otherContent) return;

                        const otherInner = getAccordionInner(otherContent);

                        if (!otherInner) return;

                        const otherIsOpen =
                            otherButton.getAttribute("aria-expanded") === "true";

                        if (otherIsOpen) {
                            closeAccordionItem(otherButton, otherContent, otherInner);
                        }
                    });
                }

                openAccordionItem(button, content, inner);
            });
        });
    });
}

function setDefaultOpenItems(accordion, accordionButtons, mode) {
    const defaultOpenItems = accordion.querySelectorAll('[data-accordion-open="true"]');

    defaultOpenItems.forEach((item, index) => {
        if (mode === "single" && index > 0) return;

        const button = item.querySelector(".ff-accordion__button");

        if (!button) return;

        const content = getAccordionContent(button);

        if (!content) return;

        const inner = getAccordionInner(content);

        if (!inner) return;

        content.hidden = false;
        content.style.height = "auto";

        button.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
    });
}

function getAccordionContent(button) {
    const contentId = button.getAttribute("aria-controls");

    if (!contentId) return null;

    return document.getElementById(contentId);
}

function getAccordionInner(content) {
    return content.querySelector(".ff-accordion__content-inner");
}

function openAccordionItem(button, content, inner) {
    content.hidden = false;

    button.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");

    content.style.height = `${inner.offsetHeight}px`;

    content.addEventListener(
        "transitionend",
        () => {
            if (button.getAttribute("aria-expanded") === "true") {
                content.style.height = "auto";
            }
        },
        { once: true }
    );
}

function closeAccordionItem(button, content, inner) {
    content.style.height = `${inner.offsetHeight}px`;

    requestAnimationFrame(() => {
        content.style.height = "0";
    });

    button.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");

    content.addEventListener(
        "transitionend",
        () => {
            if (button.getAttribute("aria-expanded") === "false") {
                content.hidden = true;
            }
        },
        { once: true }
    );
}