// --------------------------------------------------
//  -----   from transform(Raw,basic way)   ---------
// --------------------------------------------------
const { Transform } = require("stream")
const util = require("util")

function Upper(options) {
  // allow use without new
  if (!(this instanceof Upper)) {
    return new Upper(options)
  }

  // init Transform
  Transform.call(this, options)
}

Upper.prototype._transform = function (chunk, enc, callback) {
  // console.log(chunk.toString().toUpperCase())
  const newChunk = chunk.toString().toUpperCase()
  this.push(newChunk)
  return callback()
}

util.inherits(Upper, Transform)

// try it out
const upper = new Upper()
upper.pipe(process.stdout) // output to stdout
upper.write("hello world\n") // input line 1
upper.write("another line") // input line 2
upper.end() // finish
