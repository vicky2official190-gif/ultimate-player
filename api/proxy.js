export default async function handler(req, res) {
  
  const url = req.query.url;

  if (!url) {
    res.status(400).send("Missing url");
    return;
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://selectionway.com/"
    }
  });

  const contentType = response.headers.get("content-type");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", contentType);

  const body = await response.arrayBuffer();
  res.send(Buffer.from(body));
}
