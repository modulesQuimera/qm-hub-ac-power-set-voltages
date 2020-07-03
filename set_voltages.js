module.exports = function(RED) {

    "use strict";

    function SetVoltagesNode(config) {
        RED.nodes.createNode(this, config);
        this.phase_A = config.phase_A
        this.phase_B= config.phase_B
        this.phase_C = config.phase_C
        
        var node = this

        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: " AC_Power_Source_modular_V1.0",
                slot: 1,
                method: "set_voltages",
                phase_A: parseFloat(node.phase_A),
                phase_B: parseFloat(node.phase_B), 
                phase_C: parseFloat(node.phase_C)  
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            // node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
            // msg.payload = command
            send(msg)
        });
    }
    RED.nodes.registerType("set_voltages", SetVoltagesNode);
}