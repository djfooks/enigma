var EnigmaMachineSettings = function ()
{
};

EnigmaMachineSettings.rotors =
{
    "I": {
        "wiring": "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        "notch": "R"
    },
    "II": {
        "wiring": "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "notch": "F"
    },
    "III": {
        "wiring": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "notch": "W"
    },
    "IV": {
        "wiring": "ESOVPZJAYQUIRHXLNFTGKDCMWB",
        "notch": "J"
    },
    "V": {
        "wiring": "VZBRGITYUPSDNHLXAWMJQOFECK",
        "notch": "Z"
    },
    "VI": {
        "wiring": "JPGVOUMFYQBENHZRDKASXLICTW",
        "notch": "ZM"
    },
    "VII": {
        "wiring": "NZJHGRCXMYSWBOUFAIVLPEKQDT",
        "notch": "ZM"
    },
    "VIII": {
        "wiring": "FKQHTLXOCBJSPDZRAMEWNIUYGV",
        "notch": "ZM"
    }
};

EnigmaMachineSettings.reflectors =
{
    "Beta": "LEYJVCNIXWPBQMDRTAKZGFUHOS",
    "Gamma": "FSOKANUERHMBTIYCWLQPZXVGJD",
    "A": "EJMZALYXVBWFCRQUONTSPIKHGD",
    "B": "YRUHQSLDPXNGOKMIEBFZCWVJAT",
    "C": "FVPJIAOYEDRZXWGCTKUQSBNMHL",
    "B Thin": "ENKQAUYWJICOPBLMDXZVFTHRGS",
    "C Thin": "RDOBJNTKVEHMLFCWZAXGYIPSUQ",
    "ETW": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

EnigmaMachineSettings.createRotor = function createRotor(name)
{
    var settings = EnigmaMachineSettings.rotors[name];
    return new EnigmaRotor(name, settings.wiring, settings.notch);
};

EnigmaMachineSettings.createReflector = function createReflector(name)
{
    var reflectorWiring = EnigmaMachineSettings.reflectors[name];
    return new EnigmaReflector(name, reflectorWiring);
};
