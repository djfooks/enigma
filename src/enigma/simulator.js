
function EnigmaSimulator(rotorSet, reflector, plugboard)
{
    this.rotorSet = rotorSet;
    this.reflector = reflector;
    this.plugboard = plugboard;

    this.inCode = 0;
    this.inPlugboard = 0;
    this.inRotorSet = new Array(rotorSet.length);
    this.outRotorSet = new Array(rotorSet.length);
    this.outPlugboard = 0;
    this.outCode = 0;
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

EnigmaSimulator.prototype.simulate = function simulate(letter)
{
    var rotorSetLength = this.rotorSet.length;
    var currentCode = EnigmaUtils.letterToCode(letter);
    this.inCode = currentCode;
    currentCode = this.plugboard.forward(currentCode);
    this.inPlugboard = currentCode;

    var i;
    var rotor;
    for (i = 0; i < rotorSetLength; i += 1)
    {
        rotor = this.rotorSet[i];
        currentCode = rotor.forward(currentCode);
        this.inRotorSet[i] = currentCode;
    }
    currentCode = this.reflector.forward(currentCode);
    for (i = rotorSetLength - 1; i >= 0; i -= 1)
    {
        rotor = this.rotorSet[i];
        this.outRotorSet[i] = currentCode;
        currentCode = rotor.backward(currentCode);
    }

    this.outPlugboard = currentCode;
    currentCode = this.plugboard.forward(currentCode);
    this.outCode = currentCode;
    return EnigmaUtils.codeToLetter(currentCode);
};

EnigmaSimulator.prototype.encryptLetter = function encryptLetter(letter)
{
    var i;
    var rotorSetLength = this.rotorSet.length;
    var moveNext = true;
    for (i = 0; i < rotorSetLength; i += 1)
    {
        var rotor = this.rotorSet[i];
        if (moveNext || (i < rotorSetLength - 1 && (rotor.notch - 1) == rotor.position))
        {
            this.rotorSet[i].update();
        }
        moveNext = (rotor.notch == rotor.position);
    }
    return this.simulate(letter);
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
