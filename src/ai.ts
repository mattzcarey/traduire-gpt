import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { langPrompt, translatePrompt } from "./prompt";

export class AI {
  model: ChatOpenAI;
  outputLanguage?: string;
  constructor(apiKey: string, outputLanguage?: string) {
    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: "gpt-4",
      temperature: 0.1,
    });
    this.outputLanguage = outputLanguage;
  }

  private async getLanguage(text: string): Promise<string> {
    const systemMessage = new SystemMessage(langPrompt);
    const humanMessage = new HumanMessage(text);

    const res = await this.model.call([systemMessage, humanMessage]);

    return res.content as string;
  }

  private determineOutputLanguage(
    baseLanguage: string,
    outputLanguage?: string
  ): string {
    if (outputLanguage) {
      return outputLanguage;
    }

    if (baseLanguage === "English") {
      return "French";
    }

    return "English";
  }

  private buildTranslatePrompt(
    baseLanguage: string,
    outputLanguage: string,
    translatePrompt: string
  ): string {
    return translatePrompt
      .replace("{baseLanguage}", baseLanguage)
      .replace("{outputLanguage}", outputLanguage);
  }

  public async translate(text: string): Promise<string> {
    const baseLanguage = await this.getLanguage(text);
    const outputLanguage = this.determineOutputLanguage(
      baseLanguage,
      this.outputLanguage
    );
    const prompt = this.buildTranslatePrompt(
      baseLanguage,
      outputLanguage,
      translatePrompt
    );

    const res = await this.model.call([
      new SystemMessage(prompt),
      new HumanMessage(text),
    ]);

    return res.content as string;
  }
}
