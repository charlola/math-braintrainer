export const navigateTo = url => {
    history.pushState(null, null, url);
    if (window.router !== undefined) {
        window.router();
    }
};