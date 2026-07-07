// components/navbar.js

// Export the initNavbar function so it can be imported and run elsewhere.
export const initNavbar = () => {
    // Get all desktop navbar trigger elements and convert the NodeList into an array.
    const triggers = [...document.querySelectorAll('.ff-navbar-trigger')];

    // Get the main submenu wrapper by its ID.
    const submenu = document.getElementById('ff-submenu');

    // Get all submenu panels and convert the NodeList into an array.
    const panels = [...document.querySelectorAll('.ff-submenu-panel')];

    // Get the main navbar content wrapper.
    const navbarContent = document.querySelector('.ff-navbar-content');

    // Get the mobile burger button.
    const burger = document.querySelector('.ff-navbar-burger');

    // Get all breadcrumb elements inside the navbar and convert the NodeList into an array.
    const breadcrumbs = [...document.querySelectorAll('.ff-navbar .breadcrumb')];

    // Get all locale/language dropdown menus and convert the NodeList into an array.
    const localeMenus = [...document.querySelectorAll('.w-locales-list')];

    // Store the submenu transition duration in milliseconds.
    const submenuTransitionDuration = 320;

    // Store the active timeout used when closing the submenu.
    let closeMenuTimer = null;

    // Track whether page scrolling is currently locked.
    let isPageScrollLocked = false;

    // Stop running the function if the submenu element does not exist.
    if (!submenu) return;

    // Check whether the viewport is desktop-sized.
    const isDesktop = () => window.innerWidth >= 992;

    // Check whether the main submenu is currently open.
    const isMainSubmenuOpen = () => submenu.classList.contains('is-open');

    // Find a submenu panel by its data-panel value.
    const getPanelByName = (panelName) =>
        panels.find((panel) => panel.dataset.panel === panelName) || null;

    // Get all mobile submenu trigger elements.
    const getMobileTriggers = () =>
        [...document.querySelectorAll('.ff-mobile-menu-trigger')];

    // Set the aria-expanded state and active class for a group of elements.
    const setExpandedState = (elements, isExpanded) => {
        // Loop through every element passed into the helper.
        elements.forEach((element) => {
            // Update the accessibility expanded state.
            element.setAttribute('aria-expanded', String(isExpanded));

            // Add or remove the active class based on the expanded state.
            element.classList.toggle('is-active', isExpanded);
        });
    };

    // Prevent the page from scrolling.
    const lockPageScroll = () => {
        // Do nothing if the page is already locked.
        if (isPageScrollLocked) return;

        // Hide overflow on the root element and body to prevent scrolling.
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // Store that the page is now scroll-locked.
        isPageScrollLocked = true;
    };

    // Allow the page to scroll again.
    const unlockPageScroll = () => {
        // Do nothing if the page is not currently locked.
        if (!isPageScrollLocked) return;

        // Clear the overflow styles so the page can scroll normally again.
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';

        // Store that the page is no longer scroll-locked.
        isPageScrollLocked = false;
    };

    // Update body, navbar, and scroll-lock state based on open menus.
    const updateBodyOverlayState = () => {
        // Check whether any locale menu is currently active.
        const hasOpenLocaleMenu = localeMenus.some((menu) =>
            menu.classList.contains('is-active')
        );

        // The overlay should be open if the submenu or a locale menu is open.
        const shouldBeOpen = isMainSubmenuOpen() || hasOpenLocaleMenu;

        // Add or remove the body overlay class.
        document.body.classList.toggle('ff-submenu-open', shouldBeOpen);

        // Add or remove the navbar content open class if the element exists.
        navbarContent?.classList.toggle('ff-navbar-content--open', shouldBeOpen);

        // Lock page scroll when an overlay is open.
        if (shouldBeOpen) {
            lockPageScroll();
        } else {
            // Unlock page scroll when no overlay is open.
            unlockPageScroll();
        }
    };

    // Close all locale menus, optionally leaving one menu open.
    const closeLocaleMenus = (exceptMenu = null) => {
        // Loop through every locale menu.
        localeMenus.forEach((menu) => {
            // Skip the menu passed as the exception.
            if (exceptMenu && menu === exceptMenu) return;

            // Remove the active state from the menu.
            menu.classList.remove('is-active');

            // Get the menu's dropdown toggle.
            const toggle = menu.querySelector('.w-dropdown-toggle');

            // Get the menu's dropdown list.
            const list = menu.querySelector('.w-dropdown-list');

            // Update the toggle accessibility state if the toggle exists.
            toggle?.setAttribute('aria-expanded', 'false');

            // Remove Webflow's open class from the toggle if it exists.
            toggle?.classList.remove('w--open');

            // Remove Webflow's open class from the dropdown list if it exists.
            list?.classList.remove('w--open');
        });

        // Refresh the body overlay and scroll-lock state.
        updateBodyOverlayState();
    };

    // Reset all submenu panels, triggers, breadcrumbs, and the burger button.
    const resetPanelsAndTriggers = () => {
        // Remove the active state from every submenu panel.
        panels.forEach((panel) => panel.classList.remove('is-active'));

        // Mark all desktop triggers as collapsed and inactive.
        setExpandedState(triggers, false);

        // Mark all mobile triggers as collapsed and inactive.
        setExpandedState(getMobileTriggers(), false);

        // Mark all breadcrumbs as collapsed and inactive.
        setExpandedState(breadcrumbs, false);

        // Mark the burger button as collapsed if it exists.
        burger?.setAttribute('aria-expanded', 'false');

        // Remove the burger open class if the burger button exists.
        burger?.classList.remove('is-open');
    };

    // Close the main submenu.
    const closeMenu = () => {
        // Clear any existing close timer.
        if (closeMenuTimer) {
            window.clearTimeout(closeMenuTimer);
            closeMenuTimer = null;
        }

        // If the submenu is already closed, reset state and stop.
        if (!isMainSubmenuOpen()) {
            resetPanelsAndTriggers();
            updateBodyOverlayState();
            return;
        }

        // Remove the class that visually opens the submenu.
        submenu.classList.remove('is-open');

        // Refresh the body overlay and scroll-lock state.
        updateBodyOverlayState();

        // Wait for the closing transition before fully resetting internal states.
        closeMenuTimer = window.setTimeout(() => {
            // Only reset if the submenu has not reopened during the transition.
            if (!isMainSubmenuOpen()) {
                resetPanelsAndTriggers();
            }

            // Clear the timer reference after it has finished.
            closeMenuTimer = null;
        }, submenuTransitionDuration);
    };

    // Open a locale/language dropdown menu.
    const openLocaleMenu = (menu) => {
        // Do nothing if no menu was provided.
        if (!menu) return;

        // Check whether the locale menu is inside the mobile submenu area.
        const isInsideMobileSubmenu = Boolean(menu.closest('.ff-submenu-bottom-menu'));

        // Close the main submenu before opening desktop locale menus.
        if (!isInsideMobileSubmenu) {
            closeMenu();
        }

        // Close every other locale menu.
        closeLocaleMenus(menu);

        // Mark this locale menu as active.
        menu.classList.add('is-active');

        // Get the menu's dropdown toggle.
        const toggle = menu.querySelector('.w-dropdown-toggle');

        // Get the menu's dropdown list.
        const list = menu.querySelector('.w-dropdown-list');

        // Mark the dropdown toggle as expanded if it exists.
        toggle?.setAttribute('aria-expanded', 'true');

        // Add Webflow's open class to the toggle if it exists.
        toggle?.classList.add('w--open');

        // Add Webflow's open class to the dropdown list if it exists.
        list?.classList.add('w--open');

        // Refresh the body overlay and scroll-lock state.
        updateBodyOverlayState();
    };

    // Toggle a locale/language dropdown menu open or closed.
    const toggleLocaleMenu = (menu) => {
        // Do nothing if no menu was provided.
        if (!menu) return;

        // Close all locale menus if this one is already open.
        if (menu.classList.contains('is-active')) {
            closeLocaleMenus();
        } else {
            // Otherwise, open this locale menu.
            openLocaleMenu(menu);
        }
    };

    // Close the submenu when the mouse leaves the submenu area on desktop.
    const closeSubmenuOnMouseLeave = (event) => {
        // Only run this behaviour on desktop.
        if (!isDesktop()) return;

        // Get the element the mouse moved into.
        const nextElement = event.relatedTarget;

        // Close the menu if the mouse did not move into another element.
        if (!nextElement) {
            closeMenu();
            return;
        }

        // Check whether the mouse moved to somewhere inside the submenu.
        const movedInsideSubmenu = submenu.contains(nextElement);

        // Check whether the mouse moved to a navbar trigger.
        const movedToTrigger = nextElement.closest?.('.ff-navbar-trigger');

        // Check whether the mouse moved to a locale menu.
        const movedToLocaleMenu = nextElement.closest?.('.w-locales-list');

        // Close the menu if the mouse moved outside all allowed navbar areas.
        if (!movedInsideSubmenu && !movedToTrigger && !movedToLocaleMenu) {
            closeMenu();
        }
    };

    // Initialize internal panel switchers inside a submenu panel.
    const initPanelSwitchers = (scope) => {
        // Avoid attaching duplicate event listeners to the same panel.
        if (scope.dataset.panelSwitchersInitialized === 'true') return;

        // Get all links that switch between inner content panels.
        const switchLinks = [...scope.querySelectorAll('[data-panel-switch]')];

        // Get all inner content panels that can be switched.
        const contentPanels = [...scope.querySelectorAll('[data-panel-content]')];

        // Stop if the panel does not contain switch links or content panels.
        if (!switchLinks.length || !contentPanels.length) return;

        // Activate the matching inner content panel.
        const activatePanel = (panelName) => {
            // Update active state on each switch link.
            switchLinks.forEach((link) => {
                // Mark the link as active if it matches the requested panel.
                link.classList.toggle(
                    'is-active',
                    link.dataset.panelSwitch === panelName
                );
            });

            // Update visibility and active state on each content panel.
            contentPanels.forEach((panel) => {
                // Check whether this content panel matches the requested panel.
                const isActive = panel.dataset.panelContent === panelName;

                // Show the matching panel and hide the others.
                panel.style.display = isActive ? 'block' : 'none';

                // Add or remove the active class based on whether this panel matches.
                panel.classList.toggle('is-active', isActive);
            });
        };

        // Attach hover and focus handlers to every switch link.
        switchLinks.forEach((link) => {
            // Create a reusable handler for mouseenter and focus events.
            const handlePanelSwitch = () => {
                // Get the panel name from the link's data attribute.
                const panelName = link.dataset.panelSwitch;

                // Stop if there is no panel name.
                if (!panelName) return;

                // Activate the matching content panel.
                activatePanel(panelName);
            };

            // Switch panels when the user hovers over the link.
            link.addEventListener('mouseenter', handlePanelSwitch);

            // Switch panels when the link receives keyboard focus.
            link.addEventListener('focus', handlePanelSwitch);
        });

        // Activate the first switch link's panel by default.
        activatePanel(switchLinks[0].dataset.panelSwitch);

        // Mark this panel as initialized to prevent duplicate listeners later.
        scope.dataset.panelSwitchersInitialized = 'true';
    };

    // Open a specific submenu panel by name.
    const openPanel = (panelName) => {
        // Stop if no panel name was provided.
        if (!panelName) return null;

        // Clear any pending close timer.
        if (closeMenuTimer) {
            window.clearTimeout(closeMenuTimer);
            closeMenuTimer = null;
        }

        // Find the panel that matches the requested name.
        const panel = getPanelByName(panelName);

        // Stop if no matching panel exists.
        if (!panel) return null;

        // Close any open locale menus.
        closeLocaleMenus();

        // Remove the active state from all panels.
        panels.forEach((item) => item.classList.remove('is-active'));

        // Open the main submenu wrapper.
        submenu.classList.add('is-open');

        // Mark the selected panel as active.
        panel.classList.add('is-active');

        // Initialize switchers inside this panel if needed.
        initPanelSwitchers(panel);

        // Refresh the body overlay and scroll-lock state.
        updateBodyOverlayState();

        // Return the opened panel.
        return panel;
    };

    // Open a desktop menu from a navbar trigger.
    const openMenu = (menuName, trigger) => {
        // Reset the current active navbar state.
        resetPanelsAndTriggers();

        // Open the requested submenu panel.
        const panel = openPanel(menuName);

        // Stop if the requested panel could not be opened.
        if (!panel) return;

        // Mark the trigger as expanded for accessibility.
        trigger.setAttribute('aria-expanded', 'true');

        // Add the active state to the trigger.
        trigger.classList.add('is-active');
    };

    // Open the mobile burger menu.
    const openBurgerMenu = () => {
        // Reset the current active navbar state.
        resetPanelsAndTriggers();

        // Open the mobile submenu panel.
        const panel = openPanel('mobile');

        // Stop if the mobile panel could not be opened.
        if (!panel) return;

        // Add the open class to the burger button if it exists.
        burger?.classList.add('is-open');

        // Mark the burger button as expanded if it exists.
        burger?.setAttribute('aria-expanded', 'true');

        // Mark breadcrumbs as expanded and active.
        setExpandedState(breadcrumbs, true);
    };

    // Attach event listeners to each desktop navbar trigger.
    triggers.forEach((trigger) => {
        // Open the menu on hover for desktop users.
        trigger.addEventListener('mouseenter', () => {
            // Ignore hover behaviour on tablet/mobile.
            if (!isDesktop()) return;

            // Open the menu connected to this trigger.
            openMenu(trigger.dataset.menu, trigger);
        });

        // Toggle the menu when the trigger is clicked.
        trigger.addEventListener('click', (event) => {
            // Prevent the click from bubbling to the document click handler.
            event.stopPropagation();

            // Get the menu name from the trigger's data-menu attribute.
            const menuName = trigger.dataset.menu;

            // Find the panel connected to this trigger.
            const panel = getPanelByName(menuName);

            // Check whether this trigger's panel is already active and open.
            const isAlreadyOpen =
                panel?.classList.contains('is-active') && isMainSubmenuOpen();

            // Close the menu if the active panel was clicked again.
            if (isAlreadyOpen) {
                closeMenu();
            } else {
                // Otherwise, open the selected menu.
                openMenu(menuName, trigger);
            }
        });
    });

    // Attach a click handler to the burger button if it exists.
    burger?.addEventListener('click', (event) => {
        // Prevent the click from bubbling to the document click handler.
        event.stopPropagation();

        // Close any open locale menus before toggling the burger menu.
        closeLocaleMenus();

        // Get the mobile submenu panel.
        const mobilePanel = getPanelByName('mobile');

        // Check whether the mobile menu is already active and open.
        const isMobileMenuOpen =
            mobilePanel?.classList.contains('is-active') && isMainSubmenuOpen();

        // Close the mobile menu if it is already open.
        if (isMobileMenuOpen) {
            closeMenu();
        } else {
            // Otherwise, open the mobile burger menu.
            openBurgerMenu();
        }
    });

    // Attach click handlers to breadcrumbs.
    breadcrumbs.forEach((breadcrumb) => {
        // Reopen the main mobile menu when a breadcrumb is clicked.
        breadcrumb.addEventListener('click', (event) => {
            // Prevent the breadcrumb's default link behaviour.
            event.preventDefault();

            // Prevent the click from bubbling to the document click handler.
            event.stopPropagation();

            // Close any open locale menus.
            closeLocaleMenus();

            // Open the mobile burger menu.
            openBurgerMenu();
        });
    });

    // Attach event listeners to each locale/language menu.
    localeMenus.forEach((menu) => {
        // Get the locale menu's dropdown toggle.
        const toggle = menu.querySelector('.w-dropdown-toggle');

        // Get the locale menu's dropdown list.
        const list = menu.querySelector('.w-dropdown-list');

        // Stop if the menu does not have a toggle.
        if (!toggle) return;

        // Open the locale menu on hover for desktop users.
        menu.addEventListener('mouseenter', () => {
            // Only use hover behaviour on desktop.
            if (isDesktop()) {
                openLocaleMenu(menu);
            }
        });

        // Toggle the locale menu when its toggle is clicked.
        toggle.addEventListener('click', (event) => {
            // Prevent the default dropdown behaviour.
            event.preventDefault();

            // Prevent the click from bubbling to the document click handler.
            event.stopPropagation();

            // Toggle this locale menu open or closed.
            toggleLocaleMenu(menu);
        });

        // Prevent clicks inside the dropdown list from closing the menu.
        list?.addEventListener('click', (event) => {
            // Stop dropdown-list clicks from bubbling upward.
            event.stopPropagation();
        });
    });

    // Close the submenu when the mouse leaves it on desktop.
    submenu.addEventListener('mouseleave', closeSubmenuOnMouseLeave);

    // Handle clicks inside the submenu.
    submenu.addEventListener('click', (event) => {
        // Check whether the clicked item is a mobile submenu trigger.
        const mobileTrigger = event.target.closest('.ff-mobile-menu-trigger');

        // Handle mobile submenu trigger clicks.
        if (mobileTrigger) {
            // Prevent the click from bubbling to the document click handler.
            event.stopPropagation();

            // Get the target menu name from the mobile trigger.
            const menuName = mobileTrigger.dataset.menu;

            // Stop if no menu name exists.
            if (!menuName) return;

            // Close any open locale menus.
            closeLocaleMenus();

            // Open the selected submenu panel.
            openPanel(menuName);

            // Stop running the rest of the submenu click handler.
            return;
        }

        // Prevent general submenu clicks from closing the menu.
        event.stopPropagation();
    });

    // Handle clicks anywhere in the document.
    document.addEventListener('click', (event) => {
        // Check whether the click happened on a desktop navbar trigger.
        const clickedTrigger = event.target.closest('.ff-navbar-trigger');

        // Check whether the click happened inside the submenu.
        const clickedInsideSubmenu = submenu.contains(event.target);

        // Check whether the click happened on the burger button.
        const clickedBurger = burger?.contains(event.target);

        // Check whether the click happened on a mobile submenu trigger.
        const clickedMobileTrigger = event.target.closest('.ff-mobile-menu-trigger');

        // Check whether the click happened on a navbar breadcrumb.
        const clickedBreadcrumb = event.target.closest('.ff-navbar .breadcrumb');

        // Check whether the click happened inside a locale menu.
        const clickedLocaleMenu = event.target.closest('.w-locales-list');

        // Close locale menus when clicking outside them.
        if (!clickedLocaleMenu) {
            closeLocaleMenus();
        }

        // On mobile/tablet, close the submenu when clicking outside navbar elements.
        if (
            !isDesktop() &&
            !clickedTrigger &&
            !clickedInsideSubmenu &&
            !clickedBurger &&
            !clickedBreadcrumb &&
            !clickedMobileTrigger
        ) {
            closeMenu();
        }
    });
};