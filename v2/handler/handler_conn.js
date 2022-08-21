E.setFlags({pretokenise:1});

function ccon(l){ 
//	if (ew.def.prxy&&global.euc&&global.euc.state=="READY") {
	if (ew.def.prxy==1) {
		emuZ.cmd(l);
		return;
	}else {
		var cli="\x03";
		var loa="\x04";
		var gb="\x20\x03";
		 if (l.startsWith(loa)) {
		 	ew.is.bt=2;
			handleInfoEvent({"src":"BT","title":"LOADER","body":"Connected"});
			Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
			return; 
		}else {
		if (ew.def.cli) {
			if (l.startsWith(cli)) {
				handleInfoEvent({"src":"BT","title":"IDE","body":"Connected"});
				ew.is.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
			}
		}
		if (ew.def.gb) {
			if (l.startsWith(gb)){
				ew.is.bt=3;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
				handleInfoEvent({"src":"BT","title":"GB","body":"Connected"});
			}
		}
		if (l.length>5)  NRF.disconnect();
		}
	}
}
function bcon() {
	if (ew.def.prxy&&global.euc&&global.euc.state!="OFF") {
		ew.is.bt=5;
		Bluetooth.removeListener('data',ccon);
		handleInfoEvent({"src":"BT","title":"EUC PROXY","body":"Client Connect"},1);
		return;
	} 
	E.setConsole(null,{force:true});
	ew.is.bt=1; 
	if (ew.def.cli||ew.def.gb||ew.def.prxy) { Bluetooth.on('data',ccon);}
	setTimeout(()=>{
		if (ew.is.bt==1){ 
			if (!ew.def.cli) 
				NRF.disconnect(); 
			else{ 
				handleInfoEvent({"src":"DEBUG","title":"RELAY","body":"Relay Connected"});
				ew.is.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
			}
		}
	},5000);
}
function bdis() {
    Bluetooth.removeListener('data',ccon);
	E.setConsole(null,{force:true});
    if (!ew.def.cli&&!ew.def.gb&&!ew.def.prxy&&!ew.def.hid){
		NRF.sleep();
		ew.is.btsl=1;
    }	
	if (ew.is.bt==1) handleInfoEvent({"src":"BT","title":"BT","body":"Disconnect"});
	else if (ew.is.bt==2) handleInfoEvent({"src":"BT","title":"IDE","body":"Disconnect"});
	else if (ew.is.bt==3) handleInfoEvent({"src":"BT","title":"GB","body":"Disconnect"});
	//else if (ew.is.bt==4) handleInfoEvent({"src":"BT","title":"ATC","body":"Disconnected"});
	else if (ew.is.bt==4) handleInfoEvent({"src":"BT","title":"Z10 EMU","body":"Client Disconnect"},1);
	else if (ew.is.bt==5) handleInfoEvent({"src":"BT","title":"EUC PROXY","body":"Client Disconnect"},1);
  	ew.is.bt=0; 
	ew.is.emuD=0;
}
NRF.setTxPower(ew.def.rfTX);
NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);
NRF.setAdvertising({}, { name:ew.def.name,connectable:true });
ew.do.update.bluetooth();







