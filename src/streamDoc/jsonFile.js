const JSONStream = require("JSONStream")
const fs = require("node:fs")
const { pipeline } = require("node:stream")
const through = require("through2")

const streamFile = fs.createReadStream("./src/files/post.json", { encoding: "utf8" })
const parser = JSONStream.parse("posts.*")

// with async generator
pipeline(streamFile, parser, transf, process.stdout, (err) => console.error(err))
async function* transf(source) {
  for await (chunk of source) {
    yield JSON.stringify(chunk)
  }
}

// With through.obj
pipeline(streamFile, parser, through.obj(write), process.stdout, (err) => console.error(err))
function write(row, enc, next) {
  next(null, JSON.stringify(row))
}
