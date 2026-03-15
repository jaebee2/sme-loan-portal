const express = require("express")
const cors = require("cors")
const loanRoutes = require("./routes/loanRoutes")
const authRoutes = require("./routes/authRoutes")
const businessRoutes = require("./routes/businessRoutes")
const documentRoutes = require("./routes/documentRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/loans", loanRoutes)
app.use("/api/business", businessRoutes)
app.use("/uploads", express.static("uploads"))

app.use("/api/documents", documentRoutes)

app.get("/", (req, res) => {
  res.send("SME Loan API Running")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})