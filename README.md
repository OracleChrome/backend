# Oracle
> A powerful microservice backend API router for the Oracle Chrome extension.

## API Endpoints
The backend API has the following API endpoints that the Chrome extension hits up for complicated information processing and natural language processing. Provided is the set of API endpoint inputs and outputs, along with the types generally required of the payload.
* `POST /user`
  * Input: `JSONObject`
     * {email:`string`, googleId:`string`}
  * Output:
     * `200` - User is in the system
     * `404` - User is not in the system 
* `POST /users`
  * Input: `JSONObject`
     * {email:`string`, googleId:`string`, history:`[HistoryItem]`}
  *  Output:
     * `200` - User was successfully added
* `POST /nlp`
  * Input: `JSONObject`
    * {googleId:`string`, webpage:`string`}
  * Output: `NLPResultList`

The backend currently has one microservice that it depends on - the NLP microservice, which actually parses through the webpage data, runs NLP and turns it into the actionable data that is then used for the rendering of the information cards from within the extension.

### API Endpoint Types information
The following custom types that were defined on the API endpoints are defined as follows:
* `JSONObject`:  A JSON serialization representation of an object/dictionary
* `HistoryItem`: A Chrome HistoryItem https://developer.chrome.com/extensions/history#type-HistoryItem
* `NLPResultList`: [{metadata:{type:`string`, term:`string`, category:`string`}, data:?}]
    *  type could be a string from the following:
        * `google-maps`
        * `google-calendar`
        * `youtube-video`
        * `twitter-tweet`
        * `wikipedia-information`
        * `yelp-information`
        * `uber-request`
    * data depends on the type
        * `google-maps`: `string`
            *  data is a URL string that directly leads to a Google Map
        * `youtube-video`: `string`
            * data is a URL string that directly leads to a Youtube video
        * `twitter-tweet`: `JSONObject`
            * data is a JSONObject that directly leads to the relevant Twitter tweet
            * {author:string, tweet:string, authorImage:string}
        * `wikipedia-information`: `string`
            * data is a URL string that directly leads to the relevant Wikipedia information
        * `yelp-information`: `JSONObject`
            * {name:`string`,description:`string`,ratings:`float`,images:`[string]`}

## NLP Microservice Interface
The NLP Microservice is invoked by the Oracle backend by using the Node PythonShell module and sending this JSON schema payload: 
  * `{userId:string, webpageText:string}`
