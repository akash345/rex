from flask import Flask, request, send_file, Response, make_response,jsonify
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



class user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    friend1 = db.Column(db.String(50), unique=False)

    def __init__(self, id, friend1 = "huh"):
        self.id = id
        self.friend1 = friend1

@app.route("/")
def main():
    #db.create_all()
    logging.basicConfig(level=logging.DEBUG)
    # test_friend = Friend("Vik", 3)
    # friends = [test_friend]
    #b2 = Book(id = 533, title = "The Stranger", author_name = "Albert", author_surname = "Camus", month = "April", year = 2019)
    # db.session.add(b2)
    rex_test = user(random.randint(0, 2000), "vik")
    app.logger.error(rex_test.friend1)
    db.session.add(rex_test)
    try:
        db.session.commit()
        app.logger.error("Successfully Committed ")
        app.logger.error(user.query.all())
    except:
        db.session.rollback()
        app.logger.error("failed")
    return "hey"

    #return send_file(os.path.join(FRONTEND_DIR, "index.html"))

@app.route("/display")
def show_database():
    databaseView = "Database View:\n"
    for key in user.query.all():
        databaseView = databaseView + "Entry: " + str(key.id) + key.friend1 + '\n'
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

def clearDatabase ():
    db.session.query(user).delete()
    db.session.commit()



if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000")
