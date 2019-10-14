module.exports = {
  parseToCsv
}

/**
 * Parse an input in NACHA format structure to a CSV file.
 *
 * @param {*} input The input text in NACHA format structure.
 */
function parseToCsv(input) {
  // The output initialized with the headers of CSV file
  let output = '"BuyerID","BuyerName","SupplierID","SupplierName","InvoiceNumber","InvoiceDate","PaymentID","InvoiceAmount","DiscountAmount","PaymentAmount","Note"\n';

  // The values that was shared with more than one line
  let buyerName = '';
  let buyerID = '';
  let invoiceDate = '';
  let supplierId = '';
  let supplierName = '';
  let paymentId = '';

  // For each line of input, treat the values, based on the type of code
  input.split('\n').forEach(inp => {
    if (inp && inp.length > 0) {
      if (!validateLine(inp)) throw new Error();
      const type = inp[0];

      if (type === '1') { // If the line is a File Header Record (Type 1)
        buyerID = inp.substring(13, 23).replace(',', '').trim();
        buyerName = inp.substring(63, 86).replace(',', '').trim();
      } else if (type === '5') { // If the line is a Batch header record (Type 5)
        const invoiceDateNotFormatted = inp.substring(63, 69).replace(',', '').trim();
        invoiceDate = `${invoiceDateNotFormatted.substring(2, 4)}/${invoiceDateNotFormatted.substring(4, 6)}/20${invoiceDateNotFormatted.substring(0, 2)}`;
      } else if (type === '6') { // If the line is a Entry Detail Record (Type 6)
        supplierId = inp.substring(39, 54).replace(',', '').trim();
        supplierName = inp.substring(54, 76).replace(',', '').trim();
        paymentId = inp.substring(79, 94).replace(',', '').trim();
      } else if (type === '7') { // If the line is a Addenda Record (Type 7)
        const note = inp.substring(3, 83).replace(',', '').trim();
        const invoiceNumber = note.substring(0, note.lastIndexOf(' '));
        const invoiceAmount = note.substring(note.lastIndexOf(' ') + 1);
        const discountAmount = '0.00'; // TODO: This value was not documented in the PDF.
        output +=
          `"${buyerID}","${buyerName}","${supplierId}","${supplierName}","${invoiceNumber}","${invoiceDate}","${paymentId}","${invoiceAmount}","${discountAmount}","${invoiceAmount}","${note}"\n`;
      }
    }
  })

  return output;
}

/**
 * Validate an entry line in the NACHA format file.
 *
 * @param {*} line An entry in the NACHA format file.
 */
function validateLine (line) {
  const validTypes = ['1', '5', '6', '7', '8', '9']
  return (line.length === 94) && (validTypes.indexOf(line[0]) !== -1)
}
