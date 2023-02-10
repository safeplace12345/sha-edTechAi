const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const response = async () => {
    const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "\n\nQ: Where is google?\nA:",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
    })
    console.log(await res.data.choices)
};
/**
 * Call tests with node js for now 
 */
response()