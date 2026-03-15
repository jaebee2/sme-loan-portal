const express = require("express")
const router = express.Router()
const multer = require("multer")
const protect = require("../middleware/authMiddleware")
const { uploadDocument, getDocuments } = require("../controllers/documentController")

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
})
const upload = multer({ storage })

// Upload a document
router.post("/upload", protect, upload.single("document"), uploadDocument)

// Get all documents for a loan
router.get("/:loan_id", protect, getDocuments)

module.exports = router