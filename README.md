## Twitter_Extractor_And_Analysis (Task A)

The data collected from Twitter is stored in a MongoDB collection. From the curated tweets, Web Application showcases:
1. Locations of the Tweet 
2. List of Top 10 Hashtags being used in the stream
3. Distribution of Retweeted Tweets 
4. Distribution of Type of Tweet i.e. Text, Image, Text+Image

### Methodology:
1. Used Twitter REST API to search for tweets containing hashtags relevant to PM Narendra Modi and Delhi CM Arvind Kejriwal.
2. Stored the tweets in MongoDb.
3. Using the database, I made a webapp using node-js having different charts analysing the tweets. 

### Running:
1. Download the node-js app loaded.
2. Put the database uploaded on your localhost (MongoDb). I have attached the code which produces the database.
3. Run the app using npm start from terminal.
4. Open localhost:3000 to run the app.

### Requirements:
1. Python 2.7 
2. Tweepy 
3. PyMongo  
4. NLTK 
5. Numpy 
6. Scipy 
7. Node Js
8. MongoDb

Most of dependencies could be installed using pip.

### References:
+ https://coolprof.wordpress.com/2014/10/19/tweepy-and-pymongo-retrieving-and-storing-tweets-in-mongodb/
+ https://pythonprogramming.net/twitter-api-streaming-tweets-python-tutorial/?completed=/mysql-live-database-example-streaming-data/
+ https://github.com/SamDelgado/twitter-to-mongo/blob/master/twitter-to-mongo.py
+ https://developers.google.com/chart/

