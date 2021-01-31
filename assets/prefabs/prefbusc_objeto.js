
// You can write more code here

/* START OF COMPILED CODE */

class prefbusc_objeto extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "media", frame);
		
		/** @type {Phaser.GameObjects.Sprite} */
		this.media;
		
		/* START-USER-CTR-CODE */
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */
start(){
		const arcade = this.scene.physics;		
		arcade.add.existing(this);
		var body = this.body;
		body.setSize(this.width, this.height);
		//this.scaleX=0.6;
		//this.scaleY=0.6;
		
		
	}

	update(){
			
	}
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
