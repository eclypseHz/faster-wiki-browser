WikiBrowser.ui = {
    mount() {
        var root = document.getElementById("faster-wiki-browser-root")
		if (!root) return
		
		var header = document.createElement("div");
		
		function updateHeader() {
            header.textContent = `
            Edited: ${count.Edited} \n
            Skipped: ${count.Skipped} \n
            Error: ${count.Error}
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
			runBatch(log, updateHeader)
		}
		
		root.appendChild(header)
		root.appendChild(btn)
		root.appendChild(logBox)
    }
};