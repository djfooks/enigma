
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

    var enigmaSimulator = this.enigmaSimulator;
    var rotor = enigmaSimulator.rotorSet[index];

    $("#rotor-name-" + index).html(rotor.name);

    var rotorSettingSelector = $("#rotor-setting-" + index);
    var i;
    for (i = 0; i < 26; i += 1)
    {
        var letter = EnigmaUtils.codeToLetter(i);
        rotorSettingSelector.append($('<option>', {
            value: letter,
            text: letter
        }));
        rotorSettingSelector.change(this.rotorSettingChange.bind(this));
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

    $("#rotor-input-"   + index).html(highlight(ControllerUtils.alphabet, highlights));
    $("#rotor-wiring-"  + index).html(highlight(rotor.getWiringOffset(), highlights));
    $("#rotor-output-"  + index).html(highlight(rotor.getSubstitution(), highlights));
    $("#rotor-offset-"  + index).html(ControllerUtils.getOffset(-rotor.position));
    $("#rotor-setting-" + index).val(EnigmaUtils.codeToLetter(rotor.position));
};

RotorController.prototype.rotorSettingChange = function rotorSettingChange()
{
    var position = $("#rotor-setting-" + this.index).val();
    this.enigmaSimulator.rotorSet[this.index].setPosition(position);
    this.app.settingsUpdate();
}
