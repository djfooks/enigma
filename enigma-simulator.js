
function letterToCode(letter)
{
    return letter.charCodeAt(0) - "A".charCodeAt(0)
}

function codeToLetter(letterCode)
{
    return String.fromCharCode(letterCode + "A".charCodeAt(0));
}

function EnigmaRotor(mappingString)
{
    this.substitution = new Array(26);
    this.inverseSubstitution = new Array(26);

    var letter;
    var substitutionLetter;
    var i;
    for (i = 0; i < 26; i += 1)
    {
        var letterCode = letterToCode(mappingString[i]);
        this.substitution[i] = letterCode;
        this.inverseSubstitution[letterCode] = i;
    }
}

EnigmaSimulator.prototype.forward = function forward(letterCode)
{
    return this.substitution[letterCode];
};

EnigmaSimulator.prototype.backward = function backward(letterCode)
{
    return this.inverseSubstitution[letterCode];
};

function EnigmaSimulator(rotorSet, reflector)
{
    this.rotorSet = rotorSet;
    this.reflector = reflector;
    // TODO plugboard
}

EnigmaSimulator.prototype.encryptLetter = function encryptLetter(letter)
{
    var currentCode = codeToLetter(letter);

    var i;
    var rotorSetLength = this.rotorSet.length();
    for (i = 0; i < rotorSetLength; i += 1)
    {

    }
    return letter;
};

var rotorI   = new EnigmaRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ");
var rotorII  = new EnigmaRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE");
var rotorIII = new EnigmaRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO");

var rotorSet = [rotorI, rotorII, rotorIII];
var reflectorA = new EnigmaRotor("EJMZALYXVBWFCRQUONTSPIKHGD");

var enigmaSimulator = EnigmaSimulator(rotorSet, reflectorA);
console.log(enigmaSimulator.encryptLetter("A"));


