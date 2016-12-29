
function EnigmaSimulator(rotorSet, reflector, plugboard)
{
    this.rotorSet = rotorSet;
    this.reflector = reflector;
    this.plugboard = plugboard;

    this.rotorSetIn = new Array(rotorSet.length);
    this.rotorSetOut = new Array(rotorSet.length);
    this.plugboardIn = undefined;
    this.plugboardOut = undefined;
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
    for (i = 0; i < rotorSetLength; i += 1)
    {
        var hitNotch = this.rotorSet[i].update();
        if (!hitNotch)
        {
            break;
        }
    }
    currentCode = this.plugboard.forward(currentCode);
    this.plugboardIn = currentCode;

    var rotor;
    for (i = 0; i < rotorSetLength; i += 1)
    {
        rotor = this.rotorSet[i];
        currentCode = rotor.forward(currentCode);
        this.rotorSetIn[i] = currentCode;
    }
    currentCode = this.reflector.forward(currentCode);
    for (i = rotorSetLength - 1; i >= 0; i -= 1)
    {
        rotor = this.rotorSet[i];
        this.rotorSetOut[i] = currentCode;
        currentCode = rotor.backward(currentCode);
    }

    this.plugboardOut = currentCode;
    currentCode = this.plugboard.forward(currentCode);
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
