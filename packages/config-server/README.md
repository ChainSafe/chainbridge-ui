# JSON config server for AWS
Simple nodejs server app which pulls the config from SSM and provides it as JSON
## Deployment 
Environment variables for AWS:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_SESSION_TOKEN

Environment variables for configuration nodejs application:

- HOST=localhost (could be any other host)
- PORT=8000
- SSM_PARAMETER_NAME=/chainbridge/chainbridge-ui-local (i’ve created test parameter in SSM but it could any other new param like /chainbridge/chainbridge-ui-prod or such)
