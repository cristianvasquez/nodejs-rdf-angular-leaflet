// server.js

// set up ========================
var express = require('express');
var app = express(); // This is an express ap
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)

// options =================

var argv = require('optimist')
    .default('port', 8080)
    .argv;
console.log(__dirname);



// configuration =================

app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

// static stuff -------------------------------------------------------------
app.use(express.static('app'));
app.use(express.static('server/rdf'));

// listen (start app with node server.js) ======================================
app.listen(argv.port);

var os = require("os");
function getURIQA(){
    return 'http://'+os.hostname()+':'+ argv.port+'/api/nodes/';
}
console.log("App listening on port " + argv.port);

// api ---------------------------------------------------------------------

var jsonld = require('jsonld');
var context = {
    "name": {"@id": "http://openthings.org/name", "@language": "fr"},
    "address": {"@id": "http://openthings.org/address"},
    "tag": {"@id": "http://openthings.org/tag", "@language": "fr"},
    "latitude": {
        "@id": "http://schema.org/latitude",
        "@type": "xsd:float"
    },
    "longitude": {
        "@id": "http://schema.org/longitude",
        "@type": "xsd:float"
    },
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "link": {"@id": "http://openthings.org/link", "@type": "@id"},
    "image": {"@id": "http://schema.org/image", "@type": "@id"},
    "mail": {"@id": "http://xmlns.com/foaf/0.1/mbox", "@type": "@id"}
};

app.get('/api/nodes', function (req, res) {
    console.log("Retrieving nodes");
    // deserialize N-Quads (RDF) to JSON-LD
    // @TODO find a better way to do this...
    // is https://www.npmjs.com/package/jsonld a good choice?
    store.graph(function (err, graph) {
        var ntSerialization = graph.toNT();
        if(err) {
            return console.log(err);
        }
        jsonld.fromRDF(
            ntSerialization,
            { format: 'application/nquads' },
            function (err, doc) {
                if(err) {
                    return console.log(err);
                }
                jsonld.compact(doc, context, function (err, compacted) {
                    res.json(compacted);
                });
            });
    });
});

app.get('/api/nodes/:id', function (req, res) {
    var uri = getURIQA() + req.params.id;
    console.log(uri);
    store.node(uri, function (err, node) {
        jsonld.fromRDF(node.toNT(),
            { format: 'application/nquads' },
            function (err, doc) {
                if(err) {
                    return console.log(err);
                }
                jsonld.compact(doc, context, function (err, compacted) {
                    if(err) {
                        return console.log(err);
                    }
                    res.json(compacted);
                });
            });
    });
});

fs = require('fs')

// testing rdfStore
var rdfstore = require('rdfstore');

var store;
fs.readFile('./server/rdf/farmers_min.ttl', 'utf8', function (err, data) {
    var result = data.replace(/http:\/\/openthings.org\/organization\//g, getURIQA());
    store = rdfstore.create(function (err, store) {
        //store.load('remote', 'http://localhost:8080/farmers_test.ttl', function (err, results) {
        //    console.log("Successfully fetched %d triples from remote", results);
        //});
        store.load('text/turtle',result, function (err, results) {
            console.log("Successfully fetched %d triples from local", results);
        });

    });
});




