const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const validateColumns = require("../utils/validateColumns");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: "Uploaded file not found" });
    }

    let workbook;
    try {
      workbook = xlsx.readFile(filePath);
    } catch (err) {
      console.error("Error reading file:", err.message);
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "Invalid or corrupted file" });
    }

    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "Nothing found in the file" });
    }

    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    if (!sheetData.length) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "File is empty" });
    }

    const requiredColumns = [
      "Origin Port",
      "Destination Port",
      "Container Type",
      "Ocean Freight Rate",
      "Carrier",
      "Effective Date",
    ];

    const validationError = validateColumns(sheetData, requiredColumns);
    if (validationError) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: validationError });
    }


    res.status(200).json({
      message: "File uploaded and processed successfully",
      data: sheetData.slice(0, 5), 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing file" });
  }
};
let ExcelData =[];

exports.DynamicColumn = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.filename);
    const sheetName = workbook.sheetName[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

    if (jsonData.length === 0) {
      return res.status(400).json({ error: "The Excel File is Empty" });
    }

    ExcelData = jsonData;

    const mappedData = ExcelData.map((row) => {
      let mappedRow = {};

      for (let col in row) {
        const mappedKey = columnMapping[col.trim()];
        if (mappedKey) {
          mappedRow[mappedKey] = row[col];
        }
      }
      return mappedRow;
    });

  } catch (error) {
    res.status(500).json({ error: "An error occurred" }); 
  }
};

