const express = require("express")
const router = express.Router()
const { registerBusiness, getBusiness } = require("../controllers/businessController")
const protect = require("../middleware/authMiddleware")

// Register a new business
router.post("/register", protect, registerBusiness)

// Get logged-in user's business info
router.get("/", protect, getBusiness)

module.exports = router