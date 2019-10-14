var fs = require('fs');
var service = require('../services/nachaService');

module.exports = {
  getCsvFormatted
}

/**
 * Get the CSV formatted in the NACHA File Format.
 *
 * @param {*} req
 *  body: {
 *    input: The file in NACHA format structure.
 *  }
 * @param {*} res A CSV file formatted.
 */
function getCsvFormatted(req, res) {
  req.file('input')
    .upload({},
      function whenDone(err, uploadedFiles) {
        if (err) return res.serverError(err);
        else {
          fs.readFile(uploadedFiles[0].fd, 'utf8', function (err, data) {
            if (err) return res.serverError(err);

            // Parse the input
            let content = ''
            try {
              content = service.parseToCsv(data);
            } catch (err) {
              return res.badRequest('The format of input is invalid.');
            }

            // Set the Header and return the CSV file
            res.set('Content-Type', 'text/csv');
            return res.send(content);
          });
        }
      });
}
