import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { Router, Request, Response, NextFunction } from 'express';
import { auth } from 'express-openid-connect';
import {config} from './config';
import { getUser, getContracts, getPeople, getAccess, createPerson, updatePerson } from './controller';
//https://blog.logrocket.com/express-typescript-node/
//https://developer.okta.com/blog/2025/07/28/express-oauth-pkce
//https://github.com/okta-samples/okta-express-sample


//router
const router = Router();


router.get('/user', getUser);
router.get('/contracts', getContracts);
router.get('/people', getPeople);
router.post('/people', createPerson);
router.put('/people/:id', updatePerson);
router.get('/access', getAccess);

//router.get('/:id', getItemById);
//router.post('/', createItem);
//router.put('/:id', updateItem);
//router.delete('/:id', deleteItem);


//error
interface AppError extends Error {
  status?: number;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

//app
const app = express();

const oktaConfig = {
  authRequired: true,
  auth0Logout: false,
  baseURL: config.baseURL,
  issuerBaseURL: config.issuerBaseURL,
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  secret: config.secret,
  authorizationParams: {
    response_type: 'code', // This requires you to provide a client secret
    scope: 'openid profile email',
  }
};

app.use(auth(oktaConfig));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', router);

//server
// Global error handler (should be after routes)
app.use(errorHandler);

app.all('/{*any}', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});