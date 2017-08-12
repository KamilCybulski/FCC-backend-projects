## This is a url shortener project for freeCodeCamp's backend certification.

## User stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the 
   JSON response.

2. If I pass an invalid URL that doesn't follow the valid http://www.example.com
   format, the JSON response will contain an error instead.

3. When I visit that shortened URL, it will redirect me to my original link.

## Usage:

1. Yarn was used as a package manager for this project, so you will need it to install
  dependencies.

2. After installing dependencies, create a `config` folder in the root directory

3. In the `config` directory create a `config.js` file. 
   It should contain information about port for your app and database link.
   Example: 
   ```javascript
      module.exports = {
        URL: "mongodb://localhost:27017/shorturls",
        PORT: 3000
      }
   ```

4. Before starting your app, create a `counters` collection in your database
   and insert there one document:
   ```bash
    db.counters.insertOne({colName: "urls", lastIdx: 10000})
   ```

5. Currently the app considers everythig that starts with `http://` 
   or `https://` to be a valid url. This can be easily changed by modifying
   the regexp used in `./lib/shortener.js`
