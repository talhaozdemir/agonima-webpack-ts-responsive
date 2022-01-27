
// You can write more code here
import preloadPackUrl from "../../static/assets/preload-asset-pack.json";
import assetPackUrl from "../../static/assets/asset-pack.json";

/* START OF COMPILED CODE */

import Phaser from "phaser";
import AlignCanvas from "../components/AlignCanvas";
import PreloadText from "../components/PreloadText";

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// CanvasRef
		const canvasRef = this.add.image(480, 270, "canvasIcon");
		canvasRef.visible = false;

		// guapen
		const guapen = this.add.image(480, 270, "guapen");
		guapen.scaleX = 0.5;
		guapen.scaleY = 0.5;

		// progress
		const progress = this.add.text(480, 373, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({ "fontSize": "30px" });

		// canvasRef (components)
		new AlignCanvas(canvasRef);

		// progress (components)
		new PreloadText(progress);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.load.pack("preload-asset-pack", preloadPackUrl);
		this.load.pack("asset-pack", assetPackUrl);

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
