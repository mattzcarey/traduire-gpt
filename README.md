# Traduire GPT

Translate GPT / Traduire GPT is an npm package that allows you to translate text easily from one language to another easily while keeping the same tone and style.

Under the hood it uses the OpenAI API and runs with a bring your own API key model.

Pick an output language or leave it blank to translate to English. If the text is in English, Traduire GPT will translate to French.

## Installation

```bash
npm install traduire-gpt
```

or

```bash
pnpm i traduire-gpt
```

## Usage

```js
import { translate } from "traduire-gpt";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const text = "J'ai la dalle.";

translate(text, apiKey).then((res) => {
  console.log(res);
});

// Output: I'm starving.

const text2 = "Hello, my name is John Doe and I am a software engineer.";

translate(text2, apiKey).then((res) => {
  console.log(res);
});

// Output: Bonjour, je m'appelle John Doe et je suis ingénieur logiciel.

const text3 = "How are is it going?";

translate(text3, apiKey, "Spanish").then((res) => {
  console.log(res);
});

// Output: ¿Cómo va todo?
```

## Local testing/development

We have made a few tests to make sure the package works as expected. You can run them locally by cloning the repo and running the following commands:

```bash
git clone <the repo url>

cd traduire-gpt

pnpm test
```

You can modify the tests in `tests.ts` to test different scenarios.

## Roadmap

- [ ] Add more tests
- [ ] Include tests for non arabic lettering languages
