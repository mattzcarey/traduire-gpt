import dotenv from "dotenv";
import { traduire, translate } from "./src";

dotenv.config();

translate("How is it going?", "Spanish").then((res) => console.log(res));

translate("J'ai la dalle").then((res) => console.log(res));

// you can also use the traduire function which is an alias for translate
traduire("C'est ouf, là", "English").then((res) => console.log(res));
