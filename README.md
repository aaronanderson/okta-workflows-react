**Okta® is the registered trademark of Okta, Inc. This project is not affiliated with Okta, Inc. and Okta, Inc. does not endorse this project.**

# Example Okta Workflow Front End React Application

This is a sample React application utlizing the [Okta Odyssey](https://github.com/okta/odyssey) UI framework running on [Express](https://expressjs.com/) and secured by Okta OIDC that  interacts with an [Okta workflow](https://help.okta.com/wf/en-us/content/topics/workflows/function-reference/http/http_accept.htm) to perform advanced identity management operations.

In certain circumstances it may be necessary to supplement Okta with complex data visualizations, contextual data entry, or advanced data validations. Here are some possible implementations:

- Advanced OIG Access Request data entry
- Vendor Account Management
- Manager Self-Service of Direct Report Accounts
- Okta System Log Custom Reporting and Vizualizations

> [!CAUTION]
> Okta workflows are intended to be used as a no-code backend integration technology and not a frontend low latency high volume UI framework.  
> Based on load, performance, and complexity in many cases it is preferable for the application server to directly interface with the Okta API and other Cloud framework APIs instead retrieving data from Okta workflows.

## Okta Configuration

Log into the Okta admin console

### OIDC Application

1. Open the Okta admin console

1. From the Applications menu, click the "Create App Integration" button. Select `OIDC - OpenID Connect` and `Web Application` 

1. Name the application `Contractor Management`

1. Set the Sign-in redirect URIs to `http://localhost:3000/callback`

1. Set the Sign-out redirect URIs to `http://localhost:3000`

1. Set Login initiated by to `Either Okta or App`
   
1. Set Login flow to `Redirect to app to initiate login `   
   
1. Set the Initiate login URI to `http://localhost:3000` 

1. Save the Client ID, Client Secret, 


### Okta Workflows

1. Open the Okta Workflows application
   
2. Create a new Okta workflows folder named "Contract Management"

3. Import the `workflow/contractManagement.folder` file

4. On the Contract Management tables tab, select each table and import in the sample workflow CSV files.
   
5. On the Contract Management flows tab, activate each workflow. 

6. View the '100 - Contract Management API' workflow and on the API Endpoint card click on the Enpoint Settings and capture the 'Invoke URL' and 'Client token' values.
   

## Build

1. Edit the .env file and update it with the Okta OIDC and workflows configuration settings

2. Run the following commands:

```
yarn install
yarn build
```

## Development

1. Build the Express server and browser application
   
`yarn build`

2. Start the Express server
   
`yarn start`

1. In a browser, access `http://localhost:3000`, authenticate to Okta, and verify the application loads.

1. Start the development server

`yarn web-start`

1. In a browser, access `http://localhost:4000` and verify the application loads. Apply code changes and confirm the development server automatically reloads.

1. Code changes in the src/server directory require rebuilding and restarting the Express server.

```
yarn server-build
yarn start
```


## Azure Deployment

[Guide](https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-cli)

1. Initial Deployment

`az webapp up --sku F1 --name acme-okta-contract-management`

1. Deploy Updates

`az webapp up`

1. Monitor Logs

`az webapp log tail`