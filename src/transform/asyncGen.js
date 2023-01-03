//--------------------------------------
// ------   since nodeJS v14   ---------
// -------------------------------------

/* !!!!! spawn uses streams and no shell (good security),
   while exec uses a buffer , a shell and a lot of memory */
const { pipeline, Stream } = require("stream")
const fs = require("fs")

const readStream = Stream.Readable.from(["one", "tWo", "thrEE"])

/* beware , the key word 'yield' must be in a 'for of' loop 
      not a '.forEach(() => ...)' */
const transformGenerator = async function* (source) {
  for await (const val of source) {
    // console.log(val.toString())
    const vv = val.toString("utf8").split(" ")
    // console.log(vv)
    for (const v of vv) {
      // console.log(v)
      yield v + ":"
    }
  }
}

/* !! to use an async function as a transform (made with a generator) stream ,
      you must use 'pipeline' not 'pipe' */
pipeline(readStream, transformGenerator, process.stdout, (err) => console.error(err))
