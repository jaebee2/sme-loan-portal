const db = require("../config/db")

// Register a new business
exports.registerBusiness = (req, res) => {
  const { business_name, industry, years_in_operation } = req.body
  const userId = req.user.id  // set by JWT middleware

  // Validate input
  if (!business_name || !industry || !years_in_operation) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const query =
    "INSERT INTO businesses (user_id, business_name, industry, years_in_operation) VALUES (?, ?, ?, ?)"
  db.query(
    query,
    [userId, business_name, industry, years_in_operation],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message })

      res.json({
        message: "Business registered successfully",
        business_id: results.insertId
      })
    }
  )
}

// Get business info for logged-in user
exports.getBusiness = (req, res) => {
  const userId = req.user.id

  const query = "SELECT id, business_name, industry, years_in_operation FROM businesses WHERE user_id = ?"
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (results.length === 0) return res.status(404).json({ message: "No business found" })

    res.json({
      business: results[0]
    })
  })
}