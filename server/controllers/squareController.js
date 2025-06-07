import { checkoutApi, locationId } from '../services/squareService.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import crypto from 'crypto';

const createPaymentHandler = async (req, res) => {
  const { bookId, title, price, userId } = req.body;

  try {
    const response = await checkoutApi.createCheckout(locationId, {
      idempotencyKey: crypto.randomUUID(),
      order: {
        order: {
          locationId,
          lineItems: [
            {
              name: title,
              quantity: '1',
              basePriceMoney: {
                amount: Math.round(price * 100),
                currency: 'USD',
              },
            },
          ],
        },
      },
      metadata: {
        userId: String(userId),
        bookId: String(bookId),
      },
      redirectUrl: 'http://localhost:5173/success',
    });

    res.json({ checkoutUrl: response.result.checkout.checkoutPageUrl });
  } catch (err) {
    console.error('💥 Square error:', err);
    throw HttpError(500, 'Failed to create payment');
  }
};

export const createPaymentLink = ctrlWrapper(createPaymentHandler);

