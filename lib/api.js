WikiBrowser.api = {
    async categoryMembers(category, cont) {
        const res = await api.get({
            action: "query",
            list: "categorymembers",
            cmtitle: "Category:" + category,
            cmlimit: "max",
            cmcontinue: cont,
            cmnamespace: WikiBrowser.config.namespace,
            formatversion: 2
        });

        return {
            pages: res.query.categorymembers.map(p => p.title),
            continue: res.continue?.cmcontinue
        };
    },
    async embeddedIn(title, cont) {
        const res = await api.get({
            action: "query",
            list: "embeddedin",
            eititle: title,
            eilimit: "max",
            eicontinue: cont,
            cmnamespace: WikiBrowser.config.namespace,
            formatversion: 2
        });

        return {
            pages: res.query.embeddedin.map(p => p.title),
            continue: res.continue?.eicontinue
        };
    },
    async getText(title) {
        var res = await api.get({
            action: "query",
            prop: "revisions",
            rvprop: "content",
            rvslots: "main",
            titles: title,
            formatversion: 2,
            format: "json"
        })

        var page = res.query.pages[0]
        return page?.revisions?.[0]?.slots?.main?.content || ""
    },
    async editPage(title, text) {
        return api.postWithToken("csrf", {
            action: "edit",
            title: title,
            text: text,
            summary: WikiBrowser.config.summary + " (via FWB)",
            bot: true,
            formatversion: 2
        })
    }
};