import { Request, Response, NextFunction } from 'express';
import { config } from './config';

export interface User {
  userName: string
  orgName: string
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  //console.log(req.oidc.idTokenClaims);
  const { iss, preferred_username } = req.oidc.idTokenClaims;
  let orgName = '';
  if (iss) {
    orgName = new URL(iss).hostname;
    let idx = orgName.indexOf('.');
    orgName = orgName.substring(0, idx);
  }
  try {
    res.json(<User>{
      userName: preferred_username,
      orgName: orgName
    });
  } catch (error) {
    next(error);
  }
};

const getWorkflowList = (action: string, method: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.oidc.accessToken?.access_token;
    const sub = req.oidc.idTokenClaims.sub;
    //console.log(req.oidc.idTokenClaims);
    const body = ['POST','PUT'].includes(method)? JSON.stringify(req.body): undefined;    
    const response = await fetch(config.oktaWorkflowEndpoint, {
      method: method,
      headers: {
        'x-api-client-token': config.oktaWorkflowToken,
        'Content-Type': 'application/json',
        'x-okta-workflow-action': action,
        'x-okta-workflow-id': req.params.id?req.params.id:"",
        'x-okta-workflow-sub': sub,
      },
      body: body
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    //console.log(result);

    res.json(result);
  } catch (error) {
    next(error);
  }
}


export const getContracts = getWorkflowList("contracts","GET");

export const getPeople  = getWorkflowList("people","GET");

export const createPerson  = getWorkflowList("create-person","POST");

export const updatePerson  = getWorkflowList("update-person","PUT");

export const getAccess  = getWorkflowList("access","GET");