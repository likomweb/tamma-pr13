const fs = require('fs');
['fr.ts', 'en.ts', 'ar.ts'].forEach(file => {
  const p = 'src/lib/translations/' + file;
  if (fs.existsSync(p)) {
    let text = fs.readFileSync(p, 'utf8');
    text = text.replace(/28" -/g, "28'' -");
    text = text.replace(/28"/g, "28''");
    fs.writeFileSync(p, text, 'utf8');
  }
});
console.log('Fixed translations quotes!');