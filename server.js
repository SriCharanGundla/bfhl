const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// API endpoint for GET requests
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// API endpoint for POST requests
app.post("/bfhl", (req, res) => {
  try {
    const requestData = req.body.data;
    const is_success = true;
    const fullName = "sri_charan_gundla";
    const userId = "sri_charan_gundla_26102002";
    const email = "sricharan.gundla2020@vitstudent.ac.in";
    const rollNumber = "20BKT0149";

    const parsedData = requestData.map((item) => {
      if (!isNaN(String(item) * 1)) {
        return Number(item);
      } else {
        return item; 
      }
    });

    const numbers = parsedData.filter((item) => typeof item === "number");
    const alphabets = parsedData.filter(
      (item) => typeof item === "string" && item.length === 1
    );

    const sortedAlphabets = alphabets.sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }));

    const highestAlphabet = sortedAlphabets.length == 0 ? [] : sortedAlphabets[0];

    const numString = numbers.map((item) => String(item));

    const response = {
      is_success: is_success,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      numbers: numString,
      alphabets: alphabets,
      highest_alphabet: [highestAlphabet],
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
