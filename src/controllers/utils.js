
var ControllerUtils = {};

ControllerUtils.getOffset = function getOffset(position)
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
};

ControllerUtils.highlightColors = ["blue", "red"];
ControllerUtils.highlight = function highlight(str, positions)
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
                color = ControllerUtils.highlightColors[j];
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
};
