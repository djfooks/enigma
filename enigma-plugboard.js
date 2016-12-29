
function EnigmaPlugboard(plugboardPairs)
{
    this.substitution = [];
    var i;
    for (i = 0; i < 26; i += 1)
    {
        this.substitution[i] = i;
    }

    var pairs = plugboardPairs.split(" ");
    for (i = 0; i < pairs.length; i += 1)
    {
        var a = letterToCode(pairs[i][0]);
        var b = letterToCode(pairs[i][1]);

        this.substitution[a] = b;
        this.substitution[b] = a;
    }
}
