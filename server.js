const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/:email', async function (req, res) {
  //splitting and trimming emails
  const emails = req.params.email.split(',').map((email) => email.trim());
  function getUniqueEmails(emails) {
    //removing all dots from emails
    const dotRegEx = /\./gi;
    const noDots = emails.map((email) => email.replace(dotRegEx, ''));
    //helper function to remove anything between + and @, which will be ignored
    function removeAfterPlus(email) {
      const start = email.indexOf('+');
      const end = email.indexOf('@');
      const toCut = email.substring(start, end);
      return email.replace(toCut, '');
    }
    const result = [];
    //looping through emails
    for (let i = 0; i < noDots.length; i++) {
      let email = noDots[i];
      //if email includes +, call removeAfterPlus on it and push result to array
      if (email.includes('+')) {
        result.push(removeAfterPlus(email));
        //else if email doesn't include +, it's fine and push into array as is
      } else {
        result.push(email);
      }
    }
    //using a set to eliminate any duplicates and returning size which is the number of unique email addresses
    const count = new Set(result).size;
    return count;
  }
  res.json(getUniqueEmails(emails));
});

app.listen(process.env.PORT || 8080);
