var App = {};

function updateOutputText()
{
    var div = document.getElementById('outputText');
    div.innerHTML = EnigmaUtils.addSpaces(App.plaintext, 5) + "<p>" + EnigmaUtils.addSpaces(App.cyphertext, 5);

    var rotorDisplay = $("#rotorDisplay");
    if (App.plaintext.length == 0)
    {
        rotorDisplay.html("");
        return;
    }

    var enigmaSimulator = App.enigmaSimulator;
    var rotorDisplayText = "<hr>";
    var highlights = [0, 0];
    var highlight = ControllerUtils.highlight;
    var plugboard = enigmaSimulator.plugboard;

    highlights[0] = EnigmaUtils.letterToCode(App.plaintext[App.plaintext.length - 1]);
    highlights[1] = EnigmaUtils.letterToCode(App.cyphertext[App.cyphertext.length - 1]);
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
        rotorDisplayText += highlight(rotor.getSubstitution() + " Output " + ControllerUtils.getOffset(-rotor.position) + "<p>", highlights);
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

    var code = EnigmaUtils.letterToCode(letter);
    if (code < 0 || code >= 26)
    {
        return;
    }

    App.plaintext += letter;
    App.cyphertext += App.enigmaSimulator.encryptLetter(letter);

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
    var rotorI   = EnigmaMachineSettings.createRotor("I");
    var rotorII  = EnigmaMachineSettings.createRotor("II");
    var rotorIII = EnigmaMachineSettings.createRotor("III");

    var plugboard = new EnigmaPlugboard(""); //"CA DK EI PV JZ MY SX LQ TF RB");
    var rotorSet = [rotorIII, rotorII, rotorI];
    var reflectorB = EnigmaMachineSettings.createReflector("B");

    App.enigmaSimulator = new EnigmaSimulator(rotorSet, reflectorB, plugboard);
    App.enigmaSimulator.setRotorPositions("AAA");
    App.plaintext = "";
    App.cyphertext = "";

    updateOutputText();
    updateRotorSettings();

    var plaintextTextbox = $('#plaintext');
    plaintextTextbox.val("");
}

function updateRotorSettings()
{
    var rotorSet = App.enigmaSimulator.rotorSet;
    var rotorSettingSelector;
    var i;
    var rotorSetLength = rotorSet.length;
    for (i = 0; i < rotorSetLength; i += 1)
    {
        rotorSettingSelector = $("#rotor-setting-" + i);
        rotorSettingSelector.val(EnigmaUtils.codeToLetter(rotorSet[i].position));
    }
}

function setupRotorDropdown(index)
{
    var rotorSettingSelector = $("#rotor-setting-" + index);
    var i;
    for (i = 0; i < 26; i += 1)
    {
        var letter = EnigmaUtils.codeToLetter(i);
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

    App.enigmaSimulator.rotorSet[index].setPosition(position);
}

function onAppError(message, source, lineno, colno, error)
{
    var debugText = $("#debugText");
    App.errorMsg += "<p>Error: " + source + ":" + lineno + " " + message;
    debugText.html(App.errorMsg);
}

function main()
{
    App.errorMsg = "";
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
