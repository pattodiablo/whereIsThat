
// You can write more code here

/* START OF COMPILED CODE */

class PF_Oso extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "oso", frame);
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	// Write your code here.
	start(){
		const arcade = this.scene.physics;
		this.maxY=this.y-25;
		this.minY=this.y+25;
		var agarrado =false;
		this.existo=true;
		
		arcade.add.existing(this);
		var body = this.body;
		body.setSize(this.width, this.height);

		//console.log("this x: "+this.x + " this.secene: ");
		if(this.x<320){
			body.velocity.x=+120;
		}else{
			body.velocity.x=-120;
		}
		
		body.setBounce(0.2, 0.2);
		body.angularVelocity = 30;
		
		this.mueveObjeto = this.scene.tweens.add({
		targets: this,
		y: this.y-30, // '+=100'
		ease: "Easing", // 'Cubic', 'Elastic', 'Bounce', 'Back'
		duration: 1000,
		repeat: -1,
		yoyo: true
		});
	}

	update(){
		if (this.existo){
			if (this.agarrado){
				this.x = this.scene.pF_Mano.x+100;
				this.y = this.scene.pF_Mano.y-200;
			}	
			
			if(this.y<=0){
				this.visible=false;
				if (this.scene.objetoBuscado==this.nombre){
					//poner score
					this.scene.score++;
					
					//poner sonido bien hecho
					this.scene.wellDoneSound.setVolume(0.8);
					this.scene.wellDoneSound.play();

					//poner imagen de bien hecho
					this.scene.wellDone.visible = true;
					this.scene.letreroAprobar.visible=true;
					this.apagarWellDone = this.scene.time.delayedCall(500, function(){
						this.scene.letreroAprobar.visible=false;
						this.scene.wellDone.visible = false
						}, null, this);  // delay in ms	

					
				}
				else{
					
					//poner sonido qué pena
					this.scene.failureSound.setVolume(0.8);
					this.scene.failureSound.play();

					//poner imagen de qué pena
					this.scene.ugh.visible = true;
					this.scene.letreroAprobar.visible=true;
					this.apagarUgh = this.scene.time.delayedCall(500, function(){
						this.scene.letreroAprobar.visible=false;
						this.scene.ugh.visible = false
						}, null, this);  // delay in ms	

					
				}

				this.existo=false;
				this.scene.buscar_este_objeto();
			}
		}else{
			
		}


	}
	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
