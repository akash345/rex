# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client
import os

def send_sms(phone_number, message):
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    # account_sid = "AC8765801a6f4501d32f3d6a2bc28e31cd"
    # auth_token = '9f76c3dfba1903404758653885f1ff77'
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
