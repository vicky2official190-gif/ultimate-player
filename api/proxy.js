export default async function handler(req, res) {

const url = req.query.url

if (!url) {
res.status(400).send("Missing url")
return
}

const response = await fetch(url, {
headers: {
"User-Agent": "Mozilla/5.0",
"Referer": "https://selectionway.com/"
}
})

const contentType = response.headers.get("content-type")

res.setHeader("Access-Control-Allow-Origin", "*")

// Handle m3u8 rewrite

if (url.includes(".m3u8")) {

let text = await response.text()

const base = url.substring(0, url.lastIndexOf("/") + 1)

text = text.split("\n").map(line => {

if (line && !line.startsWith("#")) {
return "/api/proxy?url=" + encodeURIComponent(base + line)
}

return line

}).join("\n")

res.setHeader("Content-Type", "application/vnd.apple.mpegurl")

res.send(text)

return
}

// stream video

const buffer = await response.arrayBuffer()

res.setHeader("Content-Type", contentType)

res.send(Buffer.from(buffer))

}
