import dotenv from "dotenv";
import { translate } from "./src/translate";

dotenv.config();

const test = async (text: string, outputLanguage?: string): Promise<string> => {
  return translate(text, outputLanguage);
};

test("How is it going?", "Spanish").then((res) => console.log(res));

test("J'ai la dalle").then((res) => console.log(res));
