const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const Message = require("../models/Message");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: "Too many messages. Try again later." },
});

// POST /api/contact  -> saves a message in MongoDB
router.post("/", limiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, error: "All fields are required." });

    await Message.create({ name, email, message });
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    if (err.name === "ValidationError")
      return res.status(400).json({ success: false, error: err.message });
    console.error(err);
    res.status(500).json({ success: false, error: "Server error. Please try again." });
  }
});

// GET /api/contact -> read your messages (needs x-admin-key header)
router.get("/", async (req, res) => {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY)
    return res.status(401).json({ success: false, error: "Unauthorized" });
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;
