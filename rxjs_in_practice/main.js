import { EMPTY, catchError, fromEvent, retry, switchMap, map } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import "./style.css";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { parse, formatDistance } from "date-fns";

document.querySelector("#app").innerHTML = `
  <div>
    Hello RxJs
  </div>
`;

/* separation of concern
//DOM.js
export function updateTheDOMHere(response){
  //docuemnt.
}

export function registerButton(buttonBodyCopy, clickCallback){
  
}

// api.s
export const mySubject = new Subject();
export const myAPIResponse = mySubject.pipe(switchMap(() => fromFetch('https')));

//main.js
registerButton('text', onclickHandler)

function onClickHandler(evt: Event) {
  mySubject.next(evt);
}
myAPIResponse.subscribe(response => {
  updateTheDOMHere(response);
})
*/

const observable = fromEvent(document.body, "click").pipe(
  switchMap(() =>
    fromFetch(
      "https://go-kart-api.onrender.com/runs/SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554"
    ).pipe(
      switchMap((res) => fromPromise(res.json())),
      map((json) => ({
        summary: `${json.trackName} - ${json.sessionName} - ${json.driver}`, //remember safety checks!!
        dateTime: parse(
          json.date + " " + json.time,
          "dd-MM-yyyy HH:mm",
          new Date()
        ),
      })),
      catchError((error) => {
        console.log("JSON Parse Fail", error);
        return EMPTY;
      })
    )
  ),
  retry(2),
  catchError((error) => {
    console.log("API Call Fail", error);
    return EMPTY;
  })
);
observable.subscribe(
  (res) =>
    (document.body.innerHTML = `${res.summary}<br>${formatDistance(
      res.dateTime,
      Date.now(),
      { addSufix: true }
    )}`)
);

// observable2.subscribe((res) => console.log(res));

/*
  "trackName": "IDUBE RACEWAY",
  "sessionName": "PRACTICE",
  "serial": "2780",
  "date": "21-07-2022",
  "time": "11:00",
  "driver": "NADINE",
  "vehicleClass": "SSS",
 */
