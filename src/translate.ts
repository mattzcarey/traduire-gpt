import { AI } from "./ai";

export const translate = async (
  text: string,
  apiKey: string,
  outputLanguage?: string
): Promise<string> => {
  const model = new AI(apiKey, outputLanguage);

  return await model.translate(text);
};
