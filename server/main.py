from flask import Flask, request, send_file, Response, make_response,jsonify
from twilio.rest import Client
from flask_sqlalchemy import SQLAlchemy
from server import app,db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from friend import *
import json
import os
import threading
import logging
import random



# class user(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     friends = db.Column(db.String(1000), unique=False)
#
#     def __init__(self, id, friends = "huh"):
#         self.id = id
#         self.friends = friends

@app.route("/")
def front():
    #enable this to recreate the db after destroying it
    #clearDatabase()
    # db.create_all()
    # logging.basicConfig(level=logging.DEBUG)
    # rex_test = user(random.randint(0, 2000), "vik")
    # app.logger.error(rex_test.friends)
    # db.session.add(rex_test)
    # try:
    #     db.session.commit()
    #     app.logger.error("Successfully Committed ")
    #     app.logger.error(user.query.all())
    # except:
    #     db.session.rollback()
    #     app.logger.error("failed")
    # send_sms(6789069312, "test test")
    #send_sms(6789069312, 'cmon')
    return "hey"


@app.route("/display")
def show_database():
    databaseView = "Database View:\n"
    for key in user.query.all():
        databaseView = databaseView + "Entry: " + str(key.id) + key.friends + '\n'
    return databaseView

@app.route('/api/echo-json', methods=['GET', 'POST'])
def add():
    data = request.get_json()
    user = data['user']
    message = data['message']
    app.logger.error("Here is the data")
    app.logger.error(user)
    return '''<h1> The user is {}
                   The message is {}</h1>'''.format(user,message)

@app.route('/api/send-message', methods=['GET', 'POST'])
def sendMessage():
    data = request.get_json()
    app.logger.error(data)
    phone_num = data["phone_num"]
    url = data['URL']

    send_sms(phone_num, "Check out this product I'm looking at: " + url)

    app.logger.error("Phone Num:" + phone_num)
    app.logger.error("URL" + url)
    return '''<h1> The user is {}
                   The message is {}</h1>'''.format(phone_num,url)

@app.route('/user_validation', methods=['GET', 'POST'])
def getUserData():
    data = request.get_json()
    username = data['user']
    user_data = user.query.get(data['user'])
    if(user_data is not None) :
        app.logger.error("Found User Data")
        return extractJSONFromFriends(user_data.friends)
    else:
        app.logger.error("User Not Found")
        return jsonify(is_null_response = "yes")

def clearDatabase ():
    db.session.query(user).delete()
    db.session.commit()

#Converts String Friends Data to JSON
def extractJSONFromFriends(friends) :
    friends_list = friends.split
    max_friends = 5
    #max_friends * 2 to include phone number
    while (len(friends_list) < max_friends*2):
        #0 will be the common null between js and server
        friends_list.append(0)
    friend_dict = {}
    friendIter = 0
    for x in range(0, len(friends_list), 2):
        friendIter += 1
        friend_dict['friend' + friendIter] = friends_list[x]
        friend_dict['friend' + friendIter + "num"] = friends_list[x+1]
    return json.dumps(friend_dict)

def send_sms(phone_number, message):
    # account_sid = os.environ['TWILIO_ACCOUNT_SID']
    # auth_token = os.environ['TWILIO_AUTH_TOKEN']
    account_sid = "AC8765801a6f4501d32f3d6a2bc28e31cd"
    auth_token = '9f76c3dfba1903404758653885f1ff77'
    client = Client(account_sid, auth_token)

    #numbers_to_message = ['+16789069312']
    numbers_to_message = []
    numbers_to_message.append(number_to_twilio_num(phone_number))
    print(numbers_to_message[0])
    for number in numbers_to_message:
        message = client.messages \
            .create(
             body=message,
             messaging_service_sid='MG6e4ba6a146973fb1e9d54ca3e0037141',
             to= number
         )
    print(message.sid)

#Takes in a US Number like "6785751485" and converts it to a Twilio compat num
def number_to_twilio_num(phone_number):
    twilio_num = str(phone_number)
    return "+1" + twilio_num

send_sms(6789069312, 'hey')




if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000")
