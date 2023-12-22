import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { langPrompt, translatePrompt } from "./prompt";

export class AI {
  private langModel: ChatOpenAI;
  private translateModel: ChatOpenAI;
  private outputLanguage?: string;
  constructor(outputLanguage?: string) {
    this.langModel = new ChatOpenAI({
      openAIApiKey: AI.getApiKey(),
      modelName: "gpt-3.5-turbo",
    });
    this.translateModel = new ChatOpenAI({
      openAIApiKey: AI.getApiKey(),
      modelName: "gpt-4",
    });
    this.outputLanguage = outputLanguage;
  }

  private static getApiKey(): string {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set in process.env");
    }

    return apiKey;
  }

  private async getLanguage(text: string): Promise<string | undefined> {
    const systemMessage = new SystemMessage(langPrompt);
    const humanMessage = new HumanMessage(text);

    const res = await this.langModel.call([systemMessage, humanMessage]);

    if (res.content == "") {
      return undefined;
    }

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

  public async translate(text: string): Promise<string | undefined> {
    const baseLanguage = await this.getLanguage(text);

    if (!baseLanguage) {
      return undefined;
    }
    const outputLanguage = this.determineOutputLanguage(
      baseLanguage,
      this.outputLanguage
    );
    const prompt = this.buildTranslatePrompt(
      baseLanguage,
      outputLanguage,
      translatePrompt
    );

    const res = await this.translateModel.call([
      new SystemMessage(prompt),
      new HumanMessage(
        `This is the text from the user, return only the translation without the enclosing quotation marks: '${text}'`
      ),
    ]);

    return res.content as string;
  }
}
