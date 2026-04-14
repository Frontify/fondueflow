document.addEventListener('DOMContentLoaded', function () {
    var triggers = document.querySelectorAll('.ff-navbar-trigger');
    var submenu = document.getElementById('ff-submenu');
    var panels = document.querySelectorAll('.ff-submenu-panel');
    var navbarContent = document.querySelector('.ff-navbar-content');

    function closeMenu() {
        submenu.classList.remove('is-open');
        document.body.classList.remove('ff-submenu-open');

        if (navbarContent) {
            navbarContent.classList.remove('ff-navbar-content--open');
        }

        for (var i = 0; i < panels.length; i++) {
            panels[i].classList.remove('is-active');
        }

        for (var j = 0; j < triggers.length; j++) {
            triggers[j].setAttribute('aria-expanded', 'false');
            triggers[j].classList.remove('is-active');
        }
    }

    function openMenu(menuName, trigger) {
        var panel = document.querySelector('.ff-submenu-panel[data-panel="' + menuName + '"]');
        if (!panel) return;

        for (var i = 0; i < panels.length; i++) {
            panels[i].classList.remove('is-active');
        }

        for (var j = 0; j < triggers.length; j++) {
            triggers[j].setAttribute('aria-expanded', 'false');
            triggers[j].classList.remove('is-active');
        }

        submenu.classList.add('is-open');
        panel.classList.add('is-active');
        trigger.setAttribute('aria-expanded', 'true');
        trigger.classList.add('is-active');
        document.body.classList.add('ff-submenu-open');

        if (navbarContent) {
            navbarContent.classList.add('ff-navbar-content--open');
        }
    }

    for (var i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('mouseenter', function () {
            var menuName = this.getAttribute('data-menu');
            openMenu(menuName, this);
        });

        triggers[i].addEventListener('click', function (e) {
            e.stopPropagation();

            var menuName = this.getAttribute('data-menu');
            var panel = document.querySelector('.ff-submenu-panel[data-panel="' + menuName + '"]');
            var isAlreadyOpen = panel &&
                panel.classList.contains('is-active') &&
                submenu.classList.contains('is-open');

            if (isAlreadyOpen) {
                closeMenu();
            } else {
                openMenu(menuName, this);
            }
        });
    }

    submenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    document.addEventListener('click', function (e) {
        var clickedTrigger = e.target.closest('.ff-navbar-trigger');
        var clickedInsideSubmenu = submenu.contains(e.target);

        if (!clickedTrigger && !clickedInsideSubmenu) {
            closeMenu();
        }
    });
});