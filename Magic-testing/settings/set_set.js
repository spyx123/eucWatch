face[0].page="set";
UI.ele.ind("top",1,2);
UIc.start(1,0);
UI.btn.img("main","_2x3",1,(set.def.cli||set.def.gb||set.def.emuZ)?UI.icon.bt:UI.icon.plane,"BT",15,1);
UI.btn.img("main","_2x3",2,UI.icon.themes,"FACE",15,1);
UI.btn.img("main","_2x3",3,UI.icon.bri,set.def.bri,15,1,1);
UI.btn.img("main","_2x3",4,UI.icon.findPhone,"FIND",3,0);
UI.btn.img("main","_2x3",5,UI.icon.wakeScreen,"WAKE ",set.def.acc?15:3,set.def.acc?4:0);
UI.btn.img("main","_2x3",6,set.def.buzz?UI.icon.dndOn:UI.icon.dndOff,"BUZZ",set.def.buzz?15:3,set.def.buzz?4:0);
UIc.end();
//
UIc.main._2x3_1=()=>{buzzer(buz.ok);eval(require('Storage').read('set_bt'));};
UIc.main._2x3_2=()=>{buzzer(buz.ok);eval(require('Storage').read('set_theme'));};
UIc.main._2x3_3=()=>{
	buzzer(buz.ok);
	w.gfx.bri.lv++;
	if (7<w.gfx.bri.lv) w.gfx.bri.lv=1;
	w.gfx.bri.set(w.gfx.bri.lv);  
	UI.btn.img("main","_2x3",3,UI.icon.bri,set.def.bri,15,1,1);
};
UIc.main._2x3_4=()=>{
	if (set.bt!=3) {
		buzzer(buz.na);
		UI.btn.ntfy("_bar",6,"GADGET BRIDGE","not connected",15,7);
		w.gfx.flip();
	}else	buzzer(buz.na);};
UIc.main._2x3_5=()=>{
	buzzer(buz.ok);
	set.def.acc=1-set.def.acc;
	UI.btn.ntfy("_bar",6,"TURN TO WAKE",set.def.acc?"ENABLED":"DISABED",15,set.def.acc?4:0);
	UI.btn.img("main","_2x3",5,UI.icon.wakeScreen,"WAKE",set.def.acc?15:3,set.def.acc?4:0);
	setter.accR();
	//if (set.def.info) {UI.btn.ntfy("_bar",6,"TURN TO WAKE",set.def.acc?"ENABLED":"DISABED",15,6);}
	
};
UIc.main._2x3_6=()=>{
	
	set.def.buzz=1-set.def.buzz;
	UI.btn.ntfy("_bar",6,"BUZZER",set.def.buzz?"ENABLED":"DISABED",15,set.def.buzz?4:0);
	UI.btn.img("main","_2x3",6,set.def.buzz?UI.icon.dndOn:UI.icon.dndOff,"BUZZ",set.def.buzz?15:3,set.def.buzz?4:0);
	if (set.def.buzz){
		buzzer=digitalPulse.bind(null,ew.pin.BUZZ,0);
		buzzer(buz.ok);
	}else{
		buzzer(buz.ok);
		buzzer=function(){};
	}
	//if (set.def.info) UI.btn.ntfy("_bar",6,"BUZZER",set.def.buzz?"ENABLED":"DISABED",15,6);
	
};