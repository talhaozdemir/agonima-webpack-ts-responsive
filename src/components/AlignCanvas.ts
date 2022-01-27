
// You can write more code here
let gameWidth: number;
let gameHeight: number;
let scene: Phaser.Scene;

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";

export default class AlignCanvas extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__AlignCanvas"] = this;

		/* START-USER-CTR-CODE */
		gameObject.scene.events.once("scene-awake", () => {
			this.startResizeComponent();
		});
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): AlignCanvas {
		return (gameObject as any)["__AlignCanvas"];
	}

	private gameObject: Phaser.GameObjects.Image;
	public alignVer: "top" | "center" | "bottom" = "center";
	public alignHor: "left" | "center" | "right" = "center";

	/* START-USER-CODE */

	// Write your code here.
	startResizeComponent() {

		gameWidth = globalThis.screenBaseSize.width;
		gameHeight = globalThis.screenBaseSize.height;

		scene = this.gameObject.scene;
		scene.scale.on("resize", this.resize, this)
		this.resize({ width: scene.scale.gameSize.width, height: scene.scale.gameSize.height })
	}

	// Write your code here.


	resize(gameSize: any) {
		let gameWidth = gameSize.width * 1;
		let gameHeight = gameSize.height * 1;
		const camera = scene.cameras.main;

		const scaleX = (gameWidth / globalThis.screenBaseSize.width) / 1;
		const scaleY = (gameHeight / globalThis.screenBaseSize.height) / 1;
		let minScale = Math.min(scaleX, scaleY);

		camera.setZoom(minScale);

		const SCALED_SCREEN_BASESIZE_WIDTH = globalThis.screenBaseSize.width * minScale;
		const SCALED_SCREEN_BASESIZE_HEIGHT = globalThis.screenBaseSize.height * minScale;

		if (gameWidth > gameHeight) {
			if (this.alignHor == "right") {
				camera.setViewport(-SCALED_SCREEN_BASESIZE_WIDTH * 0.5, 0, window.innerWidth * 2, window.innerHeight);

				globalThis.gameAreaLeft = { x: window.innerWidth - SCALED_SCREEN_BASESIZE_WIDTH, y: 0 }
				globalThis.gameAreaTop = { x: 0, y: 0 }
				globalThis.gameAreaRight = { x: window.innerWidth, y: 0 }
				globalThis.gameAreaBottom = { x: 0, y: window.innerHeight }
				globalThis.gameAreaCenter = { x: window.innerWidth - SCALED_SCREEN_BASESIZE_WIDTH * 0.5, y: window.innerHeight - SCALED_SCREEN_BASESIZE_HEIGHT * 0.5 }
				globalThis.canvasAvailableSpace = { width: window.innerWidth - SCALED_SCREEN_BASESIZE_WIDTH, height: window.innerHeight }
			} else if (this.alignHor == "left") {
				camera.setViewport(-window.innerWidth + SCALED_SCREEN_BASESIZE_WIDTH * 0.5, 0, window.innerWidth * 2, window.innerHeight);

				globalThis.gameAreaLeft = { x: 0, y: 0 }
				globalThis.gameAreaTop = { x: 0, y: 0 }
				globalThis.gameAreaRight = { x: SCALED_SCREEN_BASESIZE_WIDTH, y: 0 }
				globalThis.gameAreaBottom = { x: 0, y: window.innerHeight }
				globalThis.gameAreaCenter = { x: SCALED_SCREEN_BASESIZE_WIDTH * 0.5, y: window.innerHeight - SCALED_SCREEN_BASESIZE_HEIGHT * 0.5 }
				globalThis.canvasAvailableSpace = { width: window.innerWidth - SCALED_SCREEN_BASESIZE_WIDTH, height: window.innerHeight }
			} else if (this.alignHor == "center") {
				camera.setViewport(0, 0, window.innerWidth, window.innerHeight);

				globalThis.gameAreaLeft = { x: (window.innerWidth - SCALED_SCREEN_BASESIZE_WIDTH) * 0.5, y: 0 }
				globalThis.gameAreaTop = { x: 0, y: 0 }
				globalThis.gameAreaRight = { x: (window.innerWidth + SCALED_SCREEN_BASESIZE_WIDTH) * 0.5, y: 0 }
				globalThis.gameAreaBottom = { x: 0, y: window.innerHeight }
				globalThis.gameAreaCenter = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
				globalThis.canvasAvailableSpace = { width: (window.innerWidth - SCALED_SCREEN_BASESIZE_WIDTH) * 0.5, height: window.innerHeight }
			}
		} else {
			if (this.alignVer == "bottom") {
				camera.setViewport(0, - SCALED_SCREEN_BASESIZE_HEIGHT * 0.5, window.innerWidth, window.innerHeight * 2);

				globalThis.gameAreaLeft = { x: 0, y: 0 }
				globalThis.gameAreaTop = { x: 0, y: window.innerHeight - SCALED_SCREEN_BASESIZE_HEIGHT }
				globalThis.gameAreaRight = { x: SCALED_SCREEN_BASESIZE_WIDTH, y: 0 }
				globalThis.gameAreaBottom = { x: 0, y: window.innerHeight }
				globalThis.gameAreaCenter = { x: window.innerWidth * 0.5, y: window.innerHeight - SCALED_SCREEN_BASESIZE_HEIGHT * 0.5 }
				globalThis.canvasAvailableSpace = { width: window.innerWidth, height: window.innerHeight - SCALED_SCREEN_BASESIZE_HEIGHT }
			} else if (this.alignVer == "top") {
				camera.setViewport(0, -window.innerHeight + SCALED_SCREEN_BASESIZE_HEIGHT * 0.5, window.innerWidth, window.innerHeight * 2);

				globalThis.gameAreaLeft = { x: 0, y: 0 }
				globalThis.gameAreaTop = { x: 0, y: 0 }
				globalThis.gameAreaRight = { x: SCALED_SCREEN_BASESIZE_WIDTH, y: 0 }
				globalThis.gameAreaBottom = { x: 0, y: SCALED_SCREEN_BASESIZE_HEIGHT }
				globalThis.gameAreaCenter = { x: window.innerWidth * 0.5, y: SCALED_SCREEN_BASESIZE_HEIGHT * 0.5 }
				globalThis.canvasAvailableSpace = { width: window.innerWidth, height: window.innerHeight - SCALED_SCREEN_BASESIZE_HEIGHT }
			} else if (this.alignVer == "center") {
				camera.setViewport(0, 0, window.innerWidth, window.innerHeight);

				globalThis.gameAreaLeft = { x: 0, y: 0 }
				globalThis.gameAreaTop = { x: 0, y: (window.innerHeight - SCALED_SCREEN_BASESIZE_HEIGHT) * 0.5 }
				globalThis.gameAreaRight = { x: SCALED_SCREEN_BASESIZE_WIDTH, y: 0 }
				globalThis.gameAreaBottom = { x: 0, y: (window.innerHeight + SCALED_SCREEN_BASESIZE_HEIGHT) * 0.5 }
				globalThis.gameAreaCenter = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
				globalThis.canvasAvailableSpace = { width: window.innerWidth, height: (window.innerHeight - (window.innerHeight + SCALED_SCREEN_BASESIZE_HEIGHT) * 0.5) }
			}
		}

		camera.scrollX = globalThis.screenBaseSize.width * 0.5 - camera.width * 0.5;
		camera.scrollY = globalThis.screenBaseSize.height * 0.5 - camera.height * 0.5;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
