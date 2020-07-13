module.exports = function(RED) {

    "use strict";

    function SetVoltagesNode(config) {
        RED.nodes.createNode(this, config);
        this.phase_A = config.phase_A;
        this.phase_B= config.phase_B;
        this.phase_C = config.phase_C;
        this.slot = config.slot;
        
        var node = this

        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: " AC_Power_Source_modular_V1_0",
                slot: parseInt(node.slot),
                method: "set_voltages",
                phase_A: parseFloat(node.phase_A),
                phase_B: parseFloat(node.phase_B), 
                phase_C: parseFloat(node.phase_C),
                get_output: {},
                compare: {}
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("set_voltages", SetVoltagesNode);
}