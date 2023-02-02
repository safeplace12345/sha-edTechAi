const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

export default class Qna {
    constructor() {
        this.AI = new OpenAIApi(configuration)
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
            'Authorization': 'Bearer ' + "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",
            'OpenAI-Organization': 'OpenEdTech'
        },
        body: JSON.stringify({
            'prompt': `\n\nQ: ${prompt}\nA:`,
            ...this.settings
        })
    })

    async getData(query, onSuccess, onError) {
        const requestOptions = this.createRequestOptions(query)

        try {
            const res = await this.AI.createCompletion(
                { temperature: 0,
                    max_tokens: 100,
                    top_p: 1,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    stop: ["\n"],
                    'prompt': `\n\nQ: ${query}\nA:` }
                );
            // const res = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
            const { choices } = await res.json()

            onSuccess(choices[0])
            return (choices[0])
        } catch (e) {
            onError()
            console.warn(`[${this.errorCode}/GET]: ${e}`)
            return null
        }
    }
}
