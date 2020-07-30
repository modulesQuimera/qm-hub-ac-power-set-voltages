module.exports = function(RED) {

    function multipleSetPhase(self, file, slot, currentMode){
        for(var t=0; t<self.qtdSetVoltages; t++){
            var command_n={
                type: " AC_Power_Source_modular_V1_0",
                slot: parseInt(self.slot),
                method: "set_voltages",
                phase_A: parseFloat(self.phase_A_n[t]),
                phase_B: parseFloat(self.phase_B_n[t]), 
                phase_C: parseFloat(self.phase_C_n[t]),
                get_output: {},
                compare: {}
            }
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command_n);
                }
                else{
                    file.slots[slot].jig_error.push(command_n);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command_n);
                }
                else{
                    file.slots[3].jig_test.push(command_n);
                }
            }
        }
        return file;
    }

    function SetVoltagesNode(config) {
        RED.nodes.createNode(this, config);
        this.phase_A = config.phase_A;
        this.phase_B= config.phase_B;
        this.phase_C = config.phase_C;
        this.slot = config.slot;
        
        this.qtdSetVoltages = config.qtdSetVoltages;
        this.phase_A_n = []; this.phase_B_n = []; this.phase_C_n = [];
        this.phase_A_n.push(config.phase_A1); this.phase_B_n.push(config.phase_B1); this.phase_C_n.push(config.phase_C1);
        this.phase_A_n.push(config.phase_A2); this.phase_B_n.push(config.phase_B2); this.phase_C_n.push(config.phase_C2);
        this.phase_A_n.push(config.phase_A3); this.phase_B_n.push(config.phase_B3); this.phase_C_n.push(config.phase_C3);
        this.phase_A_n.push(config.phase_A4); this.phase_B_n.push(config.phase_B4); this.phase_C_n.push(config.phase_C4);
        this.phase_A_n.push(config.phase_A5); this.phase_B_n.push(config.phase_B5); this.phase_C_n.push(config.phase_C5);
        this.phase_A_n.push(config.phase_A6); this.phase_B_n.push(config.phase_B6); this.phase_C_n.push(config.phase_C6);
        this.phase_A_n.push(config.phase_A7); this.phase_B_n.push(config.phase_B7); this.phase_C_n.push(config.phase_C7);
        this.phase_A_n.push(config.phase_A8); this.phase_B_n.push(config.phase_B8); this.phase_C_n.push(config.phase_C8);
        this.phase_A_n.push(config.phase_A9); this.phase_B_n.push(config.phase_B9); this.phase_C_n.push(config.phase_C9);
        this.phase_A_n.push(config.phase_A10); this.phase_B_n.push(config.phase_B10); this.phase_C_n.push(config.phase_C10);
        this.phase_A_n.push(config.phase_A11); this.phase_B_n.push(config.phase_B11); this.phase_C_n.push(config.phase_C11);
        this.phase_A_n.push(config.phase_A12); this.phase_B_n.push(config.phase_B12); this.phase_C_n.push(config.phase_C12);
        this.phase_A_n.push(config.phase_A13); this.phase_B_n.push(config.phase_B13); this.phase_C_n.push(config.phase_C13);
        this.phase_A_n.push(config.phase_A14); this.phase_B_n.push(config.phase_B14); this.phase_C_n.push(config.phase_C14);
        this.phase_A_n.push(config.phase_A15); this.phase_B_n.push(config.phase_B15); this.phase_C_n.push(config.phase_C15);
        this.phase_A_n.push(config.phase_A16); this.phase_B_n.push(config.phase_B16); this.phase_C_n.push(config.phase_C16);
        this.phase_A_n.push(config.phase_A17); this.phase_B_n.push(config.phase_B17); this.phase_C_n.push(config.phase_C17);
        this.phase_A_n.push(config.phase_A18); this.phase_B_n.push(config.phase_B18); this.phase_C_n.push(config.phase_C18);
        this.phase_A_n.push(config.phase_A19); this.phase_B_n.push(config.phase_B19); this.phase_C_n.push(config.phase_C19);
        this.phase_A_n.push(config.phase_A20); this.phase_B_n.push(config.phase_B20); this.phase_C_n.push(config.phase_C20);
        this.phase_A_n.push(config.phase_A21); this.phase_B_n.push(config.phase_B21); this.phase_C_n.push(config.phase_C21);
        this.phase_A_n.push(config.phase_A22); this.phase_B_n.push(config.phase_B22); this.phase_C_n.push(config.phase_C22);
        this.phase_A_n.push(config.phase_A23); this.phase_B_n.push(config.phase_B23); this.phase_C_n.push(config.phase_C23);
        this.phase_A_n.push(config.phase_A24); this.phase_B_n.push(config.phase_B24); this.phase_C_n.push(config.phase_C24);

        var node = this;

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
            };
            var file = globalContext.get("exportFile");
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                    file = multipleSetPhase(node, file, slot, currentMode);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    file = multipleSetPhase(node, file, slot, currentMode);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    file = multipleSetPhase(node, file, slot, currentMode);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    file = multipleSetPhase(node, file, slot, currentMode);
                }
            }
            globalContext.set("exportFile", file);
            console.log(command);
            send(msg);
        });
    }
    RED.nodes.registerType("set_voltages", SetVoltagesNode);
};