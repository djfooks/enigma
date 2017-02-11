
function EnigmaRotor(name, mappingString, notchLetter)
{
    this.name = name;
    this.substitution = new Array(26);
    this.inverseSubstitution = new Array(26);
    this.position = 0;
    this.notches = [];

    var letter;
    var i;
    for (i = 0; i < 26; i += 1)
    {
        var letterCode = EnigmaUtils.letterToCode(mappingString[i]);
        this.substitution[i] = letterCode;
        this.inverseSubstitution[letterCode] = i;
    }

    for (i = 0; i < notchLetter.length; i += 1)
    {
        this.notches.push(EnigmaUtils.letterToCode(notchLetter[i]));
    }
}

EnigmaRotor.prototype.onNotch = function onNotch(position)
{
    for (i = 0; i < this.notches.length; i += 1)
    {
        if (this.notches[i] == position)
        {
            return true;
        }
    }
    return false;
};

EnigmaRotor.prototype.setPosition = function setPosition(letter)
{
    this.position = EnigmaUtils.letterToCode(letter);
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

// does not include the offset due to the rotation
EnigmaRotor.prototype.getWiringOffset = function getWiringOffset()
{
    var i;
    var result = "";
    for (i = 0; i < 26; i += 1)
    {
        result += EnigmaUtils.codeToLetter(this.substitution[(i + this.position) % 26]);
    }
    return result;
};

EnigmaRotor.prototype.getSubstitution = function getSubstitution()
{
    var i;
    var result = "";
    for (i = 0; i < 26; i += 1)
    {
        result += EnigmaUtils.codeToLetter((this.substitution[(i + this.position) % 26] - this.position + 26) % 26);
    }
    return result;
};


