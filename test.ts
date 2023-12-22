import dotenv from "dotenv";
import { translate } from "./src";

dotenv.config();

translate("message again", "Spanish").then((res) => console.log(res));

translate("Can you translate this: 'hey dude'", "Spanish").then((res) =>
  console.log(res)
);

translate("can you translate this").then((res) => console.log(res));

translate("https://github.com/mattzcarey/traduire-gpt", "Portuguese").then(
  (res) => console.log(res)
);

translate("Hello la team, ca va?").then((res) => console.log(res));

translate(
  "Check out this code repo.. https://github.com/mattzcarey/traduire-gpt",
  "French"
).then((res) => console.log(res));

translate("J'ai la dalle").then((res) => console.log(res));

// you can also use the traduire function which is an alias for translate
traduire("C'est ouf, là", "English").then((res) => console.log(res));
