"use strict";
var L01_HelloWorld;
(function (L01_HelloWorld) {
    console.log("Hello World");
    // Müssen wir immer die Variablen Deklaration mitgeben?
    // oder ist es für uns, für die leichtere Lesbarkeit?
    let stringOutput = "!Hello World!";
    // Was sind die 2 Unterschiede?
    let listNumber = [1, 2, 3];
    let listArrayNumber = [1, 2, 3];
    let tupelArray = ["Chris", 22];
    // enums
    let Color;
    (function (Color) {
        Color[Color["Red"] = 5] = "Red";
        Color[Color["Green"] = 6] = "Green";
        Color[Color["Blue"] = 7] = "Blue";
    })(Color || (Color = {}));
    let c = Color.Green;
    // Test für die Deklaration
    let a;
    a = "Hello World!";
    let b;
    b = 12;
    //  b = a;
    // Multitype
    let multiType;
    multiType = 20;
    multiType = true;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.body.innerHTML = stringOutput;
        //  document.body.innerHTML = c.toString();
    }
})(L01_HelloWorld || (L01_HelloWorld = {}));
//# sourceMappingURL=helloWorld.js.map