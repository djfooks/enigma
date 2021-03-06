
function EnigmaReflector(name, mappingString)
{
    this.name = name;
    this.substitution = new Array(26);
    var inverseSubstitution = new Array(26);

    var letter;
    var i;
    for (i = 0; i < 26; i += 1)
    {
        var letterCode = EnigmaUtils.letterToCode(mappingString[i]);
        this.substitution[i] = letterCode;
        inverseSubstitution[letterCode] = i;
    }

    for (i = 0; i < 26; i += 1)
    {
        if (this.substitution[i] != inverseSubstitution[i])
        {
            throw new Error("Reflector must have a valid inverse (if A maps to B, B must map to A)");
        }
    }
}

EnigmaReflector.prototype.forward = function forward(letterCode)
{
    return this.substitution[letterCode];
};

EnigmaReflector.prototype.getSubstitution = function getSubstitution()
{
    var i;
    var result = "";
    for (i = 0; i < 26; i += 1)
    {
        result += EnigmaUtils.codeToLetter(this.substitution[i]);
    }
    return result;
};

