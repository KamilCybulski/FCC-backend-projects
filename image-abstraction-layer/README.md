## Image abstraction layer project for freeCodeCamp's backend certification ##


## User stories: ##
1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.

3. I can get a list of the most recently submitted search strings.

## Usage:

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

4. Currently the app uses Qwant's search API which is unofficial and largely undocumented.
   But it doesn't require any kind of API key or registration, which is nice for a practice project.
   Switching to different API would require some minor changes in `getData` and `parseData` 
   functions [here](https://github.com/KamilCybulski/FCC-backend-projects/blob/master/image-abstraction-layer/lib/get-search-results.js) 
