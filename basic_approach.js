// Understanding token limitations to leveraging vector 
// stores and map-reduce techniques, we'll guide you step-by-step.

import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { ChatOpenAI } from 'langchain/chat_models/openai';

const small_page_1k = 'https://python.langchain.com/docs/get_started/introduction';
const bigger_page_5k = 'https://en.wikipedia.org/wiki/LangChain';
const huge_page_10k = 'https://lilianweng.github.io/posts/2023-06-23-agent/';
const gigantic_page_50k = 'https://en.wikipedia.org/wiki/World_War_II';

const llm_4k = 'gpt-3.5-turbo';
const llm_8k = 'gpt-4';
const llm_16k = 'gpt-3.5-turbo-16k';

const llm = new ChatOpenAI ({
    callbacks: [
        {
            handleLLMEnd: (output, runID, parentRunID, tags) => {
                if (output && output.llmOutput && output.llmOutput.tokenUdage) {
                    console.log('Total Tokens Used: ${output.llmOutput.tokenUsage.TotalTokens}')
                }
            },
        },
    ],
    modelName: llm_16k,
});

const loader = new CheerioWebBaseLoader(small_page_1k);
const data = await loader.load();

const query = 'Please summarize the following data: ${data[0].pageContent';
const result = await llm.predict(query);

console.log(result);