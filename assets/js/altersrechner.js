function calculateAge() {
      const birthdayInput = document.getElementById("birthday").value;
      const birthtimeInput = document.getElementById("birthtime").value;
      const resultDiv = document.getElementById("result");
      const errorDiv = document.getElementById("error");

      resultDiv.style.display = "none";
      errorDiv.textContent = "";

      if (!birthdayInput) {
        errorDiv.textContent = "Bitte gib dein Geburtsdatum ein.";
        return;
      }

      const time = birthtimeInput || "00:00";
      const birthDate = new Date(`${birthdayInput}T${time}`);
      const now = new Date();

      if (birthDate > now) {
        errorDiv.textContent = "Das Geburtsdatum darf nicht in der Zukunft liegen.";
        return;
      }

      const diffMs = now - birthDate;

      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);

      let years = now.getFullYear() - birthDate.getFullYear();
      let months = now.getMonth() - birthDate.getMonth();
      let days = now.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      resultDiv.innerHTML = `
        <strong>Du bist ungefähr:</strong><br>
        ${years} Jahre, ${months} Monate und ${days} Tage alt.<br><br>

        <strong>Insgesamt:</strong><br>
        ${totalWeeks.toLocaleString("de-DE")} Wochen<br>
        ${totalDays.toLocaleString("de-DE")} Tage<br>
        ${totalHours.toLocaleString("de-DE")} Stunden<br>
        ${totalMinutes.toLocaleString("de-DE")} Minuten
      `;

      resultDiv.style.display = "block";
    }
