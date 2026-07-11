 "use strict";

        const locations = [
            {
                city: "Berlin",
                country: "Deutschland",
                timeZone: "Europe/Berlin"
            },
            {
                city: "Wien",
                country: "Österreich",
                timeZone: "Europe/Vienna"
            },
            {
                city: "Zürich",
                country: "Schweiz",
                timeZone: "Europe/Zurich"
            },
            {
                city: "London",
                country: "Großbritannien",
                timeZone: "Europe/London"
            },
            {
                city: "Paris",
                country: "Frankreich",
                timeZone: "Europe/Paris"
            },
            {
                city: "Madrid",
                country: "Spanien",
                timeZone: "Europe/Madrid"
            },
            {
                city: "Lissabon",
                country: "Portugal",
                timeZone: "Europe/Lisbon"
            },
            {
                city: "Athen",
                country: "Griechenland",
                timeZone: "Europe/Athens"
            },
            {
                city: "Istanbul",
                country: "Türkei",
                timeZone: "Europe/Istanbul"
            },
            {
                city: "Moskau",
                country: "Russland",
                timeZone: "Europe/Moscow"
            },
            {
                city: "New York",
                country: "USA",
                timeZone: "America/New_York"
            },
            {
                city: "Chicago",
                country: "USA",
                timeZone: "America/Chicago"
            },
            {
                city: "Denver",
                country: "USA",
                timeZone: "America/Denver"
            },
            {
                city: "Los Angeles",
                country: "USA",
                timeZone: "America/Los_Angeles"
            },
            {
                city: "Toronto",
                country: "Kanada",
                timeZone: "America/Toronto"
            },
            {
                city: "Vancouver",
                country: "Kanada",
                timeZone: "America/Vancouver"
            },
            {
                city: "Mexiko-Stadt",
                country: "Mexiko",
                timeZone: "America/Mexico_City"
            },
            {
                city: "São Paulo",
                country: "Brasilien",
                timeZone: "America/Sao_Paulo"
            },
            {
                city: "Buenos Aires",
                country: "Argentinien",
                timeZone: "America/Argentina/Buenos_Aires"
            },
            {
                city: "Dubai",
                country: "Vereinigte Arabische Emirate",
                timeZone: "Asia/Dubai"
            },
            {
                city: "Neu-Delhi",
                country: "Indien",
                timeZone: "Asia/Kolkata"
            },
            {
                city: "Bangkok",
                country: "Thailand",
                timeZone: "Asia/Bangkok"
            },
            {
                city: "Singapur",
                country: "Singapur",
                timeZone: "Asia/Singapore"
            },
            {
                city: "Peking",
                country: "China",
                timeZone: "Asia/Shanghai"
            },
            {
                city: "Hongkong",
                country: "Hongkong",
                timeZone: "Asia/Hong_Kong"
            },
            {
                city: "Tokio",
                country: "Japan",
                timeZone: "Asia/Tokyo"
            },
            {
                city: "Seoul",
                country: "Südkorea",
                timeZone: "Asia/Seoul"
            },
            {
                city: "Sydney",
                country: "Australien",
                timeZone: "Australia/Sydney"
            },
            {
                city: "Perth",
                country: "Australien",
                timeZone: "Australia/Perth"
            },
            {
                city: "Auckland",
                country: "Neuseeland",
                timeZone: "Pacific/Auckland"
            }
        ];

        const form = document.getElementById("timeConverterForm");
        const sourceLocationSelect =
            document.getElementById("sourceLocation");
        const targetLocationSelect =
            document.getElementById("targetLocation");
        const sourceTimeInput =
            document.getElementById("sourceTime");
        const swapButton =
            document.getElementById("swapButton");

        const resultElement =
            document.getElementById("result");
        const errorMessageElement =
            document.getElementById("errorMessage");

        const resultHeading =
            document.getElementById("resultHeading");
        const sourceResultLocation =
            document.getElementById("sourceResultLocation");
        const sourceResultTime =
            document.getElementById("sourceResultTime");
        const sourceResultDay =
            document.getElementById("sourceResultDay");
        const targetResultLocation =
            document.getElementById("targetResultLocation");
        const targetResultTime =
            document.getElementById("targetResultTime");
        const targetResultDay =
            document.getElementById("targetResultDay");
        const timeDifference =
            document.getElementById("timeDifference");

   
        function populateLocationSelects() {
            const sortedLocations = [...locations].sort((a, b) => {
                return a.country.localeCompare(b.country, "de") ||
                    a.city.localeCompare(b.city, "de");
            });

            for (const location of sortedLocations) {
                const label = `${location.country} – ${location.city}`;

                const sourceOption = document.createElement("option");
                sourceOption.value = location.timeZone;
                sourceOption.textContent = label;

                const targetOption = document.createElement("option");
                targetOption.value = location.timeZone;
                targetOption.textContent = label;

                sourceLocationSelect.appendChild(sourceOption);
                targetLocationSelect.appendChild(targetOption);
            }

            sourceLocationSelect.value = "Europe/Berlin";
            targetLocationSelect.value = "America/New_York";
        }


        function getLocationByTimeZone(timeZone) {
            return locations.find(
                location => location.timeZone === timeZone
            );
        }

   
        function getDateParts(date, timeZone) {
            const formatter = new Intl.DateTimeFormat("en-CA", {
                timeZone,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hourCycle: "h23"
            });

            const parts = formatter.formatToParts(date);
            const values = {};

            for (const part of parts) {
                if (part.type !== "literal") {
                    values[part.type] = Number(part.value);
                }
            }

            return {
                year: values.year,
                month: values.month,
                day: values.day,
                hour: values.hour,
                minute: values.minute,
                second: values.second
            };
        }

      
        function getTimeZoneOffset(date, timeZone) {
            const parts = getDateParts(date, timeZone);

            const displayedAsUtc = Date.UTC(
                parts.year,
                parts.month - 1,
                parts.day,
                parts.hour,
                parts.minute,
                parts.second
            );

            return displayedAsUtc - date.getTime();
        }

        function localTimeToUtc({
            year,
            month,
            day,
            hour,
            minute,
            timeZone
        }) {
            const desiredUtcValue = Date.UTC(
                year,
                month - 1,
                day,
                hour,
                minute,
                0
            );

            let utcGuess = desiredUtcValue;

     
            for (let iteration = 0; iteration < 4; iteration++) {
                const offset = getTimeZoneOffset(
                    new Date(utcGuess),
                    timeZone
                );

                const correctedUtc = desiredUtcValue - offset;

                if (correctedUtc === utcGuess) {
                    break;
                }

                utcGuess = correctedUtc;
            }

            return new Date(utcGuess);
        }


        function formatTime(date, timeZone) {
            return new Intl.DateTimeFormat("de-DE", {
                timeZone,
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23"
            }).format(date);
        }

      
        function formatWeekday(date, timeZone) {
            return new Intl.DateTimeFormat("de-DE", {
                timeZone,
                weekday: "long"
            }).format(date);
        }

 
        function getDayDifference(sourceParts, targetParts) {
            const sourceDateValue = Date.UTC(
                sourceParts.year,
                sourceParts.month - 1,
                sourceParts.day
            );

            const targetDateValue = Date.UTC(
                targetParts.year,
                targetParts.month - 1,
                targetParts.day
            );

            return Math.round(
                (targetDateValue - sourceDateValue) /
                (1000 * 60 * 60 * 24)
            );
        }

  
        function getDayLabel(dayDifference, weekday) {
            if (dayDifference === -1) {
                return `${weekday} · vorheriger Tag`;
            }

            if (dayDifference === 1) {
                return `${weekday} · nächster Tag`;
            }

            if (dayDifference < -1) {
                return `${weekday} · ${Math.abs(dayDifference)} Tage vorher`;
            }

            if (dayDifference > 1) {
                return `${weekday} · ${dayDifference} Tage später`;
            }

            return `${weekday} · gleicher Tag`;
        }

 
        function formatTimeDifference(differenceMinutes) {
            if (differenceMinutes === 0) {
                return "Beide Orte haben zur ausgewählten Zeit dieselbe Uhrzeit.";
            }

            const sign = differenceMinutes > 0 ? "+" : "−";
            const absoluteMinutes = Math.abs(differenceMinutes);
            const hours = Math.floor(absoluteMinutes / 60);
            const minutes = absoluteMinutes % 60;

            const parts = [];

            if (hours > 0) {
                parts.push(
                    `${hours} ${hours === 1 ? "Stunde" : "Stunden"}`
                );
            }

            if (minutes > 0) {
                parts.push(
                    `${minutes} ${minutes === 1 ? "Minute" : "Minuten"}`
                );
            }

            return `Zeitunterschied: ${sign}${parts.join(" ")} gegenüber dem Ausgangsort`;
        }

  
        function isValidLocalTime(
            date,
            expectedParts,
            timeZone
        ) {
            const actualParts = getDateParts(date, timeZone);

            return (
                actualParts.year === expectedParts.year &&
                actualParts.month === expectedParts.month &&
                actualParts.day === expectedParts.day &&
                actualParts.hour === expectedParts.hour &&
                actualParts.minute === expectedParts.minute
            );
        }

        function showError(message) {
            resultElement.classList.remove("visible");
            errorMessageElement.textContent = message;
            errorMessageElement.classList.add("visible");
        }

        function hideError() {
            errorMessageElement.textContent = "";
            errorMessageElement.classList.remove("visible");
        }

        function convertTime() {
            hideError();

            const sourceTimeZone = sourceLocationSelect.value;
            const targetTimeZone = targetLocationSelect.value;
            const selectedTime = sourceTimeInput.value;

            if (!selectedTime) {
                showError("Bitte gib eine gültige Uhrzeit ein.");
                return;
            }

            const [hour, minute] = selectedTime
                .split(":")
                .map(Number);

            if (
                !Number.isInteger(hour) ||
                !Number.isInteger(minute) ||
                hour < 0 ||
                hour > 23 ||
                minute < 0 ||
                minute > 59
            ) {
                showError("Die eingegebene Uhrzeit ist ungültig.");
                return;
            }

   
            const todayAtSource = getDateParts(
                new Date(),
                sourceTimeZone
            );

            const expectedSourceParts = {
                year: todayAtSource.year,
                month: todayAtSource.month,
                day: todayAtSource.day,
                hour,
                minute
            };

            const convertedInstant = localTimeToUtc({
                ...expectedSourceParts,
                timeZone: sourceTimeZone
            });

            if (
                !isValidLocalTime(
                    convertedInstant,
                    expectedSourceParts,
                    sourceTimeZone
                )
            ) {
                showError(
                    "Diese Uhrzeit existiert heute am Ausgangsort aufgrund " +
                    "einer Zeitumstellung nicht. Bitte wähle eine andere Uhrzeit."
                );

                return;
            }

            const sourceLocation =
                getLocationByTimeZone(sourceTimeZone);
            const targetLocation =
                getLocationByTimeZone(targetTimeZone);

            const sourceParts = getDateParts(
                convertedInstant,
                sourceTimeZone
            );

            const targetParts = getDateParts(
                convertedInstant,
                targetTimeZone
            );

            const dayDifference = getDayDifference(
                sourceParts,
                targetParts
            );

            const sourceOffset = getTimeZoneOffset(
                convertedInstant,
                sourceTimeZone
            );

            const targetOffset = getTimeZoneOffset(
                convertedInstant,
                targetTimeZone
            );

            const differenceMinutes = Math.round(
                (targetOffset - sourceOffset) / 60000
            );

            const sourceName =
                `${sourceLocation.city}, ${sourceLocation.country}`;

            const targetName =
                `${targetLocation.city}, ${targetLocation.country}`;

            resultHeading.textContent =
                `Wenn es heute in ${sourceLocation.city} ` +
                `${formatTime(convertedInstant, sourceTimeZone)} Uhr ist:`;

            sourceResultLocation.textContent = sourceName;
            sourceResultTime.textContent =
                formatTime(convertedInstant, sourceTimeZone);
            sourceResultDay.textContent =
                `${formatWeekday(convertedInstant, sourceTimeZone)} · Ausgangstag`;

            targetResultLocation.textContent = targetName;
            targetResultTime.textContent =
                formatTime(convertedInstant, targetTimeZone);

            targetResultDay.textContent = getDayLabel(
                dayDifference,
                formatWeekday(convertedInstant, targetTimeZone)
            );

            timeDifference.textContent =
                formatTimeDifference(differenceMinutes);

            resultElement.classList.add("visible");
        }

  
        swapButton.addEventListener("click", () => {
            const previousSource = sourceLocationSelect.value;

            sourceLocationSelect.value =
                targetLocationSelect.value;

            targetLocationSelect.value =
                previousSource;

            convertTime();
        });

        form.addEventListener("submit", event => {
            event.preventDefault();
            convertTime();
        });

        populateLocationSelects();
        convertTime();