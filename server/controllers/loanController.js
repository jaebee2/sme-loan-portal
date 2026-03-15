const db = require("../config/db")

exports.applyLoan = (req, res) => {
  const { business_id, amount, purpose } = req.body

  // Validate input
  if (!business_id || !amount || !purpose) {
    return res.status(400).json({ message: "All fields are required" })
  }

  // Insert loan into the database
  const query = "INSERT INTO loan_applications (business_id, amount, purpose) VALUES (?, ?, ?)"
  db.query(query, [business_id, amount, purpose], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })

    res.json({
      message: "Loan application submitted successfully",
      loan_id: results.insertId
    })
  })
}
exports.getLoanStatus = (req, res) => {
  // req.user is set by the auth middleware
  const userId = req.user.id

  // First, get the user's business
  const businessQuery = "SELECT id FROM businesses WHERE user_id = ?"
  db.query(businessQuery, [userId], (err, businessResults) => {
    if (err) return res.status(500).json({ error: err.message })
    if (businessResults.length === 0)
      return res.status(400).json({ message: "No business found for this user" })

    const businessId = businessResults[0].id

    // Get all loans for this business
    const loanQuery =
      "SELECT id, amount, purpose, status, created_at FROM loan_applications WHERE business_id = ? ORDER BY created_at DESC"

    db.query(loanQuery, [businessId], (err, loanResults) => {
      if (err) return res.status(500).json({ error: err.message })

      res.json({
        loans: loanResults
      })
    })
  })
}