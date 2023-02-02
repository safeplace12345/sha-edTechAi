const { Configuration, OpenAIApi } = require("openai");

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
            'Authorization': 'Bearer ' + process.env.API_KEY || "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"
        },
        body: JSON.stringify({
            'prompt': `\n\nQ: ${prompt}\nA:`,
            ...this.settings
            })
    })

    async getData(query, onSuccess, onError) {
        const requestOptions = this.createRequestOptions(query)

        try {
            const res = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
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
