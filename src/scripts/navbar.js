/*
 * Navigation JavaScript script.
 * This needs to be optimised and improved.
 * Was built quickly due to the need to get the navigation working.
 */

document.addEventListener('DOMContentLoaded', function () {
    var triggers = document.querySelectorAll('.ff-navbar-trigger');
    var submenu = document.getElementById('ff-submenu');
    var panels = document.querySelectorAll('.ff-submenu-panel');
    var navbarContent = document.querySelector('.ff-navbar-content');
    var burger = document.querySelector('.ff-navbar-burger');
    var breadcrumbs = document.querySelectorAll('.ff-navbar .breadcrumb');
    var localeMenus = document.querySelectorAll('.w-locales-list');

    function isMainSubmenuOpen() {
        return submenu && submenu.classList.contains('is-open');
    }

    function updateBodyOverlayState() {
        var hasOpenLocaleMenu = false;

        for (var i = 0; i < localeMenus.length; i++) {
            if (localeMenus[i].classList.contains('is-active')) {
                hasOpenLocaleMenu = true;
                break;
            }
        }

        var shouldBeOpen = isMainSubmenuOpen() || hasOpenLocaleMenu;

        if (shouldBeOpen) {
            document.body.classList.add('ff-submenu-open');

            if (navbarContent) {
                navbarContent.classList.add('ff-navbar-content--open');
            }
        } else {
            document.body.classList.remove('ff-submenu-open');

            if (navbarContent) {
                navbarContent.classList.remove('ff-navbar-content--open');
            }
        }
    }

    function closeLocaleMenus(exceptMenu) {
        for (var i = 0; i < localeMenus.length; i++) {
            if (exceptMenu && localeMenus[i] === exceptMenu) continue;

            localeMenus[i].classList.remove('is-active');

            var toggle = localeMenus[i].querySelector('.w-dropdown-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('w--open');
            }

            var list = localeMenus[i].querySelector('.w-dropdown-list');
            if (list) {
                list.classList.remove('w--open');
            }
        }

        updateBodyOverlayState();
    }

    function openLocaleMenu(menu) {
        if (!menu) return;

        var isInsideMobileSubmenu = !!menu.closest('.ff-submenu-bottom-menu');

        if (!isInsideMobileSubmenu) {
            closeMenu();
        }

        closeLocaleMenus(menu);

        menu.classList.add('is-active');

        var toggle = menu.querySelector('.w-dropdown-toggle');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'true');
            toggle.classList.add('w--open');
        }

        var list = menu.querySelector('.w-dropdown-list');
        if (list) {
            list.classList.add('w--open');
        }

        updateBodyOverlayState();
    }

    function toggleLocaleMenu(menu) {
        if (!menu) return;

        var isOpen = menu.classList.contains('is-active');

        if (isOpen) {
            closeLocaleMenus();
        } else {
            openLocaleMenu(menu);
        }
    }

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

        for (var l = 0; l < breadcrumbs.length; l++) {
            breadcrumbs[l].setAttribute('aria-expanded', 'false');
            breadcrumbs[l].classList.remove('is-active');
        }
    }

    function closeMenu() {
        submenu.classList.remove('is-open');
        resetPanelsAndTriggers();
        updateBodyOverlayState();
    }

    function initPanelSwitchers(scope) {
        var switchLinks = scope.querySelectorAll('[data-panel-switch]');
        var contentPanels = scope.querySelectorAll('[data-panel-content]');

        if (!switchLinks.length || !contentPanels.length) return;

        function activatePanel(panelName) {
            for (var i = 0; i < switchLinks.length; i++) {
                var linkName = switchLinks[i].getAttribute('data-panel-switch');
                if (linkName === panelName) {
                    switchLinks[i].classList.add('is-active');
                } else {
                    switchLinks[i].classList.remove('is-active');
                }
            }

            for (var j = 0; j < contentPanels.length; j++) {
                var contentName = contentPanels[j].getAttribute('data-panel-content');
                if (contentName === panelName) {
                    contentPanels[j].style.display = 'block';
                    contentPanels[j].classList.add('is-active');
                } else {
                    contentPanels[j].style.display = 'none';
                    contentPanels[j].classList.remove('is-active');
                }
            }
        }

        for (var k = 0; k < switchLinks.length; k++) {
            switchLinks[k].addEventListener('mouseenter', function () {
                var panelName = this.getAttribute('data-panel-switch');
                if (!panelName) return;
                activatePanel(panelName);
            });

            switchLinks[k].addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var panelName = this.getAttribute('data-panel-switch');
                if (!panelName) return;
                activatePanel(panelName);
            });
        }

        activatePanel('link-one');
    }

    function openPanel(panelName) {
        var panel = document.querySelector('.ff-submenu-panel[data-panel="' + panelName + '"]');
        if (!panel) return null;

        closeLocaleMenus();

        for (var i = 0; i < panels.length; i++) {
            panels[i].classList.remove('is-active');
        }

        submenu.classList.add('is-open');
        panel.classList.add('is-active');

        initPanelSwitchers(panel);
        updateBodyOverlayState();

        return panel;
    }

    function openMenu(menuName, trigger) {
        resetPanelsAndTriggers();
        closeLocaleMenus();

        var panel = openPanel(menuName);
        if (!panel) return;

        trigger.setAttribute('aria-expanded', 'true');
        trigger.classList.add('is-active');
    }

    function openBurgerMenu() {
        resetPanelsAndTriggers();
        closeLocaleMenus();

        var panel = openPanel('mobile');
        if (!panel) return;

        if (burger) {
            burger.classList.add('is-open');
            burger.setAttribute('aria-expanded', 'true');
        }

        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumbs[i].classList.add('is-active');
            breadcrumbs[i].setAttribute('aria-expanded', 'true');
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

    if (burger) {
        burger.addEventListener('click', function (e) {
            e.stopPropagation();
            closeLocaleMenus();

            var mobilePanel = document.querySelector('.ff-submenu-panel[data-panel="mobile"]');
            var isMobileMenuOpen = mobilePanel &&
                mobilePanel.classList.contains('is-active') &&
                submenu.classList.contains('is-open');

            if (isMobileMenuOpen) {
                closeMenu();
            } else {
                openBurgerMenu();
            }
        });
    }

    for (var m = 0; m < breadcrumbs.length; m++) {
        breadcrumbs[m].addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeLocaleMenus();
            openBurgerMenu();
        });
    }

    for (var n = 0; n < localeMenus.length; n++) {
        (function (menu) {
            var toggle = menu.querySelector('.w-dropdown-toggle');
            var list = menu.querySelector('.w-dropdown-list');

            if (!toggle) return;

            menu.addEventListener('mouseenter', function () {
                if (window.innerWidth >= 992) {
                    openLocaleMenu(menu);
                }
            });

            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                toggleLocaleMenu(menu);
            });

            if (list) {
                list.addEventListener('click', function (e) {
                    e.stopPropagation();
                });
            }
        })(localeMenus[n]);
    }

    submenu.addEventListener('click', function (e) {
        var mobileTrigger = e.target.closest('.ff-mobile-menu-trigger');

        if (mobileTrigger) {
            e.stopPropagation();

            var menuName = mobileTrigger.getAttribute('data-menu');
            if (!menuName) return;

            closeLocaleMenus();
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
        var clickedBreadcrumb = e.target.closest('.ff-navbar .breadcrumb');
        var clickedLocaleMenu = e.target.closest('.w-locales-list');

        if (!clickedLocaleMenu) {
            closeLocaleMenus();
        }

        if (!clickedTrigger && !clickedInsideSubmenu && !clickedBurger && !clickedBreadcrumb && !clickedMobileTrigger) {
            closeMenu();
        }
    });
});