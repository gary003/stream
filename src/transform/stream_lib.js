// --------------------------------------------------
//  -----   transform from stream lib way   ---------
// --------------------------------------------------
const { pipeline, Transform } = require("stream")
const { Stream } = require("stream")

// You can't use the ES6 syntaxe because of the keyword 'this'
const transf = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    // console.log(chunk.toString())
    callback(null, chunk.toString().toUpperCase() + "\n")
  }
})

const readStream2 = Stream.Readable.from("HellO my WorlD!!".split(" "))

pipeline(readStream2, transf, process.stdout, (err) => console.error(err))
