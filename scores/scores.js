function compare(a, b) {
    return b.score - a.score;
};

const jsonBody = require("body/json");

var scores = [{
    name: "Edwin",
    score: 50
}, {
    name: "David",
    score: 39
}];

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var body;
    jsonBody(req, res, (err, body) => {
        if (req.method === "GET") {

            if (req.url != "/scores") {
                res.statusCode = 404;
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/javascript');

                body = scores;
            }
        } else if (req.method === "POST") {
            console.log(body);
            res.statusCode = 201;
            scores.push(body);
            scores.sort(compare);
            scores.slice(0, 3);
        }

        res.end(JSON.stringify(scores));
    })

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});