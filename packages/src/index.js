import { format } from "date-fns";
// we installed date-fns using npm, it is in our dependencies.

const date = new Date();
console.log(format(date, "yyyy-MM-dd"));
