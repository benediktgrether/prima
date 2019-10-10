console.log("Hello World");
// Müssen wir immer die Variablen Deklaration mitgeben?
// oder ist es für uns, für die leichtere Lesbarkeit?
var stringOutput = "!Hello World!";
// Was sind die 2 Unterschiede?
var listNumber = [1, 2, 3];
var listArrayNumber = [1, 2, 3];
var tupelArray = ["Chris", 22];
// enums
var Color;
(function (Color) {
    Color[Color["Red"] = 5] = "Red";
    Color[Color["Green"] = 6] = "Green";
    Color[Color["Blue"] = 7] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
// Test für die Deklaration
var a;
a = "Hello World!";
var b;
b = 12;
//  b = a;
// Multitype
var multiType;
multiType = 20;
multiType = true;
window.addEventListener("load", handleLoad);
function handleLoad(_event) {
    document.body.innerHTML = stringOutput;
    //  document.body.innerHTML = c.toString();
}
