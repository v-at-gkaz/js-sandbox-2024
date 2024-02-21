const art = require('ascii-art');

art.font('Hello,    123465     World!', 'Doom', (err, text) => {
   if(err) return;
   console.log(text);
});