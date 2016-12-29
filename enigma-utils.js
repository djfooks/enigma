
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

var highlightColors = ["blue", "red"];
function highlight(str, positions)
{
    var result = "<span>";
    var i;
    var j;
    var color;
    for (i = 0; i < str.length; i += 1)
    {
        var match = false;
        for (j = 0; j < positions.length; j += 1)
        {
            if (i == positions[j])
            {
                color = highlightColors[j];
                match = true;
                break;
            }
        }
        if (match)
        {
            result += "</span><b><font color=\"" + color + "\"><span>" + str[i] + "</span></font></b><span>";
        }
        else
        {
            result += str[i];
        }
    }
    return result + "</span>";
}
