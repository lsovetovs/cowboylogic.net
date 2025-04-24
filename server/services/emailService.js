import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true, // ✅ якщо порт 465
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
