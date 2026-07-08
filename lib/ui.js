WikiBrowser.ui = {
    mount() {
        var root = document.getElementById("faster-wiki-browser-root")
		if (!root) return
		
		var header = document.createElement("div");
		
		function updateHeader() {
            header.textContent = `
            Edited: ${WikiBrowser.count.Edited} \n
            Skipped: ${WikiBrowser.count.Skipped} \n
            Error: ${WikiBrowser.count.Error}
            `;
		}
		
		updateHeader();
        
		var btn = document.createElement("button")
		btn.textContent = "Execute"
		
		var logBox = document.createElement("pre")
		
		function log(msg) {
			logBox.textContent += msg + "\n"
		}
		
		btn.onclick = function () {
			logBox.textContent = ""
			log("Starting...")
			WikiBrowser.batch.run(log, updateHeader)
		}
		
		root.appendChild(header)
		root.appendChild(btn)
		root.appendChild(logBox)
    }
};