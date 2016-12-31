
var App = function ()
{
    this.errorMsg = "";
    window.onerror = this.onError.bind(this);

    var i;

    $("#plaintext-input").on("input", this.plaintextUpdate.bind(this));
    $("#peek-input").on("input", this.peekUpdate.bind(this));
    $("#peek-input").val("A");

    $("#reset-all").on("click", this.resetAll.bind(this));
    $("#reset-message").on("click", this.resetMessage.bind(this));
    $("#plugboard-pairs").on("input", this.plugboardChange.bind(this));

    var reflectorSetting = $("#reflector-setting");
    var reflectorName;
    var reflectors = EnigmaMachineSettings.reflectors;
    for (reflectorName in reflectors)
    {
        if (reflectors.hasOwnProperty(reflectorName))
        {
            reflectorSetting.append($('<option>', {
                value: reflectorName,
                text: reflectorName
            }));
        }
    }
    reflectorSetting.val("B");
    reflectorSetting.change(this.reflectorChange.bind(this));

    var rotorI   = EnigmaMachineSettings.createRotor("I");
    var rotorII  = EnigmaMachineSettings.createRotor("II");
    var rotorIII = EnigmaMachineSettings.createRotor("III");

    var plugboard = new EnigmaPlugboard("");
    var rotorSet = [rotorIII, rotorII, rotorI];
    var reflectorB = EnigmaMachineSettings.createReflector("B");

    var enigmaSimulator = new EnigmaSimulator(rotorSet, reflectorB, plugboard);
    this.enigmaSimulator = enigmaSimulator;

    this.rotorControllers = [];
    for (i = 0; i < enigmaSimulator.rotorSet.length; i += 1)
    {
        this.rotorControllers[i] = new RotorController(this, i);
        this.rotorControllers[i].render();
    }

    this.resetAll();
};

App.prototype.onError = function onError(message, source, lineno, colno, error)
{
    var debugText = $("#debugText");
    this.errorMsg += "<p>Error: " + source + ":" + lineno + " " + message;
    debugText.html(this.errorMsg);
};

App.prototype.updateSimulator = function updateSimulator()
{
    $("#plaintext-message").html(EnigmaUtils.addSpaces(this.plaintext, 5));
    $("#cyphertext-message").html(EnigmaUtils.addSpaces(this.cyphertext, 5));

    var i;
    for (i = 0; i < this.rotorControllers.length; i += 1)
    {
        this.rotorControllers[i].update();
    }

    var enigmaSimulator = this.enigmaSimulator;
    var highlights = [0, 0];
    var highlight = ControllerUtils.highlight;
    var plugboard = enigmaSimulator.plugboard;

    highlights[0] = enigmaSimulator.inCode;
    highlights[1] = enigmaSimulator.outCode;
    $("#plugboard-input").html(highlight(ControllerUtils.alphabet, highlights));
    $("#plugboard-output").html(highlight(plugboard.getSubstitution(), highlights));

    var rotorSetLength = enigmaSimulator.rotorSet.length;
    highlights[0] = enigmaSimulator.inRotorSet[rotorSetLength - 1];
    highlights[1] = enigmaSimulator.outRotorSet[rotorSetLength - 1];
    $("#reflector-input").html(highlight(ControllerUtils.alphabet, highlights));
    highlights[1] = undefined;
    $("#reflector-output").html(highlight(enigmaSimulator.reflector.getSubstitution(), highlights));

    $("#peek-output").html(EnigmaUtils.codeToLetter(enigmaSimulator.outCode));
};

App.prototype.onKeyPress = function onKeyPress(letter)
{
    letter = letter.toUpperCase();

    var code = EnigmaUtils.letterToCode(letter);
    if (code < 0 || code >= 26)
    {
        return;
    }

    $("#peek-input").val(letter);

    this.plaintext += letter;
    this.cyphertext += this.enigmaSimulator.encryptLetter(letter);
    this.updateSimulator();
};

App.prototype.plaintextUpdate = function plaintextUpdate()
{
    var plaintextTextbox = $("#plaintext-input");
    var plaintextInput = plaintextTextbox.val();
    if (plaintextInput.length > 0)
    {
        var newLetter = plaintextInput[plaintextInput.length - 1];
        this.onKeyPress(newLetter);
        plaintextTextbox.val("");
    }
};

App.prototype.peekUpdate = function peekUpdate()
{
    var peekInput = $("#peek-input");

    letter = peekInput.val().toUpperCase();

    var code = EnigmaUtils.letterToCode(letter);
    if (code < 0 || code >= 26)
    {
        peekInput.val("");
    }
    this.settingsUpdate();
};

App.prototype.reflectorChange = function reflectorChange()
{
    var reflectorName = $("#reflector-setting").val();
    this.enigmaSimulator.reflector = EnigmaMachineSettings.createReflector(reflectorName);
    this.settingsUpdate();
};


App.prototype.plugboardChange = function plugboardChange()
{
    var plugboardPairs = $("#plugboard-pairs").val();
    this.enigmaSimulator.plugboard = new EnigmaPlugboard(plugboardPairs);
    this.settingsUpdate();
};

App.prototype.settingsUpdate = function settingsUpdate()
{
    var peekLetter = "A";
    var peekInput = $("#peek-input").val().toUpperCase();
    if (peekInput.length > 0)
    {
        peekLetter = peekInput[0];
    }
    this.enigmaSimulator.simulate(peekLetter);
    this.updateSimulator();
};

App.prototype.resetMessage = function resetMessage()
{
    this.plaintext = "";
    this.cyphertext = "";

    this.enigmaSimulator.simulate("A");
    this.updateSimulator();
};

App.prototype.resetAll = function resetAll()
{
    this.enigmaSimulator.setRotorPositions("AAA");
    this.enigmaSimulator.plugboard = new EnigmaPlugboard("");
    $("#plugboard-pairs").val("");
    this.resetMessage();
};

$(document).ready(function()
{
    new App();
});
