const fs = require('fs');
const files = fs.readdirSync('src/components');
files.forEach(f => {
  const content = fs.readFileSync('src/components/' + f, 'utf8');
  if (content.indexOf('\\"') !== -1) {
    console.log('Found escaped quote in src/components/' + f);
  }
});