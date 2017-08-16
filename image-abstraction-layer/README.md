## Image abstraction layer project for freeCodeCamp's backend certification ##


## User stories: ##
1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.

3. I can get a list of the most recently submitted search strings.

## Usage: ##

1. Yarn was used as a package manager for this project, so you will need it to install
  dependencies.

2. After installing dependencies, create a `config` folder in the root directory

3. In the `config` directory create a `config.js` file. 
   It should contain information about port for your app and database link.
   Example: 
   ```javascript
      module.exports = {
        URL: "mongodb://localhost:27017/imagesearch",
        PORT: 3000
      }
   ```


## Things to keep in mind: ##

1. Currently the app uses Qwant's search API which is unofficial and largely undocumented.
   But it doesn't require any kind of API key or registration, which is nice for a practice project.
   Switching to different API would require some minor changes in `fetchData` and `parseData` helper functions.

2. The app retrieves data from Qwant's API. Right after that, it sends the (filtered) result to the user **and**
   saves the information about the query to the database. It does not wait for the write operation to be completed
   before sending the response to the user. Therefore there is no guarantee that that saved history will be 100% correct.
   The project's user stories do not specify this, so I assumed that sending a response to the user as fast as possible is
   the priority. This can be easily changed though with additional call to `then()` method in `get-search-history` module. 
