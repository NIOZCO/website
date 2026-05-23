function calculateHoroscopes() {
    const input = document.getElementById("birthdate").value;
    const results = document.getElementById("results");

    results.innerHTML = "";

    if (!input) {
        results.innerHTML = "<p>Please enter a date of birth..</p>";
        return;
    }

    const date = new Date(input);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const horoscopeResults = [
        {
            title: "Western Zodiac Sign <sup>1</sup>",
            value: getWesternZodiac(day, month)
        },
        {
            title: "Western Zodiac Season <sup>1</sup>",
            value: getSeason(day, month)
        },
        {
            title: "Western Zodiac Element <sup>1</sup>",
            value: getElement(day, month)
        },
        {
            title: "Chinese Zodiac Sign <sup>2</sup>",
            value: getChineseZodiac(year)
        },
        {
            title: "Indian Zodiac Sign <sup>3</sup>",
            value: getIndianZodiac(day, month)
        },
        {
            title: "Vedic Astrology <sup>3</sup>",
            value: getVedicZodiac(day, month)
        },
        {
            title: "Celtic Astrology <sup>3</sup>",
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
    if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) return "Aries";
    if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Gemini";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) return "Leo";
    if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) return "Virgo";
    if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) return "Libra";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "Scorpio";
    if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) return "Capricorn";
    if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";

    return "Unknown";
}

function getSeason(day, month) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) return "Spring";
    if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return "Spring";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Spring";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Summer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) return "Summer";
    if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) return "Summer";
    if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) return "Autumn";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "Autumn";
    if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "Autumn";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) return "Winter";
    if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) return "Winter";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Winter";

    return "Unknown";
}

function getElement(day, month) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) return "Fire 🜂";
    if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return "Earth 🜃";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Air 🜁";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Water 🜄";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) return "Fire 🜂";
    if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) return "Earth 🜃";
    if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) return "Air 🜁";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "Water 🜄";
    if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "Fire 🜂";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) return "Earth 🜃";
    if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) return "Air 🜁";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Water 🜄";

    return "Unknown";
}

function getChineseZodiac(year) {
    const animals = [
        "Monkey",
        "Rooster",
        "Dog",
        "Pig",
        "Rat",
        "Ox",
        "Tiger",
        "Rabbit",
        "Dragon",
        "Snake",
        "Horse",
        "Goat"
    ];

    return animals[year % 12];
}

function getIndianZodiac(day, month) {
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Goose";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Otter";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Wolf";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Falcon";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Beaver";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Deer";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Woodpecker";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Salmon";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Brown Bear";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return "Raven";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) return "Snake";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Owl";

    return "Unknown";
}

function getVedicZodiac(day, month) {
    if ((month === 1 && day >= 14) || (month === 2 && day <= 11)) return "Makara (Capricorn)";
    if ((month === 2 && day >= 12) || (month === 3 && day <= 12)) return "Kumbha (Aquarius)";
    if ((month === 3 && day >= 13) || (month === 4 && day <= 13)) return "Meena (Pisces)";
    if ((month === 4 && day >= 14) || (month === 5 && day <= 14)) return "Mesha (Aries)";
    if ((month === 5 && day >= 15) || (month === 6 && day <= 14)) return "Vrishabha (Taurus)";
    if ((month === 6 && day >= 15) || (month === 7 && day <= 14)) return "Mithuna (Gemini)";
    if ((month === 7 && day >= 15) || (month === 8 && day <= 14)) return "Karka (Cancer)";
    if ((month === 8 && day >= 15) || (month === 9 && day <= 15)) return "Simha (Lion)";
    if ((month === 9 && day >= 16) || (month === 10 && day <= 15)) return "Kanya (Virgo)";
    if ((month === 10 && day >= 16) || (month === 11 && day <= 14)) return "Tula (Libra)";
    if ((month === 11 && day >= 15) || (month === 12 && day <= 14)) return "Vrischika (Scorpio)";
    if ((month === 12 && day >= 15) || (month === 1 && day <= 13)) return "Dhanu (Sagittarius)";

    return "Unknown";
}

function getCelticZodiac(day, month) {
    if ((month === 12 && day >= 24) || (month === 1 && day <= 20)) return "Birch";
    if ((month === 1 && day >= 21) || (month === 2 && day <= 17)) return "Hawthorn";
    if ((month === 2 && day >= 18) || (month === 3 && day <= 17)) return "Ash";
    if ((month === 3 && day >= 18) || (month === 4 && day <= 14)) return "Elm";
    if ((month === 4 && day >= 15) || (month === 5 && day <= 12)) return "Hawthorn";
    if ((month === 5 && day >= 13) || (month === 6 && day <= 9)) return "Holly";
    if ((month === 6 && day >= 10) || (month === 7 && day <= 7)) return "Oak";
    if ((month === 7 && day >= 8) || (month === 8 && day <= 4)) return "Horse Chestnut";
    if ((month === 8 && day >= 5) || (month === 9 && day <= 1)) return "Hazel";
    if ((month === 9 && day >= 2) || (month === 9 && day <= 29)) return "Grapevine";
    if ((month === 9 && day >= 30) || (month === 10 && day <= 27)) return "Ivy";
    if ((month === 10 && day >= 28) || (month === 11 && day <= 24)) return "Reed";
    if ((month === 11 && day >= 25) || (month === 12 && day <= 23)) return "Hawthorn";

    return "Unknown";
}
