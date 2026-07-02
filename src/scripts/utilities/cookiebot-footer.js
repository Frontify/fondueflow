export function initCookiebotFooter() {
    const el = document.getElementById("cookie-settings-link");

    if (!el) return;

    el.setAttribute("onclick", "Cookiebot.renew(); return false;");
}