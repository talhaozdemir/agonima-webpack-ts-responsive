
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import AlignCanvas from "../components/AlignCanvas";
import PushOnClick from "../components/PushOnClick";

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// CanvasRef
		const canvasRef = this.add.image(0, 0, "canvasIcon");
		canvasRef.visible = false;

		// bg
		const bg = this.add.image(480, 270, "bg");

		// fufuSuperDino
		const fufuSuperDino = this.add.image(480, 270, "FufuSuperDino");

		// canvasRef (components)
		new AlignCanvas(canvasRef);

		// fufuSuperDino (components)
		new PushOnClick(fufuSuperDino);

		this.bg = bg;
		this.fufuSuperDino = fufuSuperDino;

		this.events.emit("scene-awake");
	}

	private bg!: Phaser.GameObjects.Image;
	public fufuSuperDino!: Phaser.GameObjects.Image;

	/* START-USER-CODE */
	// Write your code here

	create() {

		this.editorCreate();

		this.scene.launch("Ui");

		// Hide in production
		// Reference guide rectangle
		const safeArea = this.add.rectangle(0, 0, globalThis.screenBaseSize.width, globalThis.screenBaseSize.height, 0xffffff, 0).setOrigin(0).setDepth(1);
		safeArea.setStrokeStyle(2, 0x1a65ac);

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
