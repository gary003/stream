const JSONStream = require("JSONStream")
const fs = require("node:fs")
const { pipeline } = require("node:stream")
const through = require("through2")

const streamFile = fs.createReadStream("./src/files/post.json", { encoding: "utf8" })
const parser = JSONStream.parse("posts.*")

// ----------   With async generator -----------------------
pipeline(streamFile, parser, transf, process.stdout, (err) => console.error(err))
async function* transf(source) {
  for await (chunk of source) {
    yield JSON.stringify(chunk)
  }
}

// -----------   With through.obj and pipeline---------------
const streamFile2 = fs.createReadStream("./src/files/post.json", { encoding: "utf8" })
const parser2 = JSONStream.parse("posts.*")
pipeline(streamFile2, parser2, through.obj(write), process.stdout, (err) => console.error(err))

// -----------   With through.obj and regular pipe---------------
const streamFile3 = fs.createReadStream("./src/files/post.json", { encoding: "utf8" })
const parser3 = JSONStream.parse("posts.*")
streamFile3
  .on("error", (err) => console.log(err))
  .pipe(parser3)
  .on("error", (err) => console.log(err))
  .pipe(through.obj(write))
  .on("error", (err) => console.log(err))
  .pipe(process.stdout)
  .on("error", (err) => console.log(err))

function write(row, enc, next) {
  next(null, JSON.stringify(row))
}
