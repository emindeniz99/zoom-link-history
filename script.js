chrome.storage.local.get("links", function (data) {
	console.log(data.links)

	if (Array.isArray(data.links)) {
		let parent = document.createElement("ul")
		parent.setAttribute("id", "list")
		parent.setAttribute("class", "list-group")

		data.links.forEach((link) => {
			let item = document.createElement("a")
			item.setAttribute(
				"class",
				"list-group-item list-group-item-action justify-content-between "
			)
			item.setAttribute("href", link)
			item.setAttribute("target", "_blank")

			let linkitem = document.createElement("span")
			let timeago = document.createElement("small")
			timeago.innerText = link[1]

			linkitem.innerText = link[0].match("(zoom.us/j/[0-9]+)")[0]
			linkitem.setAttribute("class", "d-inline-block text-truncate")
			linkitem.style = "max-width: 150px;"
			item.appendChild(linkitem)
			item.appendChild(timeago)
			parent.appendChild(item)
		})
		document.getElementById("data").appendChild(parent)
	}
})

document.getElementById("clear").addEventListener("click", () => {
	chrome.storage.local.clear()
	chrome.storage.local.set({ links: [] })
	document.getElementById("list").innerHTML = ""
})
