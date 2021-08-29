const request = require("request");
const fetch = require("node-fetch");

//Define Global variables here
var BASE_URL = "https://public-apis-api.herokuapp.com/api/v1/";
LIMIT = 9;
RATE = Math.floor(60 / (LIMIT + 1));
//Calculate the rate of sending requests

//Global token object
TOKEN = "";

//Enable logging

//Fetch results
class GetResults {
  constructor(limit, rate) {
    this.limit = limit;
    this.rate = rate;
    this.categories = [];
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //Function for getting the authentication token
  getToken() {
    let url = BASE_URL + "auth/token/";
    console.log(this.categories);
    try {
      return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
          let token_data;
          const status = res.statusCode;
          console.log("TOKEN GENERATED SUCCESSFULLY");
          token_data = JSON.parse(body)["token"];
          resolve(token_data);
        });
      }).then((result) => {
        TOKEN = result;
        console.log("TOKEN SET");
      });
    } catch (e) {
      console.log({ message: e.message });
    }
  }
  //Function for getting the list of categories
  async getCategories(page) {
    let url = BASE_URL + `apis/categories?page=${page}`;
    const response = await fetch(url, {
      headers: { Authorization: "Bearer= " + TOKEN },
    });
    const data = await response.json();
    if (data["count"] - 10 * page >= 0) {
      return data["categories"].concat(await this.getCategories(page + 1));
    } else {
      return data["categories"];
    }
  }

  //Function for storing it in an array of objects
  helperObject(data, cat) {
    var output = [];
    if (output[cat]) {
      output[cat] = [...output[cat], ...data];
    } else {
      output[cat] = data;
    }
    console.log(output);
    return output;
  }

  //Function for getting categories content
  async getCategoriesContent(categories, categoryNo, page) {
    let url =
      BASE_URL + `apis/entry?page=${page}&category=${categories[categoryNo]}`;
    console.log("Request category : " + categoryNo + " : " + url);
    const response = await fetch(url, {
      headers: { Authorization: "Bearer= " + TOKEN },
    });
    const status = response.status;
    //If we don't get a status of 200
    if (status != 200) {
      if (status == 429) {
        await this.sleep(6000);
      }
      if (status == 403) {
        //Get a new Token
        await this.sleep(6000);
        console.log("New token granted", TOKEN);
        setTimeout(async () => {
          this.getToken();
        }, 100);
        await this.sleep(6000);
        // const data_arr = this.helperObject([], categories[categoryNo]);
        return [].concat(
          await this.getCategoriesContent(categories, categoryNo, page)
        );
      }
    } else {
      // If we get a status of 200
      const data = await response.json();
      const data_set = {};
      data_set[categories[categoryNo]] = data["categories"];
      const data_arr = [data_set];
      if (data["count"] - 10 * page >= 0) {
        await this.sleep(6000);
        return data_arr.concat(
          await this.getCategoriesContent(categories, categoryNo, page + 1)
        );
      } else {
        if (categoryNo < categories.length) {
          await this.sleep(6000);
          return data_arr.concat(
            await this.getCategoriesContent(categories, categoryNo + 1, 1)
          );
        } else {
          await this.sleep(6000);
          return data_arr;
        }
      }
    }
  }

  async request() {}
}
module.exports = GetResults;
