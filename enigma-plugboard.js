
function EnigmaPlugboard(pairs)
{
    this.pairs = pairs;
    this.substitution = [];
    var i;
    for (i = 0; i < 26; i += 1)
    {
        this.substitution[i] = i;
    }

    var pairsArray = pairs.split(" ");
    for (i = 0; i < pairsArray.length; i += 1)
    {
        var a = letterToCode(pairsArray[i][0]);
        var b = letterToCode(pairsArray[i][1]);

        this.substitution[a] = b;
        this.substitution[b] = a;
    }
}

EnigmaPlugboard.prototype.forward = function forward(letterCode)
{
    return this.substitution[letterCode];
};

EnigmaPlugboard.prototype.getSubstitution = function getSubstitution()
{
    var i;
    var result = "";
    for (i = 0; i < 26; i += 1)
    {
        result += codeToLetter(this.substitution[i]);
    }
    return result;
};
