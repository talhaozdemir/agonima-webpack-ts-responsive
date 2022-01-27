
// You can write more code here
let uiWidth: number;
let uiHeight: number;
let scene: Phaser.Scene;

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";

export default class AlignToScreen extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__AlignToScreen"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): AlignToScreen {
		return (gameObject as any)["__AlignToScreen"];
	}

	private gameObject: Phaser.GameObjects.Image;
	public alignTo: "Center"|"Top Left"|"Top Right"|"Bottom Left"|"Bottom Right" = "Center";
	public paddingX: number = 0;
	public paddingY: number = 0;

	/* START-USER-CODE */
	start() {
		scene = this.gameObject.scene;
		uiWidth = scene.scale.gameSize.width;
		uiHeight = scene.scale.gameSize.height;

		scene.scale.on("resize", this.resize, this)



		this.resize();
	}

	resize() {
		if (!this.gameObject) {
			return
		}

		uiWidth = scene.scale.gameSize.width;
		uiHeight = scene.scale.gameSize.height;

		switch (this.alignTo) {
			case "Center":
				this.gameObject.x = uiWidth * 0.5 - ((0.5 - this.gameObject.originX) * this.gameObject.displayWidth) + this.paddingX;
				this.gameObject.y = uiHeight * 0.5 - ((0.5 - this.gameObject.originY) * this.gameObject.displayHeight) + this.paddingY;
				break;

			case "Top Left":
				this.gameObject.x = this.gameObject.displayWidth * this.gameObject.originX + this.paddingX;
				this.gameObject.y = this.gameObject.displayHeight * this.gameObject.originY + this.paddingY;
				break;

			case "Top Right":
				this.gameObject.x = uiWidth - this.gameObject.displayWidth * (1 - this.gameObject.originX) - this.paddingX;
				this.gameObject.y = this.gameObject.displayHeight * this.gameObject.originY + this.paddingY;
				break;

			case "Bottom Left":
				this.gameObject.x = this.gameObject.displayWidth * this.gameObject.originX + this.paddingX;
				this.gameObject.y = uiHeight - this.gameObject.displayHeight * (1 - this.gameObject.originY) - this.paddingY;
				break;

			case "Bottom Right":
				this.gameObject.x = uiWidth - this.gameObject.displayWidth * (1 - this.gameObject.originX) - this.paddingX;
				this.gameObject.y = uiHeight - this.gameObject.displayHeight * (1 - this.gameObject.originY) - this.paddingY;
				break;
			default:
				break;
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
