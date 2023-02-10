const fs = require("fs")
const path = require("path")

const data = fs.readFileSync(path.join(__dirname, '../datasets/test.json'),
    { encoding: 'utf8', flag: 'r' });

// Display the file data
const jsonData = JSON.parse(data)

const mapped = jsonData.map(data => ({
    [`<${[data["Key Action"]]} ${[data["Action Type"]]}>`]: `<${data["Project Title"]} ${data["Project Summary"]}>`
}))

const mappedTxt = JSON.stringify(mapped)
const write = fs.writeFileSync(path.join(__dirname, '../datasets/test-out.json'), mappedTxt)