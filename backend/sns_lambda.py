

import boto3
import json

sns=boto3.client('sns')

def lambda_handler(event, context):
    # TODO implement
    ev=event
    sns.publish(
        TopicArn='arn:aws:sns:us-east-1:707071408827:myLambdaTopic',
       # PhoneNumber='+79992243974',
        Message=('Hi my dear')
        )
    
    
    
    return {
        "statusCode" :200,
        "body":json.dumps('recieved')
    }
