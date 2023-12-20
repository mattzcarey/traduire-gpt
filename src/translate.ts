import { AI } from "./ai";

export const translate = async (
  text: string,
  outputLanguage?: string
): Promise<string> => {
  const model = new AI(outputLanguage);

  return await model.translate(text);
};
