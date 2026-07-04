function berechnen() {
      const modus = document.getElementById("modus").value;
      const steuersatz = Number(document.getElementById("steuersatz").value);
      const betrag = Number(document.getElementById("betrag").value);
      const ergebnis = document.getElementById("ergebnis");

      if (betrag <= 0 || isNaN(betrag)) {
        ergebnis.innerHTML = "Bitte gib einen gültigen Betrag ein.";
        return;
      }

      let netto, brutto, mwst;

      if (modus === "nettoZuBrutto") {
        netto = betrag;
        mwst = netto * (steuersatz / 100);
        brutto = netto + mwst;
      } else {
        brutto = betrag;
        netto = brutto / (1 + steuersatz / 100);
        mwst = brutto - netto;
      }

      ergebnis.innerHTML = `
        <strong>Netto:</strong> ${netto.toFixed(2)} €<br>
        <strong>MwSt (${steuersatz}%):</strong> ${mwst.toFixed(2)} €<br>
        <strong>Brutto:</strong> ${brutto.toFixed(2)} €
      `;
    }
