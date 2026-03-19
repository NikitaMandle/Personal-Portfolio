const nodemailer = require('nodemailer');

function getTransporter() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

async function sendContactNotification(contact) {
  const transporter = getTransporter();
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!transporter || !notifyEmail) {
    return;
  }

  const submittedAt = new Date(contact.createdAt || Date.now()).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const safeSubject = contact.subject && contact.subject.trim().length
    ? contact.subject.trim()
    : 'No Subject';

  const text = [
    'New portfolio contact submission',
    '',
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Subject: ${safeSubject}`,
    `Time: ${submittedAt}`,
    '',
    'Message:',
    contact.message,
  ].join('\n');

  const html = `
    <h2>New Portfolio Contact Submission</h2>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Subject:</strong> ${safeSubject}</p>
    <p><strong>Time:</strong> ${submittedAt}</p>
    <hr />
    <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${contact.message}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || SMTP_USER,
    to: notifyEmail,
    replyTo: contact.email,
    subject: `New Contact: ${safeSubject}`,
    text,
    html,
  });
}

module.exports = { sendContactNotification };
