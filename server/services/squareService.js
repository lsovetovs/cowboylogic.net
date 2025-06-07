import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // або Environment.Production
});

export const paymentsApi = squareClient.paymentsApi;
export const checkoutApi = squareClient.checkoutApi;
export const ordersApi = squareClient.ordersApi;

export const locationId = process.env.SQUARE_LOCATION_ID;
