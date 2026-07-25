"use strict";

        const characterSets = {
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            numbers: "0123456789",
            symbols: "!@#$%^&*()-_=+[]{};:,.?/~"
        };

        const elements = {
            password: document.getElementById("password"),
            copyButton: document.getElementById("copyButton"),
            generateButton: document.getElementById("generateButton"),
            clearExclusionsButton: document.getElementById("clearExclusionsButton"),
            lengthRange: document.getElementById("lengthRange"),
            lengthNumber: document.getElementById("lengthNumber"),
            lengthOutput: document.getElementById("lengthOutput"),
            excludeChars: document.getElementById("excludeChars"),
            lowercase: document.getElementById("lowercase"),
            uppercase: document.getElementById("uppercase"),
            numbers: document.getElementById("numbers"),
            symbols: document.getElementById("symbols"),
            strengthLabel: document.getElementById("strengthLabel"),
            strengthBar: document.getElementById("strengthBar"),
            message: document.getElementById("message")
        };

        function secureRandomInt(max) {
            if (!Number.isSafeInteger(max) || max <= 0) {
                throw new Error("Ungültiger Zufallsbereich.");
            }

            const maxUint32 = 0x100000000;
            const limit = maxUint32 - (maxUint32 % max);
            const randomValue = new Uint32Array(1);

            do {
                crypto.getRandomValues(randomValue);
            } while (randomValue[0] >= limit);

            return randomValue[0] % max;
        }

        function secureShuffle(items) {
            for (let index = items.length - 1; index > 0; index--) {
                const randomIndex = secureRandomInt(index + 1);
                [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
            }
            return items;
        }

        function removeExcludedCharacters(characterSet, exclusions) {
            const excluded = new Set([...exclusions]);
            return [...characterSet].filter(character => !excluded.has(character)).join("");
        }

        function getSelectedCharacterSets() {
            const exclusions = elements.excludeChars.value;
            const selectedSets = [];

            for (const key of Object.keys(characterSets)) {
                if (elements[key].checked) {
                    const filteredSet = removeExcludedCharacters(characterSets[key], exclusions);
                    if (filteredSet.length === 0) {
                        throw new Error(`Für „${getSetName(key)}“ bleiben nach den Ausschlüssen keine Zeichen übrig.`);
                    }
                    selectedSets.push(filteredSet);
                }
            }

            return selectedSets;
        }

        function getSetName(key) {
            const names = {
                lowercase: "Kleinbuchstaben",
                uppercase: "Großbuchstaben",
                numbers: "Zahlen",
                symbols: "Sonderzeichen"
            };
            return names[key];
        }

        function getLength() {
            const parsedLength = Number.parseInt(elements.lengthNumber.value, 10);
            return Math.min(128, Math.max(4, Number.isNaN(parsedLength) ? 20 : parsedLength));
        }

        function setLength(value) {
            const length = Math.min(128, Math.max(4, Number.parseInt(value, 10) || 20));
            elements.lengthRange.value = String(length);
            elements.lengthNumber.value = String(length);
            elements.lengthOutput.textContent = String(length);
        }

        function generatePassword() {
            clearMessage();

            if (!window.crypto || typeof window.crypto.getRandomValues !== "function") {
                showMessage("Dein Browser unterstützt keine sichere Zufallsgenerierung.", "error");
                return;
            }

            try {
                const selectedSets = getSelectedCharacterSets();
                const length = getLength();
                setLength(length);

                if (selectedSets.length === 0) {
                    throw new Error("Wähle mindestens eine Zeichenart aus.");
                }

                if (length < selectedSets.length) {
                    throw new Error(`Die Länge muss mindestens ${selectedSets.length} betragen.`);
                }

                const allCharacters = selectedSets.join("");
                const passwordCharacters = [];

                // Mindestens ein Zeichen aus jeder aktivierten Kategorie.
                for (const set of selectedSets) {
                    passwordCharacters.push(set[secureRandomInt(set.length)]);
                }

                while (passwordCharacters.length < length) {
                    passwordCharacters.push(allCharacters[secureRandomInt(allCharacters.length)]);
                }

                elements.password.value = secureShuffle(passwordCharacters).join("");
                updateStrength(elements.password.value, allCharacters.length);
                elements.copyButton.textContent = "Kopieren";
            } catch (error) {
                elements.password.value = "";
                updateStrength("", 0);
                showMessage(error.message, "error");
            }
        }

        function updateStrength(password, poolSize) {
            if (!password || poolSize < 1) {
                elements.strengthLabel.textContent = "–";
                elements.strengthBar.style.width = "0%";
                elements.strengthBar.style.backgroundColor = "transparent";
                return;
            }

            const entropy = password.length * Math.log2(poolSize);
            let label;
            let width;
            let color;

            if (entropy < 40) {
                label = "Schwach";
                width = 25;
                color = "var(--danger)";
            } else if (entropy < 60) {
                label = "Mittel";
                width = 50;
                color = "var(--warning)";
            } else if (entropy < 80) {
                label = "Gut";
                width = 75;
                color = "var(--good)";
            } else {
                label = "Sehr stark";
                width = 100;
                color = "var(--strong)";
            }

            elements.strengthLabel.textContent = `${label} (${Math.round(entropy)} Bit)`;
            elements.strengthBar.style.width = `${width}%`;
            elements.strengthBar.style.backgroundColor = color;
        }

        async function copyPassword() {
            const password = elements.password.value;

            if (!password) {
                showMessage("Generiere zuerst ein Passwort.", "error");
                return;
            }

            try {
                await navigator.clipboard.writeText(password);
            } catch (error) {
                elements.password.select();
                elements.password.setSelectionRange(0, password.length);
                const copied = document.execCommand("copy");
                window.getSelection()?.removeAllRanges();

                if (!copied) {
                    showMessage("Das Passwort konnte nicht kopiert werden.", "error");
                    return;
                }
            }

            elements.copyButton.textContent = "Kopiert!";
            showMessage("Passwort wurde in die Zwischenablage kopiert.", "success");

            window.setTimeout(() => {
                elements.copyButton.textContent = "Kopieren";
            }, 1800);
        }

        function showMessage(text, type = "") {
            elements.message.textContent = text;
            elements.message.className = type;
        }

        function clearMessage() {
            showMessage("");
        }

        elements.lengthRange.addEventListener("input", event => {
            setLength(event.target.value);
            generatePassword();
        });

        elements.lengthNumber.addEventListener("change", event => {
            setLength(event.target.value);
            generatePassword();
        });

        elements.generateButton.addEventListener("click", generatePassword);
        elements.copyButton.addEventListener("click", copyPassword);

        elements.clearExclusionsButton.addEventListener("click", () => {
            elements.excludeChars.value = "";
            generatePassword();
            elements.excludeChars.focus();
        });

        [
            elements.lowercase,
            elements.uppercase,
            elements.numbers,
            elements.symbols
        ].forEach(checkbox => checkbox.addEventListener("change", generatePassword));

        elements.excludeChars.addEventListener("input", generatePassword);

        generatePassword();