WikiBrowser.modules.replace = {
    async process(title) {
        const text = await WikiBrowser.api.getText(title);

        if (!text) {
            return "Skipped";
        }

        const newText = WikiBrowser.config.regex
            ? text.replace(WikiBrowser.config.replaceFrom, WikiBrowser.config.replaceTo)
            : text.replaceAll(WikiBrowser.config.replaceFrom, WikiBrowser.config.replaceTo);

        if (text === newText) {
            return "Skipped";
        }

        await WikiBrowser.api.editPage(title, newText);

        return "Edited";
    }
};