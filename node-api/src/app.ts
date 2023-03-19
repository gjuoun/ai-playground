import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const app = express()

app.get('/hello', async (req, res) => {
  res.send('Hello World!')
})

app.get('/', async(req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    temperature: 0,
    max_tokens: 7,
  });

  res.json(response.data.choices[0].text);
})

app.get('/chat', async(req, res) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Hello!",
      }
    ],
    temperature: 0
  })

  res.json(response.data);
})

app.get('/models', async (req, res) => {
 
  const models = await openai.listModels()

  res.json(models.data)
})

app.listen(3000, ()=> {
  console.log('listen on port 3000')
})