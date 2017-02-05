
function RotorController(app, index)
{
    this.app = app;
    this.enigmaSimulator = app.enigmaSimulator;
    this.index = index;
}

RotorController.prototype.render = function render()
{
    var index = this.index;
    var template = $("#rotor_template").html();
    var view = {
        index : index
    };

    var output = Mustache.render(template, view);
    $("#rotor-" + index).html(output);

    var rotorSelector = $("#rotor-name-" + index);
    var rotorName;
    var rotors = EnigmaMachineSettings.rotors;
    for (rotorName in rotors)
    {
        if (rotors.hasOwnProperty(rotorName))
        {
            rotorSelector.append($('<option>', {
                value: rotorName,
                text: rotorName
            }));
        }
    }

    var enigmaSimulator = this.enigmaSimulator;
    var rotor = enigmaSimulator.rotorSet[index];
    rotorSelector.val(rotor.name);
    rotorSelector.on("change", this.rotorChange.bind(this));

    var rotorSettingSelector = $("#rotor-position-" + index);
    var i;
    for (i = 0; i < 26; i += 1)
    {
        var letter = EnigmaUtils.codeToLetter(i);
        rotorSettingSelector.append($('<option>', {
            value: letter,
            text: letter
        }));
        rotorSettingSelector.on("change", this.rotorPositionChange.bind(this));
    }
};

RotorController.prototype.update = function update()
{
    var index = this.index;
    var enigmaSimulator = this.enigmaSimulator;
    var rotor = enigmaSimulator.rotorSet[index];
    var highlights = [0, 0];
    var highlight = ControllerUtils.highlight;

    if (index == 0)
    {
        highlights[0] = enigmaSimulator.inPlugboard;
        highlights[1] = enigmaSimulator.outPlugboard;
    }
    else
    {
        highlights[0] = enigmaSimulator.inRotorSet[index - 1];
        highlights[1] = enigmaSimulator.outRotorSet[index - 1];
    }
    highlights[2] = (26 + rotor.notch - rotor.position - 1) % 26;

    $("#rotor-input-"   + index).html(highlight(ControllerUtils.alphabet, highlights));
    $("#rotor-wiring-"  + index).html(highlight(rotor.getWiringOffset(), highlights));
    $("#rotor-output-"  + index).html(highlight(rotor.getSubstitution(), highlights));
    $("#rotor-offset-"  + index).html(ControllerUtils.getOffset(-rotor.position));
    $("#rotor-position-" + index).val(EnigmaUtils.codeToLetter(rotor.position));
};

RotorController.prototype.rotorChange = function rotorChange()
{
    var rotorName = $("#rotor-name-" + this.index).val();
    this.enigmaSimulator.rotorSet[this.index] = EnigmaMachineSettings.createRotor(rotorName);
    this.app.settingsUpdate();
};

RotorController.prototype.rotorPositionChange = function rotorPositionChange()
{
    var position = $("#rotor-position-" + this.index).val();
    this.enigmaSimulator.rotorSet[this.index].setPosition(position);
    this.app.settingsUpdate();
};
