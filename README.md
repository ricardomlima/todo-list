# To Do List Application

To do list app so you can organize yourself better.
<br/>

# Project Setup

## Requirements

1. Install [Docker](https://docs.docker.com/engine/install/) (make sure docker compose is installed too)
2. [Configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) your AWS credentials locally

## Project Setup

Install dependencies
`npm run install`

# Local Development

## Spinning up the server

---

To get the project running locally run: <br/><br/>
$ `docker compose up` <br/><br/>
so that a dockerized instance of Dynamo DB will be available. After that run: <br/>

`npm run start-local` <br/>

And you will have a local server available with the endpoints defined in your serverless.yml file accessed through port 3000. In case you want to change the port make sure to update the `port` key in global-setup.js as parameter for the `setupDevServer` function.

<br/>
<b>Attention:</b> When you run a local server the serverless-offline and serverless-dynamodb-local plugins makes sure the required dynamodb tables are created just as if you were deploying a serverless stack in the cloud.

## Invoking functions

---

After running `npm run start-local` you can make simple http requests to your local endpoint such as:

`curl http://localhost:3000`

to retrieve all tasks. Or even:

`curl -X POST -H 'Content-Type: application/json' -d '{"taskId": "hello","title":"new task"}' http://localhost:3000`

to create a new Task.

## Deploying custom environments

---

In case you want to use the complete application stack hosted in AWS you can deploy a custom environment by running:

`npm run deploy-branch --stage=custom-stage`

Where instead of custom-stage you can use whatever name you like. You can access the endpoints after the deployment is complete through the output it generates with it's related URL. Make sure to replace the `localhost:3000` with the generated endpoint in the previous curl command defined in the invoking functions section.

## Automated tests

---

To run the automated integration tests run:

`npm run test-local`

In case you want to run the tests against a custom environment you have deployed in AWS make sure to catch the endpoints and with them at hand run:

`npm run test --stage=custom-environment --api_url={aws_generated_endpoint}`
