chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.local.get("links", function (data) {
		console.log("links", data.links)
		if (!Array.isArray(data.links)) {
			chrome.storage.local.set({
				links: [],
			})
		}
	})
})

const isMatched = (str1, str2) => {
	if (str1.match("(zoom.us/j/[0-9]+)") == str2.match("(zoom.us/j/[0-9]+)")) {
		return true
	}
	return false
}

const isIncluded = (arr, str) => {
	let checklimit = 2
	for (let i = 0; i < arr.length; i++) {
		let element = arr[i]
		console.log(
			"sa",
			element[0].match("(zoom.us/j/[0-9]+)")[0] ==
				str.match("(zoom.us/j/[0-9]+)")[0]
		)
		if (
			element[0].match("(zoom.us/j/[0-9]+)")[0] ==
			str.match("(zoom.us/j/[0-9]+)")[0]
		) {
			console.log("sadasd")
			return true
		}
		checklimit--
		if (checklimit < 0) return false
	}
	return false
}

chrome.history.onVisited.addListener((historyItem) => {
	if (historyItem.url.includes("zoom.us/j/")) {
		chrome.storage.local.get("links", function (data) {
			console.log("links", data.links)
			if (Array.isArray(data.links)) {
				console.log(isIncluded(data.links, historyItem.url))

				if (isIncluded(data.links, historyItem.url)) {
					console.log("exists")
				} else {
					data.links.unshift([
						historyItem.url,
						new Date().toLocaleTimeString(),
					])
					chrome.storage.local.set({ links: data.links }, function (
						data
					) {})
				}
			} else chrome.storage.local.set({ links: [[historyItem.url, new Date().toLocaleTimeString()]] })
		})
	}
})
