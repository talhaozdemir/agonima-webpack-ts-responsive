
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


		// // *** DISABLE 'ALIGNTOSCREEN' COMPONENT TO USE CUSTOM RESIZE! ***
		/**
		 * AVAILABLE PARAMETERS
		 * globalThis.gameAreaRightX
		 * globalThis.gameAreaLeftX
		 * globalThis.gameAreaTopY
		 * globalThis.gameAreaBottomY
		 * globalThis.gameAreaAvailableSpace.left
		 * globalThis.gameAreaAvailableSpace.right
		 * globalThis.gameAreaAvailableSpace.top
		 * globalThis.gameAreaAvailableSpace.bottom
		 */

		// if (canvasWidth > canvasHeight) {
		// 	this.audioIcon.x = globalThis.gameAreaLeftX - globalThis.gameAreaAvailableSpace.left * 0.5;
		// 	this.audioIcon.y = globalThis.gameAreaCenterY;
		// } else {
		// 	this.audioIcon.x = globalThis.gameAreaCenterX;
		// 	this.audioIcon.y = globalThis.gameAreaTopY - globalThis.gameAreaAvailableSpace.top * 0.5;
		// }
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
