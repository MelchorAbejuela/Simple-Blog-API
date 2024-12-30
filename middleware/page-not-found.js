const pageNotFound = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Page Not Found</h1>");
  res.end();
};

module.exports = pageNotFound;
