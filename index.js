let fs = require('fs');
let vCard = require( 'vcf' );
let encodingIn = 'utf8';
let encodingOut = 'ucs2';

fs.readFile('contacts.vcf', encodingIn, (err, data) => {
    if (err) throw err;
    
    let cards = vCard.parse( data );
    console.log(cards.length);

    perChunk = 85 // items per chunk    

    inputArray = cards;
    
    let chunks = inputArray.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/perChunk)
    
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
    
      resultArray[chunkIndex].push(item)
    
      return resultArray
    }, [])
    
    console.log(chunks.length);

    let part = 1;
    for(let chunk of chunks){
        let filename = `part${part}.vcf`;

        let data = '';
        for(let card of chunk){
            data += card.toString();
            data += '\n'; 
        }
        fs.writeFile(filename, data, encodingOut);

        part++;
    }

  });