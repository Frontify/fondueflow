    const buttons = document.querySelectorAll(".js-accordion-button");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        content.classList.toggle("open");
      });
    });
