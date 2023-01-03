// ----------------------------
//  -----   old way   ---------
// ----------------------------
const through = require("through2")
const fs = require("fs")
const { join } = require("path")

// You can't use the ES6 syntaxe because of the keyword 'this'
const transformStream = through(function (chunk, encoding, next) {
  console.log(chunk.toString())
  this.push(`-- ${chunk.toString()}`)
  next()
})

const readS = fs.createReadStream(join(__dirname, "..", "files/lorem.txt"))
const writeS = fs.createWriteStream(join(__dirname, "..", "files/lolorem.txt"))

readS.pipe(transformStream).pipe(writeS)
