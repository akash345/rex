from flask import Flask, request, send_file, Response, make_response,jsonify
from flask_sqlalchemy import SQLAlchemy
from friend import *
import json
import os
import threading
import logging
import pyrebase



app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myDB.db'
db = SQLAlchemy(app)

#import database
#db = database.Database()


firebaseConfig = {
    apiKey: "AIzaSyDhfdtCS_cZgyovvU2Y61L8XdCek7PJPP8",
    authDomain: "rex-app-3ecc6.firebaseapp.com",
    databaseURL: "https://rex-app-3ecc6.firebaseio.com",
    projectId: "rex-app-3ecc6",
    storageBucket: "rex-app-3ecc6.appspot.com",
    messagingSenderId: "302593286147",
    appId: "1:302593286147:web:0cc546bdb2a0fff029ae36",
    measurementId: "G-MD166Z3B63"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

ROOT_DIR = "/tf/HackDuke2019"
FRONTEND_DIR = os.path.join(ROOT_DIR, "rex")

class rexUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    friends = db.Column(ARRAY(Friend))


@app.route("/")
def main():
    logging.basicConfig(level=logging.DEBUG)
    test_friend = Friend("Vik", 3)
    friends = [test_friend]
    rex_test = rexUser(id = 87432)
    app.logger.error(rex_test.id)
    return "Hello World!"

    #return send_file(os.path.join(FRONTEND_DIR, "index.html"))


@app.route('/api/echo-json', methods=['GET', 'POST'])
def add():
    data = request.get_json()
    user = data['user']
    message = data['message']
    app.logger.error("Here is the data")
    app.logger.error(user)
    return '''<h1> The user is {}
                   The message is {}</h1>'''.format(user,message)
    #return jsonify(data = 12)



if __name__ == "__main__":
    db.create_all()
    threading.Thread(name="phone_data_queue", target=process_phone_data_thread).start()
    app.run(host="127.0.0.1", port="5000")
