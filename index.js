window.WikiBrowser = {
    modules: {}
};

(async () => {
    await mw.loader.using("mediawiki.api");

    window.api = new mw.Api();

    WikiBrowser.ui.mount();
})();