//import "./components/accordion.js";
//import "./components/navbar.js";

// Utilities
import { initCookiebotFooter } from "./utilities/cookiebot-footer.js";
import { initQuotations } from "./utilities/quotations.js";
import { initRelAttributes } from "./utilities/rel-attributes.js";
import { initSlidingUnderlines } from "./utilities/sliding-underlines.js";
import { initURLSearchParams } from "./utilities/urlsearchparams.js";

// Components
import { initAccordion } from "./components/accordion.js";
import { initNavbar } from "./components/navbar.js";

/*
 * Use this variable to check the version of the framework currently being used.
 * This can be output in this module with: 
 * console.log(FONDUE_VERSION)
 */
const FONDUE_VERSION = "0.4.0";
// Attach variable to the window object to allow output in the console.
window.FONDUE_VERSION = FONDUE_VERSION;

function initFondue() {
    initCookiebotFooter();
    initQuotations();
    initRelAttributes();
    initSlidingUnderlines();
    initURLSearchParams();
    initAccordion();
    initNavbar();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFondue);
} else {
    initFondue();
}