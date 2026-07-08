window.WikiBrowser = {
    modules: {}
};

(async () => {
    await mw.loader.using("mediawiki.api");

    window.api = new mw.Api();

    const base = "https://cdn.jsdelivr.net/gh/eclypseHz/faster-wiki-browser@main/";

    const files = [
        "config.js",
        "lib/api.js",
        "lib/pages.js",
        "lib/batch.js",
        "modules/replace.js",
        "ui.js"
    ];

    for (const file of files) {
        console.log("Loading:", file);

        const code = await fetch(base + file).then(r => r.text());
    }

    console.log(WikiBrowser);
    WikiBrowser.ui.mount();
})();