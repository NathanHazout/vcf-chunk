let fs = require('fs');
let vCard = require( 'vcf' );
let encodingIn = 'utf8';
let encodingOut = 'utf8';
const MAX_BYTES = 20000000;

fs.readFile('contacts.vcf', encodingIn, (err, data) => {
    if (err) throw err;
    
    let cards = vCard.parse( data );
    console.log(cards.length);

    let part = 1;
    let currentSize = 0; 
    let currentCount = 0;  

    for(let card of cards){
      let text = card.toString() + '\n';
      let size = Buffer.byteLength(text, encodingOut);
      if(currentSize + size > MAX_BYTES){
        // New file
        console.log(`Part ${part} contains ${currentCount} items for ${currentSize} bytes`);
        part++;
        currentSize=0;
        currentCount=0;
      }
      let filename = `part${part}.vcf`;
      fs.appendFileSync(filename, text, encodingOut);
      currentSize += size;
      currentCount++;
    }
    console.log(`Part ${part} contains ${currentCount} items for ${currentSize} bytes`);

  });