module.exports = function validateColumns(data, requiredColumns) {
    if (!data.length) return "Uploaded file is empty.";
  
    const fileColumns = Object.keys(data[0]);
    const missingColumns = requiredColumns.filter(col => !fileColumns.includes(col));
  
    return missingColumns.length ? `Missing required columns: ${missingColumns.join(", ")}` : null;
  };
  