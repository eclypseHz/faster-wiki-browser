window.WikiBrowser = {
    modules: {}
};

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed when loading " + src));
        document.head.appendChild(script);
    });
}

(async () => {
    await mw.loader.using("mediawiki.api");

    window.api = new mw.Api();

    const base = "https://raw.githubusercontent.com/eclypseHz/faster-wiki-browser/refs/heads/main/";

    const files = [
        "config.js",
        "lib/api.js",
        "lib/pages.js",
        "lib/batch.js",
        "modules/replace.js",
        "lib/ui.js"
    ];

    for (const file of files) {
        console.log("Loading:", file);
        await loadScript(base + file);
    }

    console.log(WikiBrowser);
    WikiBrowser.ui.mount();
})();