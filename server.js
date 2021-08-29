const fs = require("fs");
const fetch_file = require("./fetch_data");
let fetch = new fetch_file();

/*
app.get("/getres", async (req, res, next) => {
  var result_token = await fetch.getToken();
  console.log(result_token, "YAYYYYYYYYYY");
});

app.get("/getcat", async (req, res, next) => {
  var categories = await fetch.promiseCategories(1);
  console.log(categories, "YOOOOOOO");
}); */

async function main() {
  await fetch.getToken();
  await fetch.sleep(6000);
  const response = await fetch.getCategories(1);
  console.log("FINAL LIST OF CATEGORIES COLLECTED!");
  const final_response = await fetch.getCategoriesContent(response, 0, 1);
  console.log("FINAL LIST OF SUBCATEGORIES COLLECTED");
  await saveJson(final_response);
}

async function saveJson(final_object) {
  var result = {};
  for (var i = 0; i < final_object.length; i++) {
    let key = Object.keys(final_object[i]);
    if (result[key]) {
      result[key] = result[key].concat(final_object[i][key]);
    } else {
      result[key] = final_object[i][key];
    }
  }
  console.log("ALL DATA COLLECTED!");
  fs.writeFile(
    "scrapped_data.json",
    JSON.stringify(result),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    }
  );
}

main();
