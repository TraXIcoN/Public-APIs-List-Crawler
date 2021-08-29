
# Public APIs List Crawler

* Built entirely on Nodejs without using any dedicated Scraping Framework like Puppeteer, Cherrio etc.
* Uses asynchronous module like node-fetch` for fetching data and made use of promise for fetching data using request module.
* Made asynchronous timeout function for tackling api request limit.
* Uses `mongoose` to write the json file to a Mongo Database hosted on moongodb atlas.

## Details

1. First, we need to get the API token. Then all the successive requests have to contain this request in the header. 

2. The rate limit is 10 request per minute and the token expires after 5 minutes. 

3. To regulate the rate limit, a conditional check is used to throttle the current request by adding sleep and making sure that only allowed number of requests are made per minute.

4. To handle the token expiration, we search for requests where `status_code != 200`. However, multiple such cases are possible, and we can create a new token for every such request, but for `status_code==429` i.e. too many requests, the server will not allow us to get a new token. Hence, we need to throttle the request and wait for some time before getting the token again.  

5. The extracted data is stored in a json format in `data.json` and this JSON file can then be used to write into a Database. An image of my Database is hosted on Mongodb atlas. 

## How to run?
1. Clone the repository into your system.
2. Open a Terminal Window in the Repository Folder. Make sure you have Docker installed locally on your system beforehand.
3. Run the Docker Daemon using `sudo dockerd` in a Terminal Window or by launching Docker Desktop on windows machines.
4. Now, open another terminal window in your repository and run `docker build -t <image_name> .` to build the application using Docker.
5. To run the Docker image now, execute `docker run <image_name>`
6. The data will be saved to `scrapped_data.json`.
7. This JSON file can now be used to write into any database.

As an example, I have made a seperate `db.js` file that writes to a Mongo Database hosted on MongoDB Atlas. 

## Schema Details of the Database

I am using MongoDB to store the scraped data because of the flexibility it provides us. Also, MongoDB can store JSON data easily, without the need of storing it as a string.

The structure of the BSON file is- 

database Object -> Category Name -> Array of APIs(Name, Description, Auth, HTTPS, CORS, Link, Category)

```json

{
    "database":{
        "Animals":[
            {
                "name":"",
                "description":"",
                "cors":"",
                "https":"",
                "auth":"",
                "link":"",
                "category":""
            },
            {

            }
            {
            
            }
        ]
    }
}


```
## Delieverables - What have I achieved?

- [x] Object Oriented
- [x] Support for Authentication
- [x] Support for Pagination
- [x] Support for Rate Limiting
- [x] Crawls all Entries for all Categories
- [x] Support for Token Expiration


## Delieverables - What have I not achieved?

I have achieved every listed task mentioned in the assignment.

## What would I have improved on if given more days?

-  I would have probably migrated to a different option of inserting data in the database. If there was a ton of data then all the concat operation I did on those arrays(:P) might become very costly and instead of that I am thinking of using a database stream to directly insert json documents in the database.
- If the need arises for a local JSON file then the user could easily export their collection from their mongoDB database.

> #### Made with a cup of coffee

