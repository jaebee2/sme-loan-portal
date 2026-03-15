const db = require("../config/db")

// Get all loans (with business info)
exports.getAllLoans = (req, res) => {
  const query = `
    SELECT la.id AS loan_id, la.amount, la.purpose, la.status, la.created_at,
           b.business_name, b.industry, b.years_in_operation,
           u.name AS user_name, u.email AS user_email
    FROM loan_applications la
    JOIN businesses b ON la.business_id = b.id
    JOIN users u ON b.user_id = u.id
    ORDER BY la.created_at DESC
  `
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ loans: results })
  })
}

// Approve or reject a loan
exports.updateLoanStatus = (req, res) => {
  const { loan_id, status } = req.body

  if (!loan_id || !status || !["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid loan ID or status" })
  }

  const query = "UPDATE loan_applications SET status = ? WHERE id = ?"
  db.query(query, [status, loan_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: `Loan ${status} successfully` })
  })
}

// Get all documents for a loan (for admin review)
exports.getLoanDocuments = (req, res) => {
  const { loan_id } = req.params

  const query = "SELECT id, doc_name, doc_url, uploaded_at FROM documents WHERE loan_id = ?"
  db.query(query, [loan_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ documents: results })
  })
}
