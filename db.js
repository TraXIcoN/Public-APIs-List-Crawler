const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");

async function db_upload() {
  //Can customize this uri
  const uri =
    "mongodb+srv://Aditya:testabcd@cluster0.sro5d.mongodb.net/test?authSource=admin&replicaSet=atlas-1xqjpk-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true";
  const final_data = JSON.parse(
    fs.readFileSync("./scrapped_data.json", "utf-8")
  );
  console.log(final_data);
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    const dbo = db.db("postman");
    dbo.collection("scrappedData").insertOne(final_data, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

db_upload();
