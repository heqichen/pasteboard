var express = require("express");
var bodyParser = require("body-parser");
var sqlite3 = require('sqlite3');

var makeWord = require("./dict.js");

var port = 3303;
var restRouter = express.Router();
var adminRouter = express.Router();
//var frontRouter = express.Router();


var db = new sqlite3.Database("./paste.db", function() {
	console.log("db opened");
});


var getByTitle = function(title, callback) {
	var stmt = db.prepare("SELECT `id`, `title`, `content`, `creation_timestamp` FROM `content` WHERE `title`=? ORDER BY `id` DESC");
	stmt.get([title], function(err, rows) {
		if (err) {
			callback(err);
		} else {
			var data = {
				id: null,
				content: null,
				timestamp: null
			};
			if (rows) {
				data = {
					id: rows.id,
					content: rows.content,
					timestamp: rows.creation_timestamp
				}
			}
			
			callback(null, data);
		}
	});
}

var dbAddMemo = function(title, content, timestamp, callback) {
	var stmt = db.prepare("INSERT INTO `content` (`title`, `content`, `creation_timestamp`) VALUES(?, ?, ?)");
	stmt.run([title, content, timestamp], callback);
}


restRouter.get("/:pasteId", function(req, res) {
	var title = req.params.pasteId.toLowerCase();
	console.log("/rest/paste id: ", title);
	getByTitle(title, function(err, data) {
		if (err) {
			res.json({"error": "unknown"});
		} else {
			res.json(data);
		}
	});
});

restRouter.post("/:pasteId", function(req, res) {
	console.log("save data for ", req.params.pasteId);

	
	var content = req.body.content;
	var title = req.params.pasteId.toLowerCase();
	if (content && title) {
		var ts = Math.floor(new Date().getTime() / 1000);
		dbAddMemo(title, content, ts, function(err) {
			if (err) {
				res.json({"error": "unknown"});
			} else {
				res.json({"message": "ok"});
			}
		});
	}
});

adminRouter.get("/list/:start", function(req, res) {
	var start = 0;
	if (!isNaN(req.params.start)) {
		start = parseInt(req.params.start);
	}
	
	var stmt = db.prepare("SELECT `id`, `title`, `content`, `creation_timestamp` FROM `content` ORDER BY `id` DESC LIMIT ?, 10");
	stmt.all([start], function(err, rows) {
		if (err) {
			callback(err);
		} else {
			if (rows) {
				res.json(rows);
			}
		}
	});
});

var frontRouter = function(req, res, next) {
	console.log("url:", req.url);
	if (req.url == "/") {
		res.redirect(307, "/" + makeWord());
	} else {
		if (!req.url.startsWith("/assets/")) {
			req.url = "/assets/index.html";
		}
		console.log("calling next route");
		next();
	}
};

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use("/rest", restRouter);
app.use("/admin", adminRouter);
app.use("/", frontRouter);
app.use("/assets", express.static("./assets"));


app.listen(port);



console.log("listen on port: ", port);
