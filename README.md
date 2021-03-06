# fb-crawler
#### a simple project for fb crawler

## Prepare
- Node.js (v6 up) & NPM are must!

- Prepare a **mysql** server with at least one database, one user who can read/write data and **create table** from this database! 
- You don't have to create **ANY** table. We will create everything we need by ourselves

- And then, modify [/config/config.js](/config/config.js) 

    1. add your FB Access Token @ config: **fb.options.accessToken**
    2. choose your own website port @ config: **website.port** (*default is 80*)
    3. put your mysql information @ config: **mysql**
- Now we can run our script:
```
npm start
```


## How to use
- Only one website with 4 routers

### Routers
|Url||Method|Description|
|:-|-|-|--|
|*/fbcrawler*|*/promise*| POST | a trigger point to call FB Crawler (writen by promise) |
||*/async*| POST | a trigger point to call FB Crawler (writen by async/await) |
|*/mutualfriend*|*/promise*| GET | input 2 IDs then output their mutual friends  (writen by promise) |
||*/async*| GET | input 2 IDs then output their mutual friends (writen by async/await) |

### Input Parameters & Return Value
- */promise* & */async* have the same input & output 
- **GET** method use querystring to pass params
- **POST** method use body to pass params
- every response has a **error** object if something wrong
- every response has a **result** object if everything is OK
- for more details & samples, read [FbCrawlerTest.postman_collection.json](/test/FbCrawlerTest.postman_collection.json) (it's a [Postman](https://www.getpostman.com/) setting file)

|Url|Parameters| Result |
|:-|-|-|
|*/fbcrawler*| name(*string*) | 'OK'(string)|
|*/mutualfriend*| idA(*string*), idB(*string*)| idA(*string*), idB(*string*), mutualFriends(*array of id(s) string*)|


