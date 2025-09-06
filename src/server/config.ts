import dotenv from 'dotenv';

dotenv.config();
console.log('configured');


interface Config {
    port: number;
    nodeEnv: string|undefined;
    baseURL: string|undefined;
    issuerBaseURL: string|undefined;
    clientID: string|undefined;
    clientSecret: string|undefined;
    secret: string|undefined;
    oktaWorkflowEndpoint: string;
    oktaWorkflowToken: string;
  }
  
  export const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    baseURL: process.env.APP_BASE_URL,
    issuerBaseURL: process.env.OKTA_ISSUER,
    clientID: process.env.OKTA_CLIENT_ID,
    clientSecret: process.env.OKTA_CLIENT_SECRET,
    secret: 'ebap568bE2qt3tX#',
    oktaWorkflowEndpoint: process.env.OKTA_WORKFLOW_ENDPOINT||'http://invalid',
    oktaWorkflowToken: process.env.OKTA_WORKFLOW_TOKEN||'undefined'
  
  };
  