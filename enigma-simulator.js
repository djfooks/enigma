
function EnigmaSimulator(rotorSet, reflector)
{
    this.rotorSet = rotorSet;
    this.reflector = reflector;
    // TODO plugboard
}

EnigmaSimulator.prototype.setRotorPositions = function setRotorPositions(rotorPositions)
{
    var rotorSetLength = this.rotorSet.length;
    var i;
    for (i = 0; i < rotorSetLength; i += 1)
    {
        this.rotorSet[i].setPosition(rotorPositions[i]);
    }
};

EnigmaSimulator.prototype.encryptLetter = function encryptLetter(letter)
{
    var currentCode = letterToCode(letter);

    var i;
    var rotorSetLength = this.rotorSet.length;
    this.rotorSet[0].update();
    var rotor;
    for (i = 0; i < rotorSetLength; i += 1)
    {
        rotor = this.rotorSet[i];
        currentCode = rotor.forward(currentCode);
    }
    currentCode = this.reflector.forward(currentCode);
    for (i = rotorSetLength - 1; i >= 0; i -= 1)
    {
        rotor = this.rotorSet[i];
        currentCode = rotor.backward(currentCode);
    }
    return codeToLetter(currentCode);
};


EnigmaSimulator.prototype.encryptMessage = function encryptMessage(plaintext)
{
    var cypherText = "";
    var plaintextLength = plaintext.length;
    var i;
    for (i = 0; i < plaintextLength; i += 1)
    {
        cypherText += this.encryptLetter(plaintext[i]);
    }
    return cypherText;
};

var Globals = {};

function updateOutputText()
{
    var div = document.getElementById('outputText');
    div.innerHTML = addSpaces(Globals.plaintext, 5) + "<p>" + addSpaces(Globals.cyphertext, 5);
}

function onKeyPress(letter)
{
    letter = letter.toUpperCase();

    var code = letterToCode(letter);
    if (code < 0 || code >= 26)
    {
        return;
    }

    Globals.plaintext += letter;
    Globals.cyphertext += Globals.enigmaSimulator.encryptLetter(letter);

    updateOutputText();
    updateRotorSettings();
}

function plaintextUpdate()
{
    var plaintextTextbox = $('#plaintext');
    var plaintextInput = plaintextTextbox.val();
    if (plaintextInput.length > 0)
    {
        var newLetter = plaintextInput[plaintextInput.length - 1];
        onKeyPress(newLetter);
        plaintextTextbox.val("");
    }
}

function reset()
{
    var rotorI   = new EnigmaRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ");
    var rotorII  = new EnigmaRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE");
    var rotorIII = new EnigmaRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO");

    var rotorSet = [rotorIII, rotorII, rotorI];
    var reflectorB = new EnigmaReflector("YRUHQSLDPXNGOKMIEBFZCWVJAT");

    Globals.enigmaSimulator = new EnigmaSimulator(rotorSet, reflectorB);
    Globals.enigmaSimulator.setRotorPositions("AAA");
    Globals.plaintext = "";
    Globals.cyphertext = "";

    updateOutputText();
    updateRotorSettings();

    var plaintextTextbox = $('#plaintext');
    plaintextTextbox.val("");
}

function updateRotorSettings()
{
    var rotorSet = Globals.enigmaSimulator.rotorSet;
    var rotorSettingSelector;
    var i;
    var rotorSetLength = rotorSet.length;
    for (i = 0; i < rotorSetLength; i += 1)
    {
        rotorSettingSelector = $("#rotor-setting-" + i);
        rotorSettingSelector.val(codeToLetter(rotorSet[i].position));
    }
}

function setupRotorDropdown(index)
{
    var rotorSettingSelector = $("#rotor-setting-" + index);
    var i;
    for (i = 0; i < 26; i += 1)
    {
        var letter = codeToLetter(i);
        rotorSettingSelector.append($('<option>', {
            value: letter,
            text: letter
        }));
        rotorSettingSelector.change(rotorSettingChange.bind(null, index));
    }
}

function rotorSettingChange(index)
{
    var rotorSettingSelector = $("#rotor-setting-" + index);
    var position = rotorSettingSelector.val();

    Globals.enigmaSimulator.rotorSet[index].setPosition(position);
}

function onAppError(message, source, lineno, colno, error)
{
    var debugText = $("#debugText");
    Globals.errorMsg += "<p>Error: " + source + ":" + lineno + " " + message;
    debugText.html(Globals.errorMsg);
}

function main()
{
    Globals.errorMsg = "";
    window.onerror = onAppError;

    setupRotorDropdown(0);
    setupRotorDropdown(1);
    setupRotorDropdown(2);

    var plaintext = $('#plaintext');
    plaintext.on("input", plaintextUpdate);

    reset();
}

$(document).ready(function() {
    main();
});

