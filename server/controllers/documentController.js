const db = require("../config/db")
const path = require("path")

// Upload a document for a loan
exports.uploadDocument = (req, res) => {
  const { loan_id } = req.body
  const file = req.file

  if (!loan_id || !file) {
    return res.status(400).json({ message: "Loan ID and file are required" })
  }

  const doc_name = file.originalname
  const doc_url = `/uploads/${file.filename}`

  const query =
    "INSERT INTO documents (loan_id, doc_name, doc_url) VALUES (?, ?, ?)"
  db.query(query, [loan_id, doc_name, doc_url], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })

    res.json({
      message: "Document uploaded successfully",
      document_id: results.insertId,
      doc_url
    })
  })
}

// Get all documents for a loan
exports.getDocuments = (req, res) => {
  const { loan_id } = req.params

  const query = "SELECT id, doc_name, doc_url, uploaded_at FROM documents WHERE loan_id = ?"
  db.query(query, [loan_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ documents: results })
  })
}