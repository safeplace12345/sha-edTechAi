const openai = require("openai")

const response = openai.createCompletion({
    model: "ft-ODX5jjTQgsigZcX4ZFLLG6Ho",
    prompt: "<Partnerships for vocational education and training>"
});
console.log(response)