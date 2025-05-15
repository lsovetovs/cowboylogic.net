import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendContactEmail = async ({ firstName, lastName, email, comment }) => {
  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Form Submission",
    html: `
      <h3>New message from ${firstName} ${lastName}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${comment}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// ✅ НОВА ФУНКЦІЯ
export const sendOrderConfirmationEmail = async ({ to, order, items }) => {
  const itemList = items
    .map(item => `<li>${item.quantity} × ${item.Book.title} @ $${item.Book.price}</li>`)
    .join("");

  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
    to,
    subject: "Your Order Confirmation",
    html: `
      <h2>Thank you for your order!</h2>
      <p>Your order <strong>#${order.id}</strong> has been confirmed.</p>
      <h3>Order Details:</h3>
      <ul>${itemList}</ul>
      <p><strong>Total:</strong> $${order.totalPrice}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
