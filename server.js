const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/:email', async function (req, res) {
  const emails = req.params.email.split(',').map((email) => email.trim());
  function getUniqueEmails(emails) {
    const dotRegEx = /\./gi;
    const noDots = emails.map((email) => email.replace(dotRegEx, ''));
    const result = [];
    for (let i = 0; i < noDots.length; i++) {
      let email = noDots[i];
      if (email.includes('+')) {
        result.push(removeAfterPlus(email));
      } else {
        result.push(email);
      }
    }
    function removeAfterPlus(email) {
      const start = email.indexOf('+');
      const end = email.indexOf('@');
      const toCut = email.substring(start, end);
      return email.replace(toCut, '');
    }
    const count = new Set(result).size;
    return count;
  }
  res.json(getUniqueEmails(emails));
});

app.listen(process.env.PORT || 8080);
