//importing built in modules, unnecessary but why not
const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const mimeTypes = require("./mimeTypes.json"); //taken from internet
const port = 8080; //port
const clientFilesPath = "./data"; //the directory that server will get data from
const apiFileName = "api.js"; //execute js file
const htmlFileName = "index.html"; //send html file back to browser

http.createServer((req, res) => {;
    if (req.method == "GET") {
        let baseURL = 'http://' + req.headers.host + '/';
        let parsedURL = new url.URL(req.url, baseURL); //url.parse deprecated so have to do this
        let filePath = clientFilesPath + parsedURL.pathname;

        fs.lstat(filePath, (err, stats) => {
            if (err) {
                console.log(err);
                if (err.code == 'ENOENT') res.writeHead(404);
                else res.writeHead(500);  
                return res.end();
            } else

            if (stats.isDirectory()) {
                let data = require(filePath + apiFileName)(req, parsedURL);
                if (data) {
                    res.writeHead(200);
                    return res.end(data, "utf-8");
                }
                else filePath += htmlFileName;
            }

            let fileExt = path.extname(filePath).toLowerCase();
            let contentType = mimeTypes[fileExt];           
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    console.log(err);
                    if (err.code == 'ENOENT') res.writeHead(404);
                    else res.writeHead(500);  
                    return res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    return res.end(content, "utf-8");
                }
            });    
        });
    }
}).listen(process.env.PORT || port, null, null, () => console.log("Server on, port 8080"));