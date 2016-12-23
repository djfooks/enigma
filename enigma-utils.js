
function letterToCode(letter)
{
    return letter.charCodeAt(0) - "A".charCodeAt(0)
}

function codeToLetter(letterCode)
{
    return String.fromCharCode(letterCode + "A".charCodeAt(0));
}
