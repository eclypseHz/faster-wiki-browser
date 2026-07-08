WikiBrowser.batch = {
    async worker(queue, log, updateHeader) {
        while (queue.length) {
            const title = queue.shift();

            try {
                const result = await WikiBrowser.modules.replace.process(title);

                WikiBrowser.count[result]++;

                log(result + ": " + title);
                updateHeader();
            } catch (e) {
                WikiBrowser.count.Error++;
                log("Error: " + title);
                updateHeader();
            }
        }
    },

    async run(log, updateHeader) {
        const pages = await WikiBrowser.pages.get();
        const queue = pages.slice();

        log("Loaded: " + pages.length);

        const workers = [];

        const start = performance.now();

        for (let i = 0; i < WikiBrowser.config.concurrency; i++) {
            workers.push(this.worker(queue, log, updateHeader));
        }

        await Promise.all(workers);

        const finish = ((performance.now() - start) / 1000).toFixed(2);

        log(`Done in ${finish} seconds`);
        log(`Edited: ${WikiBrowser.count.Edited}`);
        log(`Skipped: ${WikiBrowser.count.Skipped}`);
        log(`Errors: ${WikiBrowser.count.Error}`);
    }
};