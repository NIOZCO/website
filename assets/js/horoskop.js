function calculateHoroscopes() {
    const input = document.getElementById("birthdate").value;
    const results = document.getElementById("results");

    results.innerHTML = "";

    if (!input) {
        results.innerHTML = "<p>Bitte geben Sie ein Geburtsdatum ein.</p>";
        return;
    }

    const date = new Date(input);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const horoscopeResults = [
        {
            title: "Westliches Sternzeichen <sup>1</sup>",
            value: getWesternZodiac(day, month)
        },
        {
            title: "Westliches Sternzeichen Jahreszeit <sup>1</sup>",
            value: getSeason(day, month)
        },
        {
            title: "Westliches Sternzeichen Elemente <sup>1</sup>",
            value: getElement(day, month)
        },
        {
            title: "Chinesisches Sternzeichen <sup>2</sup>",
            value: getChineseZodiac(year)
        },
        {
            title: "Indianer Sternzeichen <sup>3</sup>",
            value: getIndianZodiac(day, month)
        },
        {
            title: "Vedische Astrologie <sup>3</sup>",
            value: getVedicZodiac(day, month)
        },
        {
            title: "Keltische Astrologie <sup>3</sup>",
            value: getCelticZodiac(day, month)
        }
    ];

    horoscopeResults.forEach(item => {
        results.innerHTML += `
            <div class="result-card">
                <h3>${item.title}</h3>
                <p>${item.value}</p>
            </div>
        `;
    });
}

function getWesternZodiac(day, month) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) return "Widder";
    if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return "Stier";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Zwillinge";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Krebs";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) return "Löwe";
    if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) return "Jungfrau";
    if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) return "Waage";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "Skorpion";
    if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "Schütze";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) return "Steinbock";
    if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) return "Wassermann";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Fische";

    return "Unbekannt";
}

function getSeason(day, month) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) return "Frühling";
    if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return "Frühling";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Frühling";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Sommer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) return "Sommer";
    if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) return "Sommer";
    if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) return "Herbst";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "Herbst";
    if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "Herbst";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) return "Winter";
    if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) return "Winter";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Winter";

    return "Unbekannt";
}

function getElement(day, month) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) return "Feuer 🜂";
    if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return "Erde 🜃";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Luft 🜁";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Wasser 🜄";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) return "Feuer 🜂";
    if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) return "Erde 🜃";
    if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) return "Luft 🜁";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "Wasser 🜄";
    if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "Feuer 🜂";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) return "Erde 🜃";
    if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) return "Luft 🜁";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Wasser 🜄";

    return "Unbekannt";
}

function getChineseZodiac(year) {
    const animals = [
        "Affe",
        "Hahn",
        "Hund",
        "Schwein",
        "Ratte",
        "Büffel",
        "Tiger",
        "Hase",
        "Drache",
        "Schlange",
        "Pferd",
        "Ziege"
    ];

    return animals[year % 12];
}

function getIndianZodiac(day, month) {
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Gans";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Otter";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Wolf";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Falke";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Biber";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Hirsch";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Specht";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Lachs";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Braunbär";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return "Rabe";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) return "Schlange";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Eule";

    return "Unbekannt";
}

function getVedicZodiac(day, month) {
    if ((month === 1 && day >= 14) || (month === 2 && day <= 11)) return "Makara (Steinbock)";
    if ((month === 2 && day >= 12) || (month === 3 && day <= 12)) return "Kumbha (Wassermann)";
    if ((month === 3 && day >= 13) || (month === 4 && day <= 13)) return "Meena (Fische)";
    if ((month === 4 && day >= 14) || (month === 5 && day <= 14)) return "Mesha (Widder)";
    if ((month === 5 && day >= 15) || (month === 6 && day <= 14)) return "Vrishabha (Stier)";
    if ((month === 6 && day >= 15) || (month === 7 && day <= 14)) return "Mithuna (Zwillinge)";
    if ((month === 7 && day >= 15) || (month === 8 && day <= 14)) return "Karka (Krebs)";
    if ((month === 8 && day >= 15) || (month === 9 && day <= 15)) return "Simha (Löwe)";
    if ((month === 9 && day >= 16) || (month === 10 && day <= 15)) return "Kanya (Jungfrau)";
    if ((month === 10 && day >= 16) || (month === 11 && day <= 14)) return "Tula (Waage)";
    if ((month === 11 && day >= 15) || (month === 12 && day <= 14)) return "Vrischika (Skorpion)";
    if ((month === 12 && day >= 15) || (month === 1 && day <= 13)) return "Dhanu (Schütze)";

    return "Unbekannt";
}

function getCelticZodiac(day, month) {
    if ((month === 12 && day >= 24) || (month === 1 && day <= 20)) return "Birke ";
    if ((month === 1 && day >= 21) || (month === 2 && day <= 17)) return "Eberesche";
    if ((month === 2 && day >= 18) || (month === 3 && day <= 17)) return "Esche";
    if ((month === 3 && day >= 18) || (month === 4 && day <= 14)) return "Erle";
    if ((month === 4 && day >= 15) || (month === 5 && day <= 12)) return "Weide";
    if ((month === 5 && day >= 13) || (month === 6 && day <= 9)) return "Weißdorn";
    if ((month === 6 && day >= 10) || (month === 7 && day <= 7)) return "Eiche";
    if ((month === 7 && day >= 8) || (month === 8 && day <= 4)) return "Stechpalme";
    if ((month === 8 && day >= 5) || (month === 9 && day <= 1)) return "Hasel";
    if ((month === 9 && day >= 2) || (month === 9 && day <= 29)) return "Weinrebe";
    if ((month === 9 && day >= 30) || (month === 10 && day <= 27)) return "Efeu";
    if ((month === 10 && day >= 28) || (month === 11 && day <= 24)) return "Schilf";
    if ((month === 11 && day >= 25) || (month === 12 && day <= 23)) return "Holunder";

    return "Unbekannt";
}
