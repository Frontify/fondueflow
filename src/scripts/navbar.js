document.addEventListener('DOMContentLoaded', function () {
    var triggers = document.querySelectorAll('.ff-navbar-trigger');
    var submenu = document.getElementById('ff-submenu');
    var panels = document.querySelectorAll('.ff-submenu-panel');
    var navbarContent = document.querySelector('.ff-navbar-content');
    var burger = document.querySelector('.ff-navbar-burger');

    function resetPanelsAndTriggers() {
        for (var i = 0; i < panels.length; i++) {
            panels[i].classList.remove('is-active');
        }

        for (var j = 0; j < triggers.length; j++) {
            triggers[j].setAttribute('aria-expanded', 'false');
            triggers[j].classList.remove('is-active');
        }

        var mobileTriggers = document.querySelectorAll('.ff-mobile-menu-trigger');
        for (var k = 0; k < mobileTriggers.length; k++) {
            mobileTriggers[k].setAttribute('aria-expanded', 'false');
            mobileTriggers[k].classList.remove('is-active');
        }

        if (burger) {
            burger.setAttribute('aria-expanded', 'false');
            burger.classList.remove('is-open');
        }
    }

    function closeMenu() {
        submenu.classList.remove('is-open');
        document.body.classList.remove('ff-submenu-open');

        if (navbarContent) {
            navbarContent.classList.remove('ff-navbar-content--open');
        }

        resetPanelsAndTriggers();
    }

    function openPanel(panelName) {
        var panel = document.querySelector('.ff-submenu-panel[data-panel="' + panelName + '"]');
        if (!panel) return null;

        for (var i = 0; i < panels.length; i++) {
            panels[i].classList.remove('is-active');
        }

        submenu.classList.add('is-open');
        panel.classList.add('is-active');
        document.body.classList.add('ff-submenu-open');

        if (navbarContent) {
            navbarContent.classList.add('ff-navbar-content--open');
        }

        return panel;
    }

    function openMenu(menuName, trigger) {
        resetPanelsAndTriggers();

        var panel = openPanel(menuName);
        if (!panel) return;

        trigger.setAttribute('aria-expanded', 'true');
        trigger.classList.add('is-active');
    }

    function openBurgerMenu() {
        resetPanelsAndTriggers();

        var panel = openPanel('mobile');
        if (!panel || !burger) return;

        burger.classList.add('is-open');
        burger.setAttribute('aria-expanded', 'true');
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

    if (burger) {
        burger.addEventListener('click', function (e) {
            e.stopPropagation();

            var mobilePanel = document.querySelector('.ff-submenu-panel[data-panel="mobile"]');
            var isAlreadyOpen = mobilePanel &&
                mobilePanel.classList.contains('is-active') &&
                submenu.classList.contains('is-open');

            if (isAlreadyOpen) {
                closeMenu();
            } else {
                openBurgerMenu();
            }
        });
    }

    submenu.addEventListener('click', function (e) {
        var mobileTrigger = e.target.closest('.ff-mobile-menu-trigger');

        if (mobileTrigger) {
            e.stopPropagation();

            var menuName = mobileTrigger.getAttribute('data-menu');
            if (!menuName) return;

            openPanel(menuName);
            return;
        }

        e.stopPropagation();
    });

    document.addEventListener('click', function (e) {
        var clickedTrigger = e.target.closest('.ff-navbar-trigger');
        var clickedInsideSubmenu = submenu.contains(e.target);
        var clickedBurger = burger && burger.contains(e.target);
        var clickedMobileTrigger = e.target.closest('.ff-mobile-menu-trigger');

        if (!clickedTrigger && !clickedInsideSubmenu && !clickedBurger && !clickedMobileTrigger) {
            closeMenu();
        }
    });
});