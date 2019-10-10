console.log("Hello World");

// Müssen wir immer die Variablen Deklaration mitgeben?
// oder ist es für uns, für die leichtere Lesbarkeit?
let stringOutput: string = "!Hello World!";

// Was sind die 2 Unterschiede?
let listNumber: number[] = [1, 2, 3];
let listArrayNumber: Array<number> = [1, 2, 3];

let tupelArray: [string, number] = ["Chris", 22];

// enums

enum Color {
  Red = 5,
  Green,
  Blue
}

let c: Color = Color.Green;

// Test für die Deklaration
let a: string;
a = "Hello World!";

let b: number;
b = 12;
//  b = a;

// Multitype
let multiType: number | boolean;
multiType = 20;
multiType = true;

window.addEventListener("load", handleLoad);

function handleLoad(_event: Event): void {
  document.body.innerHTML = stringOutput;
  //  document.body.innerHTML = c.toString();
}
