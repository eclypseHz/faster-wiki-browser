WikiBrowser.pages = {
    async get() {
        const pages = [];
        let cont;

        do {
            let res;

            if (WikiBrowser.config.category) {
                res = await WikiBrowser.api.categoryMembers(WikiBrowser.config.category, cont);
            } else if (WikiBrowser.config.embeddedIn) {
                res = await WikiBrowser.api.embeddedIn(WikiBrowser.config.embeddedIn, cont);
            } else {
                break;
            }

            pages.push(...res.pages);
            cont = res.continue;
        } while (cont);

        return pages;
    }
};