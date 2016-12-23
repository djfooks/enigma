
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
    for (i = 0; i < rotorSetLength; i += 1)
    {
        var rotor = this.rotorSet[i];
        currentCode = rotor.forward(currentCode);
    }
    currentCode = this.reflector.forward(currentCode);
    for (i = rotorSetLength - 1; i >= 0; i -= 1)
    {
        var rotor = this.rotorSet[i];
        currentCode = rotor.backward(currentCode);
    }
    return codeToLetter(currentCode);
};


EnigmaSimulator.prototype.encryptMessage = function encryptMessage(plainText)
{
    var cypherText = "";
    var plainTextLength = plainText.length;
    var i;
    for (i = 0; i < plainTextLength; i += 1)
    {
        cypherText += this.encryptLetter(plainText[i]);
    }
    return cypherText;
};

var Globals = {};

function onKeyPress(event)
{
    event = event || window.event;
    var charCode = event.keyCode || event.which;
    var charStr = String.fromCharCode(charCode);
    var letter = charStr.toUpperCase();

    var code = letterToCode(letter);
    if (code < 0 || code >= 26)
    {
        return;
    }

    Globals.plainText += letter;
    Globals.enigmaSimulator.setRotorPositions("AAA");
    Globals.cypherText = Globals.enigmaSimulator.encryptMessage(Globals.plainText);
    
    var div = document.getElementById('divID');
    div.innerHTML = addSpaces(Globals.plainText, 5) + "<p>" + addSpaces(Globals.cypherText, 5);
}

function reset()
{
    var rotorI   = new EnigmaRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ");
    var rotorII  = new EnigmaRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE");
    var rotorIII = new EnigmaRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO");

    var rotorSet = [rotorIII, rotorII, rotorI];
    var reflectorB = new EnigmaReflector("YRUHQSLDPXNGOKMIEBFZCWVJAT");

    Globals.enigmaSimulator = new EnigmaSimulator(rotorSet, reflectorB);
    Globals.plainText = "";
    Globals.cypherText = "";
}

function main()
{
    reset();
    document.onkeypress = onKeyPress;
}

main();

