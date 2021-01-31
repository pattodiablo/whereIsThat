
// You can write more code here



/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/** @type {Phaser.GameObjects.Container} */
		this.grupo1;
		/** @type {PF_Mano} */
		this.pF_Mano;
		/** @type {Phaser.GameObjects.Image} */
		this.panel;
		/** @type {Phaser.GameObjects.Image} */
		this.letreroAprobar;
		/** @type {Phaser.GameObjects.Image} */
		this.wellDone;
		/** @type {Phaser.GameObjects.Image} */
		this.ugh;
		/** @type {Phaser.GameObjects.Image} */
		this.btn2;
		/** @type {Phaser.GameObjects.Image} */
		this.btn1;
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		
		/* END-USER-CTR-CODE */
	}
	
	_create() {
		
		// grupo1
		const grupo1 = this.add.container(159, 186);
		
		// bgGrande
		const bgGrande = this.add.image(166, 532, "bgGrande");
		grupo1.add(bgGrande);
		
		// pF_Mano
		const pF_Mano = new PF_Mano(this, -129, -298);
		grupo1.add(pF_Mano);
		
		// panel
		const panel = this.add.image(-51, 445, "panel");
		panel.visible = false;
		grupo1.add(panel);
		
		// bagMarco
		const bagMarco = this.add.image(157, 531, "bagMarco");
		bagMarco.scaleX = 1.1;
		grupo1.add(bagMarco);
		
		// letreroAprobar
		const letreroAprobar = this.add.image(280, 445, "letreroAprobar");
		letreroAprobar.visible = false;
		grupo1.add(letreroAprobar);
		
		// wellDone
		const wellDone = this.add.image(280, 445, "wellDone");
		wellDone.visible = false;
		grupo1.add(wellDone);
		
		// ugh
		const ugh = this.add.image(280, 445, "ugh");
		ugh.visible = false;
		grupo1.add(ugh);
		
		// back1
		const back1 = this.add.image(166, 0, "back1");
		grupo1.add(back1);
		
		// btn2
		const btn2 = this.add.image(-3, 1, "btn2");
		btn2.visible = false;
		grupo1.add(btn2);
		
		// btn1
		const btn1 = this.add.image(0, 99, "btn1");
		grupo1.add(btn1);
		
		this.grupo1 = grupo1;
		this.pF_Mano = pF_Mano;
		this.panel = panel;
		this.letreroAprobar = letreroAprobar;
		this.wellDone = wellDone;
		this.ugh = ugh;
		this.btn2 = btn2;
		this.btn1 = btn1;
	}
	
	/* START-USER-CODE */
	
	// Write your code here.
	create(){

		this._create();
		this.btn1.setInteractive().on('pointerdown',this.playf,this);

		//agrupar
		this.objetos=this.physics.add.group();
		

		this.objetoBuscado=null;
		var objetoXAparecer=0;

		this.score="";
		this.scoreText = this.add.text(300, 80, '', {
        font: '35px Arial',
		color: '#f5424e',
        //fill: "#ff0044",
        align: "center"
    	});
		
		this.listaObjetosBuscados=[];

		this.mainSound = this.sound.add("main");
		this.gameplaySound = this.sound.add("gameplay");
		this.btnPlaySound = this.sound.add("FX_Button");
		this.searchSound = this.sound.add("FX_Search");
		this.wellDoneSound = this.sound.add("FX_Success");
		this.failureSound = this.sound.add("FX_failure");
		this.pescarSound = this.sound.add("FX_Meterlamano");
		
		this.mainSound.play();
	}

	update(){
		this.scoreText.setText(this.score);

	}
	iniciarMano(){
		//console.log(this)
		this.parent.scene.pF_Mano.bajar_mano_inicio();
		//console.log("iniciando mano")
	}
	playf(){
		
		this.caida = this.tweens.add({
			targets: this.grupo1,
			y: -300,
			ease: 'Power1',
			duration: 1000,
			delay: 300,
			onComplete: this.iniciarMano
		});
		
		this.mainSound.stop();
		this.btnPlaySound.play();
		this.gameplaySound.setVolume(0.5);
		this.gameplaySound.play();
		

		this.caida.on('complete',this.buscar_este_objeto,this);

		var timer = this.time.addEvent({
			delay: 2000,
			callback: this.crearObjetos,
			callbackScope: this,
			loop: true,
			repeat:-1
		});
	}

	crearObjetos(){
		this.searchSound.setVolume(0.3);
		this.searchSound.play();

		var randomX = Math.random() < 0.5;
		//console.log(randomX);
		if(randomX){
			var xBorn = 700;
		}else{
			var xBorn = -200;
		}
		var yBorn = Math.random() * (700 - 930) + 900;
		var listaCosasCartera=["obj1","obj2","obj3","obj4","obj5","obj6","obj7","obj8","obj9","obj10","obj11","obj12"];
		var elementoDuplicar=(this.objetoXAparecer+1);
		
		for (var i=0;i<=5;i++){
			listaCosasCartera.push("obj"+elementoDuplicar);
		}
		
		//console.log("Objeto: "+this.objetoXAparecer);
		//console.log("lista Cartera: "+listaCosasCartera);

		var objetoXAparecer1= Math.abs(Math.round(Math.random() * (listaCosasCartera.length - 1 )));
		
		const pF_Oso = new PF_Oso(this, xBorn, yBorn, listaCosasCartera[objetoXAparecer1]);
		pF_Oso.nombre=listaCosasCartera[objetoXAparecer1];

		this.objetos.add(pF_Oso);

		this.add.existing(pF_Oso);
	}

	buscar_este_objeto(){

		this.panel.visible = true;
		//this.letreroAprobar.visible = true;
		var listaCosas=["obj1","obj2","obj3","obj4","obj5","obj6","obj7","obj8","obj9","obj10","obj11","obj12"];
		this.objetoXAparecer= Math.abs(Math.round(Math.random() * (11-0) + 0));
		if(this.listaObjetosBuscados.length>0){
			var dropeado = this.listaObjetosBuscados.pop();
			dropeado.destroy();
		}
		const objeto_buscar = new prefbusc_objeto(this, 100, 230, listaCosas[this.objetoXAparecer]);
		objeto_buscar.nombre=listaCosas[this.objetoXAparecer];
		this.objetoBuscado=listaCosas[this.objetoXAparecer];

		this.listaObjetosBuscados.push(objeto_buscar);

		this.add.existing(objeto_buscar);
		/*this.add.text(40, 20, 'Find This!', { 
			font: '24px Arial',
			color: '#ffff'
			 });*/

		this.add.text(280, 20, 'Score', {
        font: '35px Arial',
		color: '#f5424e',
        align: "center"
    	});
		
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
