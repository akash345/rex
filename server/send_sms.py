# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client



def send_sms(phone_number, message):
    # account_sid = os.environ['TWILIO_ACCOUNT_SID']
    # auth_token = os.environ['TWILIO_AUTH_TOKEN']
    account_sid = 'AC8765801a6f4501d32f3d6a2bc28e31cd'
    auth_token = '9a72e3f1833b400e1f382a3cf1051906'
    client = Client(account_sid, auth_token)

    numbers_to_message = ['+16789069312']
    for number in numbers_to_message:
        message = client.messages \
            .create(
             body=message,
             messaging_service_sid='MG6e4ba6a146973fb1e9d54ca3e0037141',
             to= number
         )
    print(message.sid)
