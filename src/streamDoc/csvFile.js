const csv = require("csvtojson")
const fs = require("node:fs")
const { pipeline } = require("node:stream")

const streamFile = fs.createReadStream("/home/gary/devs/typescript/streams/src/files/bd-dec21-age-specific-fertility-rates.csv")

const transform = async function* (source) {
  for await (chunk of source) {
    // console.log("=> \n" + JSON.stringify(chunk))
    yield JSON.stringify(chunk)
  }
}

pipeline(streamFile, csv({ delimiter: "," }, { objectMode: true }), transform, process.stdout, (err) => console.err)
