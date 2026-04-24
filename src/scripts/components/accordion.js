    const buttons = document.querySelectorAll(".js-ff-accordion__button");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        content.classList.toggle("open");
      });
    });
