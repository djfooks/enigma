
function letterToCode(letter)
{
    return letter.charCodeAt(0) - "A".charCodeAt(0)
}

function codeToLetter(letterCode)
{
    return String.fromCharCode(letterCode + "A".charCodeAt(0));
}

function EnigmaRotor(mappingString)
{
    this.substitution = new Array(26);
    this.inverseSubstitution = new Array(26);
    this.position = 0;

    var letter;
    var substitutionLetter;
    var i;
    for (i = 0; i < 26; i += 1)
    {
        var letterCode = letterToCode(mappingString[i]);
        this.substitution[i] = letterCode;
        this.inverseSubstitution[letterCode] = i;
    }
}

EnigmaRotor.prototype.update = function update()
{
    this.position = (this.position + 1) % 26;
};

EnigmaRotor.prototype.forward = function forward(letterCode)
{
    return (this.substitution[(letterCode + this.position) % 26] - this.position + 26) % 26;
};

EnigmaRotor.prototype.backward = function backward(letterCode)
{
    return (this.inverseSubstitution[(letterCode + this.position) % 26] - this.position + 26) % 26;
};

function EnigmaSimulator(rotorSet, reflector)
{
    this.rotorSet = rotorSet;
    this.reflector = reflector;
    // TODO plugboard
}

EnigmaSimulator.prototype.encryptLetter = function encryptLetter(letter)
{
    var currentCode = letterToCode(letter);
    console.log(letter);

    var i;
    var rotorSetLength = this.rotorSet.length;
    this.rotorSet[0].update();
    for (i = 0; i < rotorSetLength; i += 1)
    {
        var rotor = this.rotorSet[i];
        currentCode = rotor.forward(currentCode);
        console.log(codeToLetter(currentCode));
    }
    currentCode = this.reflector.forward(currentCode);
    console.log(codeToLetter(currentCode));
    for (i = rotorSetLength - 1; i >= 0; i -= 1)
    {
        var rotor = this.rotorSet[i];
        currentCode = rotor.backward(currentCode);
        console.log(codeToLetter(currentCode));
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

function main()
{
    var rotorI   = new EnigmaRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ");
    var rotorII  = new EnigmaRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE");
    var rotorIII = new EnigmaRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO");

    //rotorIII.update();

    var rotorSet = [rotorIII, rotorII, rotorI];
    var reflectorB = new EnigmaRotor("YRUHQSLDPXNGOKMIEBFZCWVJAT");

    var enigmaSimulator = new EnigmaSimulator(rotorSet, reflectorB);
    console.log(enigmaSimulator.encryptMessage("AAAAAA"));
}

main();

