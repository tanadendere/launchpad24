import "./style.css";
import { setupCounter } from "./counter.ts";
import { IKartRun } from "./models/go-dark";
import { UserWithArticle } from "./models/user";

const age: number = 5.4;
console.log(typeof age);

const name = "asasdsd";
console.log(typeof name);

const arr = [1];
arr.push(234);
console.log("here: ", arr[0]);

// :any
// :unknown ** use this one if you dont know what is coming back
// :null
// :undefined
// :string
// :number
// :boolean
// :HTMLElement
// :Date
// :number[] | Array<number>

function printName(name: String, age: number, friends: string[]): string {
  console.log(name);
  return "";
}

printName("Tana", 2, ["Yane", "Ayaaz"]);

fetch(
  "https://go-kart-api.onrender.com/runs/SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554"
)
  .then((res) => res.json())
  .then((jsonResponse: IKartRun) =>
    console.log(jsonResponse?.lapSummaries?.[0]?.["Max Speed GPS"])
  );

const aUser: UserWithArticle = {
  age: 12,
  email: "",
  id: "",
  name: "",
  surname: "",
  articles: [
    {
      author: {
        age: 12,
        email: "",
        id: "",
        name: "",
        surname: "",
      },
      body: "",
      created: new Date(),
      comments: [],
    },
  ],
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
 
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
