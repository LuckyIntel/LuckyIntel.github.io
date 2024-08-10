const programmingLanguages = "\n\nC/C++\nJavascript\nPython\nC#\nLua\n\n";
const languageMap = new Map([
    ["en-EN", 
        {
        clock: 
            {name: "Clock", 
            am: "AM", 
            pm: "PM"
            },
        greetings: "Welcome, Visitor",
        github_b: "Visit my Github!",
        explore_b: "Explore!",
        explain_p: `I am a Junior programmer, I am new to the Github and i upload my simple projects to Github.This is my portofolio website.Here is some programming languages that i have experience :${programmingLanguages}I am mostly good with C++ in the C series.`
        }
    ],
    ["tr-TR", 
        {
        clock: 
            {name: "Saat", 
            am: "ÖÖ", 
            pm: "ÖS"
            },
        greetings: "Hoşgeldin, Ziyaretçi",
        github_b: "Github'ımı ziyaret ediniz!",
        explore_b: "Keşfet!",
        explain_p: `Ben bir Junior yazılım geliştiricisiyim, Github platformunda yeniyim ve yaptığım basit projeleri Github'da paylaşıyorum.Bu benim portofolyo websitem.İşte bilgili olduğum bazı yazılım dilleri :${programmingLanguages}Ben daha çok C serisinde C++ dilinde iyiyim.`
        }
    ]
]);

function languageCheck()
{
    if (navigator.language != undefined) return languageMap.get(navigator.language);
    else return languageMap.get("en-EN");
};

const typeWriter = (realPrompt, targetPrompt, ms, onFinish = () => {}, i = 0) =>
{
    if (i >= realPrompt.length) {onFinish(); return;};
    setTimeout(() => 
    {
        targetPrompt.innerHTML += realPrompt[i];
        i++;
        typeWriter(realPrompt, targetPrompt, ms, onFinish, i);
    }, ms);
};

const language = languageCheck();
//const language = languageMap.get("en-EN");

languageCheck = null;