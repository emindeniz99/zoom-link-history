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

console.log("zoom history");

chrome.storage.local.get("links", function (data) {
    let url=window.location.href
    // console.log("links", data.links)
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
