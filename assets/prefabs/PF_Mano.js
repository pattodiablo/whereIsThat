
// You can write more code here

/* START OF COMPILED CODE */

class PF_Mano extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "hand", frame);
		
		this.setOrigin(0.5, 0.95);
		
		/* START-USER-CTR-CODE */
			this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
			this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){
		this.canPescar = false;
		const arcade = this.scene.physics;
		this.anim_manox = [];
		this.anim_manoy = [];
		this.originalY = this.y;
		this.originalX = this.x;
		
		arcade.add.existing(this);
		var body = this.body;
		body.setSize(this.width, this.height);


		var minx = 0;
		this.minx = minx;
		var maxx = 400;
		this.maxx = maxx;
		this.x = this.minx;
		
		body.setBounce(0.2, 0.2);

		//this.pointer = this.input.activePointer;
		this.scene.input.on('pointerdown',this.ir_pescar,this)

		arcade.add.overlap(this, this.scene.objetos, this.agarrarObjetos,null,this);
	}
	
	agarrarObjetos(mano, objeto){

		
		objeto.agarrado=true;
		objeto.body.enable=false;
		mano.scene.objetos.remove(objeto);
		
		mano.scene.objetos.getChildren().forEach(function(item) {
			item.body.enable=false;
		}, this);
		// Animating alpha property of each item using forEach() method.

		//validar si objeto agarrado es el buscado
		
	}

	anim_mano(){
		this.canPescar = true;
		this.anim_manoy = this.scene.tweens.add({
		targets: this,
		y: this.y-100, // '+=100'
		ease: "Easing", // 'Cubic', 'Elastic', 'Bounce', 'Back'
		duration: 600,
		repeat: -1,
		yoyo: true

		});

		this.anim_manox = this.scene.tweens.add({
		targets: this,
		x: this.x+600, // '+=100'
		ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
		duration: 2000,
		repeat: -1,
		yoyo: true
		});
		
	}

	ir_pescar(){
		if(this.canPescar){
			this.canPescar = false;
			this.anim_manox.stop();
			this.anim_manoy.stop();
			this.anim_manoy.stop;
			var px = this.scene.input.x;
			var py = this.scene.input.y;
			
			this.grabTimer = this.scene.time.delayedCall(200, function(){
					
					this.body.velocity.y=1800;
					this.regresa();
				}, null, this);  
			
			this.scene.pescarSound.setVolume(0.4);
			this.scene.pescarSound.play();
		}

					
	}
	regresa(){
		this.reloadTimer = this.scene.time.delayedCall(300, function(){
		//console.log("regresa");
		//this.body.gravity=false
		this.body.velocity.y=-1800;
		this.posicionInicial()//	this.anim_mano();
		}, null, this);  // delay in ms		
	}

	posicionInicial(){
		this.reloadTimer = this.scene.time.delayedCall(1500, function(){
		this.y = this.originalY;
		this.x = this.originalX;
		this.body.velocity.y=0;
		this.bajar_mano_inicio();
		this.scene.objetos.getChildren().forEach(function(item) {
			item.body.enable=true;
		}, this);
		}, null, this);  // delay in ms	
		
			
	}

	bajar_mano_inicio(){
			this.caida_mano = this.scene.tweens.add({
			targets: this,
			y: 600,
			ease: 'Power1',
			duration: 1500,
			delay: 500,
			callbackScope: this
		});
		this.caida_mano.on("complete",this.anim_mano,this);

	}

	update(){

		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
