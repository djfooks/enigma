
function letterToCode(letter)
{
    return letter.charCodeAt(0) - "A".charCodeAt(0)
}

function codeToLetter(letterCode)
{
    return String.fromCharCode(letterCode + "A".charCodeAt(0));
}

function addSpaces(string, everyCount)
{
    var result = "";
    var stringLength = string.length;
    var i;
    var first = true;
    for (i = 0; i < stringLength; i += 1)
    {
        if (!first && (i % everyCount === 0))
        {
            result += " ";
        }
        result += string[i];
        first = false;
    }
    return result;
}

function getOffset(position)
{
    if (position > 13)
    {
        position -= 26;
    }
    if (position < -13)
    {
        position += 26;
    }
    if (position > 0)
    {
        return "+" + position;
    }
    else if (position < 0)
    {
        return position;
    }
    return "";
}
