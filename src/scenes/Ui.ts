
// You can write more code here
let canvasWidth, canvasHeight;

/* START OF COMPILED CODE */

import Phaser from "phaser";
import AlignToScreen from "../components/AlignToScreen";

export default class Ui extends Phaser.Scene {

	constructor() {
		super("Ui");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// audioIcon
		const audioIcon = this.add.image(0, 0, "audioOn");

		// audioIcon (components)
		const audioIconAlignToScreen = new AlignToScreen(audioIcon);
		audioIconAlignToScreen.alignTo = "Top Left";

		this.audioIcon = audioIcon;

		this.events.emit("scene-awake");
	}

	public audioIcon!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.audioIcon.setInteractive().on("pointerdown", () => {
			this.audioIcon.texture.key == "audioOn" ? this.audioIcon.setTexture("audioOff") : this.audioIcon.setTexture("audioOn");
		});

		this.scale.on("resize", this.resize, this);
		this.resize();
	}

	resize() {
		canvasWidth = this.sys.game.canvas.width;
		canvasHeight = this.sys.game.canvas.height;

		this.audioIcon.setScale(Math.min(canvasWidth * 0.1 / this.audioIcon.width, canvasHeight * 0.1 / this.audioIcon.height));


		// // *** DISABLE 'ALIGNTOSCREEN' COMPONENT ***
		// if (canvasWidth > canvasHeight) {
		// 	this.audioIcon.x = globalThis.gameAreaLeft.x - globalThis.canvasAvailableSpace.width * 0.5; // center to left space horizontally
		// 	this.audioIcon.y = globalThis.gameAreaCenter.y; // center to space vertically
		// } else {
		// 	this.audioIcon.x = globalThis.gameAreaCenter.x;
		// 	this.audioIcon.y = globalThis.gameAreaTop.y - globalThis.canvasAvailableSpace.height * 0.5;
		// }
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
