//begode 
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(val){
		this.last=10;
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		if (!euc.dash.light) euc.dash.light=0;
		if (!euc.dash.led) euc.dash.led=0;		
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,204);
		this.g.setColor(1,3);
      	this.g.fillRect(75,201,165,204);
		this.g.flip();
        this.g.setColor(1,15);
      	this.g.fillRect(75,201,98,204);
		this.g.flip(); 
		this.g.setColor(0,0);
		this.g.fillRect(0,205,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("ACTIONS",120-(this.g.stringWidth("ACTIONS")/2),217); 
		this.g.flip(); 
		let metric={"psi":1,"bar":0.0689475,"kpa":6.89475};
		face[0].btn(1,euc.dash.tpms?euc.dash.tpms:"TPMS",18,60,120,(euc.dash.tpms&&tpms.euc[euc.dash.tpms]&&tpms.euc[euc.dash.tpms].time&&(getTime()|0)-tpms.euc[euc.dash.tpms].time<1800)?(tpms.euc[euc.dash.tpms].alrm)?7:4:1,1,0,100,119,195,(euc.dash.tpms)?(tpms.euc[euc.dash.tpms]&&tpms.euc[euc.dash.tpms].psi)?Math.round(tpms.euc[euc.dash.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",(euc.dash.tpms)?28:25,60,155);
		this.light=-1;
		this.led=-1;
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		if (!this.run) return; 
		if (!face[0].setE){
			if ( this.light!=euc.dash.light) {
				this.light=euc.dash.light;
				let val=["OFF","ON","ON"];
				this.btn(euc.dash.light?1:0,"LIGHTS",18,60,20,4,1,0,0,119,97,val[euc.dash.light],25,60,55);
				this.btn(euc.dash.light==2?1:0,"STROBE",18,185,20,7,1,122,0,239,97,euc.dash.light==2?"ON":"OFF",25,185,55);	
			}
			if ( this.led!=euc.dash.led) {
				this.led=euc.dash.led;
				this.btn(1,"LED",20,185,120,12,1,122,100,239,195,euc.dash.led+"",25,185,155);	
			}
		}
		this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },100,this);
	},
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
			this.g.setColor(0,(bt)?clr1:clr0);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size1);	
			this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1); 
   			if (txt2){this.g.setFont("Vector",size2);	
            this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
			this.g.flip();
    },
	set: function(b,txt){
        this.setE=1;
        this.setEb=b;
		this.g.setColor(0,1);
		this.g.fillRect(0,0,239,195);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString(txt,120-(this.g.stringWidth(txt)/2),10); 		
		this.g.drawString("<",5,90); this.g.drawString(">",230,90); 
		this.g.flip(); 
        this.btn(0,b,100,126,60,12,1,60,40,180,160);
    },	
    ntfy: function(txt1,txt0,size,clr,bt){
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size);
     		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,3);
				t.g.fillRect(75,201,165,204);
				t.g.flip();
				t.g.setColor(1,15);
				t.g.fillRect(75,201,98,204);
				t.g.flip(); 
				t.g.setColor(0,0);
				t.g.fillRect(0,205,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",20);
		        t.g.drawString("ACTIONS",120-(t.g.stringWidth("ACTIONS")/2),212); 
				t.g.flip();
			},1000,this);
    },
	tid:-1,
	run:false,
	clear : function(){
		//this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	}
};
//loop face
face[1] = {
	offms:1000,
	init: function(){
		return true;
	},
	show : function(){
		face.go(set.dash[set.def.dash.face],0);
		return true;
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	face.off();
	switch (e) {
      case 5: //tap event
   		if (!face[0].setE){//select page
			if ( x<=120 && y<100 ) { //lights
				buzzer([30,50,30]);	
				if (euc.dash.light) {euc.dash.light=0;euc.wri("lightsOff");} else {euc.dash.light=1;euc.wri("lightsOn");} 
				return;
			}else if ( 120<=x && y<=100 ) { //STROBE
				buzzer([30,50,30]);	
				if (euc.dash.light==2) {euc.dash.light=0;euc.wri("lightsOff");} else {euc.dash.light=2;euc.wri("lightsStrobe");}
			}else if ( x<=120 && 100<=y ) { //tpms
				buzzer([30,50,30]);		
				if (!euc.dash.tpms) face[0].ntfy("HOLD-> ON/OFF","NO ACTION",19,4,1);
				else {
					tpms.def.pos=Object.keys(tpms.def.list).indexOf(euc.dash.tpms);
					face.go("tpmsFace",0);
					return;
				}
			}else if  (120<=x && 100<=y ) { //led
				buzzer([30,50,30]);	
				face[0].set(euc.dash.led,"LED MODE");				
			}else buzzer(40);
		}else {
			if ( x <= 120 && 0<face[0].setEb  ) {
				buzzer([30,50,30]);
				face[0].setEb--;
			}else if ( 120 <= x  && face[0].setEb<9) {
				buzzer([30,50,30]);
				face[0].setEb++;
			}else buzzer(40);
			face[0].btn(0,face[0].setEb,100,126,60,12,1,60,40,180,160);
		}
		break;
	case 1: //slide down event
		if (face[0].setE) {
			euc.wri("ledMode",face[0].setEb);
			euc.dash.led=face[0].setEb;
			face[0].setE=0; 
			face[0].init();
        } else 
		face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else //if (y>100) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		//} else {buzzer(40);}
		break;
	case 3: //slide left event
		if (face[0].setE) {
			buzzer(40);
			return;
        } 
		face.go("dashBegodeOpt",0);
		return;	
	case 4: //slide right event (back action)
		if (face[0].setE) {
			euc.wri("ledMode",face[0].setEb);
			euc.dash.led=face[0].setEb;
			face[0].setE=0; 
			face[0].init();
        } else 
		face.go(set.dash[set.def.dash.face],0);
		return;
	case 12:
		if  (x<=120 && 100<=y ) { //tpms
			buzzer([30,50,30]);
			if (euc.dash.tpms) {
				euc.dash.tpms=0;
				face[0].btn(0,"TPMS",18,60,115,4,1,0,100,119,195,"OFF",28,60,150);
				//face[0].btn("TPMS",18,60,115,1,0,100,119,195,"OFF",28,60,155); //3
				face[0].ntfy("TPMS DISABLED","NO ACTION",19,1,1);
				return;
			}else{
				if (global.tpms){ 
					tpms.scan();
					face.go("tpmsFace",0);
				}else 
					face[0].ntfy("NO MODULE","NO ACTION",19,1,1);
			}
			return;
		}else buzzer(40);
		break;
  }
};
