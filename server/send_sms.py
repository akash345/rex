# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client



def send_sms(phone_number, message):
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    numbers_to_message = ['+16785751485']
    for number in numbers_to_message:
        message = client.messages \
            .create(
             body=message,
             messaging_service_sid='MG6e4ba6a146973fb1e9d54ca3e0037141',
             to= number
         )
    print(message.sid)
