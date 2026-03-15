const express = require("express")
const router = express.Router()
const { applyLoan } = require("../controllers/loanController")
const protect = require("../middleware/authMiddleware")

// Protected route for applying for a loan
router.post("/apply", protect, applyLoan)

module.exports = router
router.get("/status", protect, getLoanStatus)