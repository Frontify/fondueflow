const accordionButtons = document.querySelectorAll(".js-ff-accordion__button");

accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;

        content.classList.toggle("open");
        button.classList.toggle("is-open");
    });
});
