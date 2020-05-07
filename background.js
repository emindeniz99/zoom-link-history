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
		if (
			element[0].match("(zoom.us/j/[0-9]+)")[0] ==
			str.match("(zoom.us/j/[0-9]+)")[0]
		) {
			return true
		}
		checklimit--
		if (checklimit < 0) return false
	}
	return false
}

chrome.tabs.onUpdated.addListener((_, changeinfo, tab) => {
	if (changeinfo.url){
		let url=changeinfo.url
		if (url.includes("zoom.us/j/")) {
			chrome.storage.local.get("links", function (data) {
				console.log("links", data.links)
				if (Array.isArray(data.links)) {
					if (isIncluded(data.links, url)) {
						console.log("exist")
					} else {
						data.links.unshift([
							url,
							new Date().toLocaleTimeString(),
						])
						chrome.storage.local.set(
							{ links: data.links },
							function (data) {}
						)
					}
				} else chrome.storage.local.set({ links: [[url, new Date().toLocaleTimeString()]] })
			})
		}
	}
		
})
