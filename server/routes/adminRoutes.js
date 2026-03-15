const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
const {
  getAllLoans,
  updateLoanStatus,
  getLoanDocuments
} = require("../controllers/adminController")

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" })
  }
  next()
}

// Admin routes
router.get("/loans", protect, isAdmin, getAllLoans)
router.post("/loans/status", protect, isAdmin, updateLoanStatus)
router.get("/loans/:loan_id/documents", protect, isAdmin, getLoanDocuments)

module.exports = router