var Globals = {};

function updateOutputText()
{
    var div = document.getElementById('outputText');
    div.innerHTML = addSpaces(Globals.plaintext, 5) + "<p>" + addSpaces(Globals.cyphertext, 5);

    var rotorDisplay = $("#rotorDisplay");
    if (Globals.plaintext.length == 0)
    {
        rotorDisplay.html("");
        return;
    }

    var enigmaSimulator = Globals.enigmaSimulator;
    var rotorDisplayText = "<hr>";
    var highlights = [0, 0];
    var plugboard = enigmaSimulator.plugboard;

    highlights[0] = letterToCode(Globals.plaintext[Globals.plaintext.length - 1]);
    highlights[1] = letterToCode(Globals.cyphertext[Globals.cyphertext.length - 1]);
    rotorDisplayText += highlight("ABCDEFGHIJKLMNOPQRSTUVWXYZ Plugboard \"" + plugboard.pairs + "\"<p>", highlights);
    rotorDisplayText += highlight(plugboard.getSubstitution() + "<p>", highlights);
    rotorDisplayText += "<hr>";

    var rotorSet = enigmaSimulator.rotorSet;
    var rotorSetLength = rotorSet.length;
    var i;
    for (i = 0; i < rotorSetLength; i += 1)
    {
        var rotor = rotorSet[i];
        if (i == 0)
        {
            highlights[0] = enigmaSimulator.plugboardIn;
            highlights[1] = enigmaSimulator.plugboardOut;
        }
        else
        {
            highlights[0] = enigmaSimulator.rotorSetIn[i - 1];
            highlights[1] = enigmaSimulator.rotorSetOut[i - 1];
        }
        rotorDisplayText += highlight("ABCDEFGHIJKLMNOPQRSTUVWXYZ Rotor \"" + rotor.name + "\"<p>", highlights);
        rotorDisplayText += highlight(rotor.getWiringOffset() + " Wiring<p>", highlights);
        rotorDisplayText += highlight(rotor.getSubstitution() + " Output " + getOffset(-rotor.position) + "<p>", highlights);
        rotorDisplayText += "<hr>";
    }

    highlights[0] = enigmaSimulator.rotorSetIn[rotorSetLength - 1];
    highlights[1] = enigmaSimulator.rotorSetOut[rotorSetLength - 1];
    rotorDisplayText += highlight("ABCDEFGHIJKLMNOPQRSTUVWXYZ Reflector \"" + enigmaSimulator.reflector.name + "\"<p>", highlights);
    highlights[1] = undefined;
    rotorDisplayText += highlight(enigmaSimulator.reflector.getSubstitution() + " Output", highlights);
    rotorDisplay.html(rotorDisplayText);
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
    var rotorI   = new EnigmaRotor("I",   "EKMFLGDQVZNTOWYHXUSPAIBRCJ", "R");
    var rotorII  = new EnigmaRotor("II",  "AJDKSIRUXBLHWTMCQGZNPYFVOE", "F");
    var rotorIII = new EnigmaRotor("III", "BDFHJLCPRTXVZNYEIWGAKMUSQO", "W");

    var plugboard = new EnigmaPlugboard("CA DK EI PV JZ MY SX LQ TF RB");
    var rotorSet = [rotorIII, rotorII, rotorI];
    var reflectorB = new EnigmaReflector("B", "YRUHQSLDPXNGOKMIEBFZCWVJAT");

    Globals.enigmaSimulator = new EnigmaSimulator(rotorSet, reflectorB, plugboard);
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
