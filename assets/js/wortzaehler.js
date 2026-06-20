const textfeld = document.getElementById("text");

textfeld.addEventListener("input", aktualisieren);

function aktualisieren(){

    const text = textfeld.value;

    // Wörter zählen
    const woerter = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    // Zeichen mit Leerzeichen
    const zeichen = text.length;

    // Zeichen ohne Leerzeichen
    const zeichenOhneLeer = text.replace(/\s/g, "").length;

    // Zeilen zählen
    const zeilen = text === ""
        ? 0
        : text.split(/\n/).length;

    document.getElementById("woerter").textContent = woerter;
    document.getElementById("zeichen").textContent = zeichen;
    document.getElementById("zeichenOhneLeer").textContent = zeichenOhneLeer;
    document.getElementById("zeilen").textContent = zeilen;
}