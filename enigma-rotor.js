
function EnigmaRotor(mappingString)
{
    this.substitution = new Array(26);
    this.inverseSubstitution = new Array(26);
    this.position = 0;

    var letter;
    var i;
    for (i = 0; i < 26; i += 1)
    {
        var letterCode = letterToCode(mappingString[i]);
        this.substitution[i] = letterCode;
        this.inverseSubstitution[letterCode] = i;
    }
}

EnigmaRotor.prototype.setPosition = function setPosition(letter)
{
    this.position = letterToCode(letter);
};

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

