function calculateAge() {
      const birthdayInput = document.getElementById("birthday").value;
      const birthtimeInput = document.getElementById("birthtime").value;
      const resultDiv = document.getElementById("result");
      const errorDiv = document.getElementById("error");

      resultDiv.style.display = "none";
      errorDiv.textContent = "";

      if (!birthdayInput) {
        errorDiv.textContent = "Please enter your date of birth.";
        return;
      }

      const time = birthtimeInput || "00:00";
      const birthDate = new Date(`${birthdayInput}T${time}`);
      const now = new Date();

      if (birthDate > now) {
        errorDiv.textContent = "The date of birth cannot be in the future.";
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
        <strong>You are approximately:</strong><br>
        ${years} years, ${months} months and ${days} days old.<br><br>

        <strong>Total:</strong><br>
        ${totalWeeks.toLocaleString("en-EN")} Weeks<br>
        ${totalDays.toLocaleString("en-EN")} Days<br>
        ${totalHours.toLocaleString("en-EN")} Hours<br>
        ${totalMinutes.toLocaleString("en-EN")} Minutes
      `;

      resultDiv.style.display = "block";
    }
