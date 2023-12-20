import dotenv from "dotenv";
import { translate } from "./src/translate";

dotenv.config();

const test = async (text: string, outputLanguage?: string): Promise<string> => {
  const apiKey = process.env.OPENAI_API_KEY as string;
  return translate(text, apiKey, outputLanguage);
};

test("How is it going?", "Spanish").then((res) => console.log(res));
