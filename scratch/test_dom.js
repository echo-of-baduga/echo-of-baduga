// scratch/test_dom.js
// Headless DOM test to locate any runtime errors in player.html

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "../player.html");
const html = fs.readFileSync(htmlPath, "utf8");

const dom = new JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
    url: "file://" + htmlPath,
    beforeParse(window) {
        // Mock localStorage
        let storage = {};
        window.myLocalStorage = {
            getItem: (k) => storage[k] || null,
            setItem: (k, v) => { storage[k] = String(v); },
            removeItem: (k) => { delete storage[k]; },
            clear: () => { storage = {}; }
        };
        window.localStorage = window.myLocalStorage;
        window.alert = (msg) => console.log("ALERT:", msg);
        
        // Mock Audio
        window.HTMLMediaElement.prototype.load = () => {};
        window.HTMLMediaElement.prototype.play = () => Promise.resolve();
        window.HTMLMediaElement.prototype.pause = () => {};
    }
});

dom.window.addEventListener("error", (event) => {
    console.error("\n[CRASH DETECTED] Runtime Error:", event.message);
    console.error("File:", event.filename);
    console.error("Line:", event.lineno, "Col:", event.colno);
    if (event.error) {
        console.error(event.error.stack);
    }
});

console.log("Starting DOM execution simulation...");
setTimeout(() => {
    const splash = dom.window.document.getElementById("splash");
    if (splash) {
        console.log("Splash screen class list:", splash.classList.toString());
        if (splash.classList.contains("active")) {
            console.log("\n[WARNING] Splash screen is STILL stuck!");
        } else {
            console.log("\n[SUCCESS] Splash screen cleared successfully!");
        }
    } else {
        console.log("Splash element not found in HTML!");
    }
    process.exit(0);
}, 3500);
