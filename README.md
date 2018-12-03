# VCF Chunk

Split a large VCF (vCard) into smaller chunks.

This program was written for a personal problem: I have about 700 contacts in my macOS Contacts that I want to upload to Google Contacts.

Apple Contacts exported a 70MB vcf file, but Google only allows up to 20MB. This code split the file into chunks of contacts.

## How-to

- Run `npm install`
- Put a file `contacts.vcf` into the working directory.
- Configure the number of contacts per file in index.js (`perChunk = 85 // items per chunk `)
- Run `node index.js`

The result is supposed to be a series of files named `part1.vcf`, etc.

## ISC License

Do as you wish.
