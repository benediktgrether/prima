# PRIMA

[L20_Platformer](https://benediktgrether.github.io/prima/L20_Platformer/)
<br>

[FudgeCore GameIdee](https://benediktgrether.github.io/prima/GameDesign/FudgeCraf_idee.html)
<br>

[L10_FudgeCraft](https://benediktgrether.github.io/prima/L10_FudgeCraft/)
<br>

[L06_PongFinal](https://benediktgrether.github.io/prima/L06_PongFinal/)
<br>

[L05_PongCollision](https://benediktgrether.github.io/prima/L05_PongCollision/)
<br>

[L04_PongAnimated](https://benediktgrether.github.io/prima/L04_PongAnimated/)
<br>

[L03_PongPanel](https://benediktgrether.github.io/prima/L03_PongPanel/)
<br>

[L02_FirstGamePong](https://benediktgrether.github.io/prima/L02_FirstGamePong/)
<br>

[L02_FirstFudge](https://benediktgrether.github.io/prima/L02_FirstFudge/)
<br>

[L01_HelloWorld](https://benediktgrether.github.io/prima/L01_HelloWorld/)


## Bis nächsten Donnerstag

- [x] Coding Style
- [x] TypeScript
- [x] DOM
- [x] Event-System

## TypeScript Fragen

Müssen wir immer die Variablen Deklaration mitgeben? oder ist es für uns, für die leichtere Lesbarkeit?
```typescript
let stringOutput: string = "!Hello World!";
```

Was sind die 2 Unterschiede?
```typescript
let listNumber: number[] = [1, 2, 3];
let listArrayNumber: Array<number> = [1, 2, 3];
```

Bei Funktionen und allgemein.
Sind DOM Typisierung immer groß geschrieben und Variablendeklarationen klein geschrieben ? 


## To Do Pong

- [x] Ball soll sich mit verschiedener Geschwindigkeit starten (Vector 3)
- [x] An allen vier Wänden wieder abprallen.

## To Do für FudgeCraft 

- [] Spielregeln entwickeln und festlegen
- [] Technischen gegebenheite? -> Minecraft völlig gerastete Welt. - Bewegungen im Raster 
- [] Konzept mit Zeichnung und Erklärungen. (Was sind die Steuerungsmöglichkeiten des Nutzers,)

Überlegung

- Zentraler Block wo die anderen dran gebaut werden
- Je mehr klötze umso stärker wird die Graviation und die nächsten Klötze kommen immer schneller
- Raster prüfen welche Klötze sind die nachbarn?
- Somawürfel 

### Ideen

- verschiedene Formen
- Farbkombination verschwinden
- Powerups
- Zeitformen bauen
- Base drehen
- Fragment drehen
- Fragment fallenrichtung beeinflussen
- Kamera - Perspektive beeinflusst Steuerung

## FudgeCraft

- 3x3 Array für die Positionen des Würfels
- Fragmente, welche Rasterpunkte belegen die Fragmente


Scroller
Platform Abfrage, wenn es aus dem viewport ist, wieder hinten anhängen.


## Endaufgabe

Jump and Run weiter machen.

Anforderungen 
- Nutzerinteraktion (Spieler kann was tun | Was kann er tun?)
- Objektinteraktion (Objekte Interagieren irgendwie miteinandern)
- Objektanzahl variable (Irgendwas muss spawnen | Dinge werden zur Laufzeit generiert)
- Szenenhierarchie (Alle Floor Teile liegen in einem Floor Objekt -> Szene Hierarchie Sinnvoll einsetze und Nutze)
- Sound sollten wir drin haben.
- GUI mit Komponente (irgendwas)
- Externe Daten (JSON Datei um das Level zu laden)
- Verhaltensklasse
- Subklassen 
- Maße & Position (Kriterium wählen wir für unsere Größen. Was bedeutet bei uns 1.)
- Message System (Eventlistner Einsatz)

