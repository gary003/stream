const { pipeline, Readable } = require("node:stream")

const fruitsStr = "mango,apple,pear,banana,orange,ananas,starFruit"

const fruitsArr = fruitsStr.split(",")

const streamFruits = Readable.from(fruitsArr)

// filter only works on stream.Readable !
const longNameFruitsStream = streamFruits.filter((name) => name.length > 5)

const capitalizeFruitsStream = longNameFruitsStream.map((name) => name[0].toUpperCase() + name.slice(1))

pipeline(capitalizeFruitsStream, process.stdout, (err) => console.error(err))
