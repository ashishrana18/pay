import express from "express";
import cors from "cors";
import * as XLSX from "xlsx/xlsx.mjs";
import { readFileSync } from "fs";
import { read } from "xlsx/xlsx.mjs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({ origin: `exp://${process.env.IP_ADDRESS}` }));

app.get("/", (req, res) => {
  try {
    const buf = readFileSync("/Users/ashish/Desktop/payLOG/backend/paytm.xlsx");
    const workbook = read(buf, { type: "buffer" });

    // 1. Get the second sheet name (index 1)
    const secondSheetName = workbook.SheetNames[1];

    // 2. Error handling if the second sheet doesn't exist
    if (!secondSheetName) {
      return res
        .status(404)
        .json({ error: "Second tab not found in Excel file" });
    }

    const worksheet = workbook.Sheets[secondSheetName];

    // 3. Convert that specific worksheet to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet);

    // 4. Map to your schema
    const clubbedData = rawData.reduce((acc, transaction) => {
      const date = transaction.Date; // e.g., "16/02/2026"

      // If the date doesn't exist in our object yet, create an empty array
      if (!acc[date]) {
        acc[date] = {
          transactions: [],
          totalSpent: 0,
          totalReceived: 0,
        };
      }

      // Push the current transaction into that date's array
      acc[date].transactions.push(transaction);

      // Optional: Clean the amount string and track daily totals
      const amount = parseFloat(transaction.Amount.replace(/,/g, ""));
      if (amount < 0) {
        acc[date].totalSpent += Math.abs(amount);
      } else {
        acc[date].totalReceived += amount;
      }

      return acc;
    }, {});

    res.json(clubbedData);
  } catch (error) {
    console.error("Error reading excel file:", error);
    res
      .status(500)
      .json({ error: "Failed to read excel file", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
