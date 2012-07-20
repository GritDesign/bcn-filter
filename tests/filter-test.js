var BaconDB = require("bacon-db-client").BaconDB;
var BcnFilter = require("../lib/bcn-filter").BcnFilter;

var db = new BaconDB("http://localhost:31313");
var root = db.getRoot("/sites/www.sizzlepig.com/projects/A4wlJchYVznV-EShTNIsPuHjmew");

root.on("initialized", function() {
    var query = root.select("/positions/**");

    var keyRegex = /^\/positions\/(.*)(\/[^\/]+\/[^\/]+\.json)$/;
    function filterFunction(key) {
        var results = keyRegex.exec(key); 
        if (!results) {
            return null;
        } else {
            return [results[1], results[2]];
        }
    }

    var filtered = new BcnFilter(query, filterFunction);

    filtered.on("data", function(index, key, value) {
        console.log("Got data %s, %s", key, value);
    });

    filtered.on("end", function() {
        db.close();
        process.exit();
    });
});

