const fs = require("fs")
const path = require("path")

try {
    const data = fs.readFileSync(path.join(__dirname, '../datasets/data.json'),
        { encoding: 'utf8', flag: 'r' });
    
    // Display the file data
    const jsonData = JSON.parse(data)
    const mapped = jsonData.map(data => ({
        "prompt": `<${[data["Topics"]]}>`,
        "completion": `<${data["Project Title"]} ${data["Project Summary"]}>`
    }))
    
    const mappedTxt = JSON.stringify(mapped)
    const write = fs.writeFileSync(path.join(__dirname, '../datasets/test-out.json'), mappedTxt)
} catch (error) {
    console.log(error)
}