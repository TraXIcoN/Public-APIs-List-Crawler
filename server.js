const fs = require("fs");
const fetch_file = require("./fetch_data");

//Instantiating the GetResults class to access it's methods
let fetch = new fetch_file();

//Main function
async function main() {
  //Get token and store it as a global variable
  await fetch.getToken();
  await fetch.sleep(6000);

  //Get list of categories
  const response = await fetch.getCategories(1);
  console.log("FINAL LIST OF CATEGORIES COLLECTED!");

  //Get list of subcategories w.r.t categories
  const final_response = await fetch.getCategoriesContent(response, 0, 1);
  console.log("FINAL LIST OF SUBCATEGORIES COLLECTED");

  //Save the results to a json file
  await saveJson(final_response);
}

//Function for saving results to a json file
async function saveJson(final_object) {
  var result = {};

  //Converting into a desirable format for converting the result object into JSON object
  for (var i = 0; i < final_object.length; i++) {
    let key = Object.keys(final_object[i]);
    if (result[key]) {
      result[key] = result[key].concat(final_object[i][key]);
    } else {
      result[key] = final_object[i][key];
    }
  }
  console.log("ALL DATA COLLECTED!");

  //Using fs module to save the JSON object as a JSON file
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
