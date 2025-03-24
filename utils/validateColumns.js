const moment = require("moment")
const dayjs = require("dayjs");

module.exports = function validateColumns(data, requiredColumns) {
    if (!data.length) return "Uploaded file is empty.";

    let errors =[];

    data.forEach((row,index)=>{
      let rowNum = index +2;

      requiredColumns.forEach((col)=>{
        if(!row[col] || row[col].toString().trim()===""){
          errors.push(`Row Number ${rowNum}: is Missing ${col} `)
        }
      })

      if (row["Origin Port"] && !/^[A-Za-z\s]+$/.test(row["Origin Port"])) {
        errors.push(`Row ${rowNum}: "Origin Port" contains invalid characters.`);
      }
      if (row["Destination Port"] && !/^[A-Za-z\s]+$/.test(row["Destination Port"])) {
        errors.push(`Row ${rowNum}: "Destination Port" contains invalid characters.`);
      }
      if(row["Ocean Freight Rate"] && Number(row["Ocean Freight Rate"]) <= 0){
        errors.push(`Row Number ${rowNum}: "Ocean Freight Rate can not have negative values" `)
      }
      if (row["Effective Date"] && !dayjs(row["Effective Date"], "YYYY-MM-DD", true).isValid()) {
        errors.push(`Row ${rowNum}: "Effective Date" is not a valid `);
      }
    })
  
    return errors.length > 0 ? errors : null;
  };
  