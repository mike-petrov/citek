import json
import boto3
import uuid
import datetime

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
# TODO implement
# - PaymentID
# - CustomerName
# - CardNumber: string
# - Amount: number

 table = dynamodb.Table('payments')

 paymentID = ""
 if ('PaymentID' in event):
  paymentID = event('PaymentID')
 else:
  paymentID = uuid.uuid4().hex

 responce = table.put_item(
  Item = {
'paymentId': paymentID,
'CustomerName': event['CustomerName'],
'CardNumber': event['CardNumber'],
'Amount': event["Amount"],
'CreatedAt': str(datetime.datetime.now())
}
)

 return {
 'statusCode': 200,
 'body': json.dumps('Payment added, Id = ' + paymentID)
}
