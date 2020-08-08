# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'AC8765801a6f4501d32f3d6a2bc28e31cd'
auth_token = '9a72e3f1833b400e1f382a3cf1051906'
client = Client(account_sid, auth_token)


numbers_to_message = ['+18142488607', '+16789069312', '+16306563184', '+16785750415']
for number in numbers_to_message:
    message = client.messages \
        .create(
         body='Welcome to Rex!',
         messaging_service_sid='MG6e4ba6a146973fb1e9d54ca3e0037141',
         to= number
     )

print(message.sid)
