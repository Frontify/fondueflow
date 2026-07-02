export function initURLSearchParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('iamfrontify')) {
        document.cookie = 'InternalTraffic=true; path=/; Secure; SameSite=Lax';
    }
}