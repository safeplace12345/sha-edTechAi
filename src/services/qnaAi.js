const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default class Qna {
    constructor() {
        this.AI = null
        this.model = "text-davinci-003"
        this.settings = {
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        }
        this.errorCode = 'AI'
    }
    
    createRequestOptions = (prompt) => ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + "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"
        },
        body: JSON.stringify({
            'prompt': `\n\nQ: ${prompt}\nA:`,
            ...this.settings
            })
    })

    async getData(query, onSuccess, onError) {
        const requestOptions = this.createRequestOptions(query)

        try {
                const res = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: `\n\nQ: ${query}\nA:`,
                    temperature: 0,
                    max_tokens: 100,
                    top_p: 1,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    stop: ["\n"],
                })
            // const res = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
            const { choices } = await res.data
            onSuccess(choices[0])
            return (choices[0])
        } catch (e) {
            onError()
            console.warn(`[${this.errorCode}/GET]: ${e}`)
            return null
        }
    }
}
