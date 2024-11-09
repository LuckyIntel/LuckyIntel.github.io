"use strict"

const Canvas = document.createElement("canvas");
Canvas.width = Canvas.height = 500;
document.body.append(Canvas);
const GL = Canvas.getContext("2d");

const filesIC = new Map([
    ["help.txt",
        {
            content: [
                "help -- Shows this page",
                "clear -- Clears everything in the screen",
                "neofetch -- Shows computer's specs",
                "cat [file name] -- Opens a text file",
                "ls -- Shows directory"
            ]
        }
    ],
    ["aboutme.txt",
        {
            content: [
                "Welcome!", 
                "I am a 15 year old programmer.",
                "I still see education in a mid-level highschool.",
                "Here's some programming languages i know: ",
                "C/C++, C#, Python, JavaScript, LUA"
            ]
        }
    ]
]);

let textToDisp = new Array();
let typeLastPos = 1;

function RGB(R, G, B) { return `rgb(${R},${G},${B})`; };

function onResize() { Canvas.width = window.innerWidth; Canvas.height = window.innerHeight; };

function readFile(fileContent) { for (let i = 0; i < fileContent.length; i++) { new TerminalText(fileContent[i]); }; };

class TerminalText
{
    constructor(textStr)
    {
        this.textStr = textStr;
        this.position = typeLastPos;
        typeLastPos++;
        textToDisp.push(this);
    };
    dump()
    {
        this.textStr = undefined;
        this.position = undefined;
        textToDisp.splice(textToDisp.indexOf(this));
    };
    render()
    {
        GL.textAlign = "left";
        GL.fillStyle = RGB(240, 240, 240);
        GL.font = "20px DejaVu Sans";
        GL.fillText(this.textStr, 0, this.position * (Canvas.height / (Math.pow(Canvas.height, 0.5))));
    };
};

function checkCommand(str)
{
    switch (true)
    {
        case str == "help":
            readFile(filesIC.get("help.txt").content);
            break;
        case str == "clear":
            typeLastPos = 1;
            textToDisp = new Array();
            break;
        case str == "neofetch":
            new TerminalText("OS: LIOS Version 1.0");
            new TerminalText("HOST: Standard PC");
            new TerminalText(`RESOLUTION: ${Canvas.width}x${Canvas.height}`);
            break;
        case str.startsWith("cat "):
            let fTS = str.replace("cat ", "");
            try { readFile(filesIC.get(fTS).content); }
            catch { new TerminalText("This text file doesn't exist."); };
            break;
        case str == "ls":
            new TerminalText("This directory includes: ");
            let tempArr = Array.from(filesIC.keys());
            for (let i = 0; i < tempArr.length; i++) { new TerminalText(tempArr[i]); };
            break;
        default:
            new TerminalText("This command doesn't exist.");
    };
};

document.body.addEventListener("keyup", (e) => {
    e = e.key;
    if (e == "Enter")
    {
        checkCommand(termPrefix.textStr.replace(">>", ""));
        termPrefix = new TerminalText(">>");
    }
    else if (e == "Backspace" && termPrefix.textStr.length > 2) termPrefix.textStr = termPrefix.textStr.slice(0, -1);
    else if (e.length == 1) termPrefix.textStr += e; 
});

const termStart = new TerminalText("LIPOS Version 1.0");
const termCopyright = new TerminalText("(c) LuckyIntel All rights reserved");
let termPrefix = new TerminalText(">>");

function animate()
{
    requestAnimationFrame(animate);
    onResize();
    GL.fillStyle = RGB(20, 20, 20);
    GL.fillRect(0, 0, Canvas.width, Canvas.height);
    for (let i = 0; i < textToDisp.length; i++) { textToDisp[i].render(); };
};
animate();