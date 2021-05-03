const http = require("http");
const url = require("url");

/**
 * this file will return data that will be sent to browser
 * @param {http.IncomingMessage} req
 * @param {url.URL} url
 */
module.exports = (req, url) => {
    let query = url.searchParams;
    if (query.has("data")) {
        let data = "Goodbye World"; //placeholder
        return data;
    }
}