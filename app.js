const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app
  .route("/books") // gets all the books
  .get(function (req, res) {
    var x = require("./data.json");
    var books = JSON.stringify(x);
    var object = JSON.parse(books);
    res.send(object);
  })
  .post(function (req, res) {
    // posts a new book
    var x = require("./data.json");
    var books = JSON.stringify(x);
    var object = JSON.parse(books);

    var id = req.body.id;
    var language = req.body.language;
    var edition = req.body.edition;
    var author = req.body.author;

    var newbook = {
      id: id,
      langugage: language,
      edition: edition,
      author: author,
    };

    object.book.push(newbook);
    console.log(object);
    fs.writeFile(
      "./data.json",
      JSON.stringify(object),
      function writeJSON(err) {
        if (err) res.send(err);
        else res.send("posted successfully!");
      }
    );
  });

app
  .route("/books/:bookid")
  .get(function (req, res) {
    // gets a book with the help of id number.
    var x = require("./data.json");
    var books = JSON.stringify(x);
    var object = JSON.parse(books);

    var bool = false;
    for (var i = 0; i < object.book.length; i++) {
      if (req.params.bookid === object.book[i].id) {
        bool = true;

        res.send(object.book[i]);
        break;
      }
    }
    if (bool === false) res.send("NOT FOUND!");
  })
  .put(function (req, res) {
    // updates the whole book witha given id.
    var x = require("./data.json");
    var books = JSON.stringify(x);
    var object = JSON.parse(books);

    var id = req.body.id;
    var language = req.body.language;
    var edition = req.body.edition;
    var author = req.body.author;

    var bool = false;

    for (var i = 0; i < object.book.length; i++) {
      if (req.params.bookid === object.book[i].id) {
        bool = false;

        object.book[i].id = id;
        object.book[i].language = language;
        object.book[i].edition = edition;
        object.book[i].author = author;

        fs.writeFile(
          "./data.json",
          JSON.stringify(object),
          function writeJSON(err) {
            if (err) res.send(err);
            else res.send("updated successfully!");
          }
        );
      }
    }

    if (bool === false) res.send("NOT FOUND!");
  })
  .delete(function (req, res) {
    //deletes the book with a given id.
    var x = require("./data.json");
    var books = JSON.stringify(x);
    var object = JSON.parse(books);

    var bool = false;

    for (var i = 0; i < object.book.length; i++) {
      if (req.params.bookid === object.book[i].id) {
        bool = true;

        object.book.splice(i, 1);
        fs.writeFile(
          "./data.json",
          JSON.stringify(object),
          function writeJSON(err) {
            if (err) res.send(err);
            else res.send("Deleted successfully!");
          }
        );
      }
    }

    if (bool === false) res.send("NOT FOUND!");
  });

app.listen(3000);
