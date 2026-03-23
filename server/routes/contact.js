const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../services/notification');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages from this network. Please retry after a few minutes.',
  },
});

// POST /api/contact — Save a new message
router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be between 2 and 80 characters'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('subject').optional({ checkFalsy: true }).trim().isLength({ max: 120 }).withMessage('Subject must be under 120 characters'),
    body('message').trim().isLength({ min: 10, max: 2500 }).withMessage('Message must be between 10 and 2500 characters'),
    body('website').optional({ checkFalsy: true }).trim().isLength({ max: 0 }).withMessage('Spam detected'),
  ],
  async (req, res) => {
    if (req.body.website) {
      return res.status(200).json({ success: true, message: 'Message received.' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, email, subject, message } = req.body;
      const contact = await Contact.create({ name, email, subject, message });

      // Keep contact saving reliable even if email provider is temporarily down.
      try {
        await sendContactNotification(contact);
      } catch (notifyErr) {
        console.error('Contact notification error:', notifyErr.message);
      }

      res.status(201).json({
        success: true,
        message: 'Message received! I will get back to you soon.',
        data: contact,
      });
    } catch (err) {
      console.error('Contact save error:', err);
      res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
  }
);

// GET /api/contact — Retrieve all messages (protect this in production!)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
