# Headers 
from __future__ import print_function
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
from pymongo import MongoClient
import json

# Credentials for Twitter API 
ACCESS_TOKEN = '715367904917630976-kwsx1s08HVj8oypW9n8MbFf1oVvmQUx'
ACCESS_SECRET = '2T8vSJ8gM1ahsEGPdqFGOwYJbVbghYEciMtvpTWotbDlG'
CONSUMER_KEY = 'ezWq4BZGZk6oE9je6ojKpDHUu'
CONSUMER_SECRET = 'ZaevS8RwvJcKaOyWB6tR782r8ORRlk8ycNIgIktUF0N6RSPB9v'

# Keywords to be track
keywords = ['#narendramodi', '#modi', '#namo', '#bjp', '#modigovt', '#gst', '#government', 
            '#amitshah', '#modigovernment', '#gujarat', '#SurgicalStrike', 'bjp', 'aap', 'sisodia', 'jaitley', 
            '#aap', '#AAPSweep', '#AAPKiDilli', '#AAPDrama', '#AAPNautanki', '#delhi', '#QuitAAP', '#AKBackModiOnPak', 'modi', 'kejriwal']
                                                                                                                                            
#  Only English Language
language = ['en']

class listener(StreamListener):
                                                                                        
    def on_data(self, data):                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        #This will be called each time we receive stream data
        client = MongoClient('localhost', 27017)
         
        # Use twitter_database_precogg 
        db = client.twitter_database_precogg         
         
        # Decode JSON
        datajson = json.loads(data)
         
        db.tweets_precoggg.insert(datajson)
       
        return(True)
    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    def on_error(self, status):
         print(status)

auth = OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

twitterStream = Stream(auth, listener())
twitterStream.filter(track=keywords, languages=language)