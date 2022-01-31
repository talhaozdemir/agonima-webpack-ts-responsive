
// You can write more code here
let gameWidth: number;
let gameHeight: number;
let scene: Phaser.Scene;
let scalarsVer: {
	gameArea: number,
	minLeftWidth: number,
	minRightWidth: number,
	minUpHeight: number,
	minDownHeight: number,
};

let scalarsHor: {
	gameArea: number,
	minLeftWidth: number,
	minRightWidth: number,
	minUpHeight: number,
	minDownHeight: number,
};

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
	public alignVer: "top"|"center"|"bottom" = "center";
	public gameAreaVer: number = 10;
	public minLeftWidthVer: number = 0;
	public minRightWidthVer: number = 0;
	public minUpHeightVer: number = 0;
	public minDownHeightVer: number = 0;
	public alignHor: "left"|"center"|"right" = "center";
	public gameAreaHor: number = 10;
	public minLeftWidthHor: number = 0;
	public minRightWidthHor: number = 0;
	public minUpHeightHor: number = 0;
	public minDownHeightHor: number = 0;

	/* START-USER-CODE */

	// Write your code here.
	startResizeComponent() {
		scalarsVer = {
			gameArea: Math.abs(this.gameAreaVer),
			minLeftWidth: Math.abs(this.minLeftWidthVer),
			minRightWidth: Math.abs(this.minRightWidthVer),
			minUpHeight: Math.abs(this.minUpHeightVer),
			minDownHeight: Math.abs(this.minDownHeightVer),
		}

		scalarsHor = {
			gameArea: Math.abs(this.gameAreaHor),
			minLeftWidth: Math.abs(this.minLeftWidthHor),
			minRightWidth: Math.abs(this.minRightWidthHor),
			minUpHeight: Math.abs(this.minUpHeightHor),
			minDownHeight: Math.abs(this.minDownHeightHor),
		}

		scene = this.gameObject.scene;
		scene.scale.on("resize", this.resize, this)
		this.resize({ width: scene.scale.gameSize.width, height: scene.scale.gameSize.height })
	}

	// Write your code here.


	resize(gameSize: any) {
		let gameWidth = gameSize.width;
		let gameHeight = gameSize.height;

		const iW = globalThis.screenBaseSize.width; // from config
		const iH = globalThis.screenBaseSize.height;

		const camera = scene.cameras.main;

		const minScale = Math.min(gameWidth / iW, gameHeight / iH);

		let paddingTotalWidth;
		let paddingLeftWidth;
		let paddingRightWidth;
		let paddingTotalHeight;
		let paddingUpHeight;
		let paddingDownHeight;
		let gameAreaNetWidth;
		let gameAreaNetHeight;

		if (gameWidth > gameHeight) {
			paddingTotalWidth = (scalarsHor.minLeftWidth + scalarsHor.minRightWidth) / (scalarsHor.gameArea + scalarsHor.minLeftWidth + scalarsHor.minRightWidth);
			paddingLeftWidth = scalarsHor.minLeftWidth / (scalarsHor.gameArea + scalarsHor.minLeftWidth + scalarsHor.minRightWidth);
			paddingRightWidth = scalarsHor.minRightWidth / (scalarsHor.gameArea + scalarsHor.minLeftWidth + scalarsHor.minRightWidth);

			paddingTotalHeight = (scalarsHor.minUpHeight + scalarsHor.minDownHeight) / (scalarsHor.gameArea + scalarsHor.minUpHeight + scalarsHor.minDownHeight);
			paddingUpHeight = scalarsHor.minUpHeight / (scalarsHor.gameArea + scalarsHor.minUpHeight + scalarsHor.minDownHeight);
			paddingDownHeight = scalarsHor.minDownHeight / (scalarsHor.gameArea + scalarsHor.minUpHeight + scalarsHor.minDownHeight);

			gameAreaNetWidth = scalarsHor.gameArea / (scalarsHor.gameArea + scalarsHor.minLeftWidth + scalarsHor.minRightWidth);
			gameAreaNetHeight = scalarsHor.gameArea / (scalarsHor.gameArea + scalarsHor.minUpHeight + scalarsHor.minDownHeight);


		} else {
			paddingTotalWidth = (scalarsVer.minLeftWidth + scalarsVer.minRightWidth) / (scalarsVer.gameArea + scalarsVer.minLeftWidth + scalarsVer.minRightWidth);
			paddingLeftWidth = scalarsVer.minLeftWidth / (scalarsVer.gameArea + scalarsVer.minLeftWidth + scalarsVer.minRightWidth);
			paddingRightWidth = scalarsVer.minRightWidth / (scalarsVer.gameArea + scalarsVer.minLeftWidth + scalarsVer.minRightWidth);

			paddingTotalHeight = (scalarsVer.minUpHeight + scalarsVer.minDownHeight) / (scalarsVer.gameArea + scalarsVer.minUpHeight + scalarsVer.minDownHeight);
			paddingUpHeight = scalarsVer.minUpHeight / (scalarsVer.gameArea + scalarsVer.minUpHeight + scalarsVer.minDownHeight);
			paddingDownHeight = scalarsVer.minDownHeight / (scalarsVer.gameArea + scalarsVer.minUpHeight + scalarsVer.minDownHeight);

			gameAreaNetWidth = scalarsVer.gameArea / (scalarsVer.gameArea + scalarsVer.minLeftWidth + scalarsVer.minRightWidth);
			gameAreaNetHeight = scalarsVer.gameArea / (scalarsVer.gameArea + scalarsVer.minUpHeight + scalarsVer.minDownHeight);
		}

		const SCALED_SCREEN_BASESIZE_WIDTH = iW * minScale;
		const SCALED_SCREEN_BASESIZE_HEIGHT = iH * minScale;

		const WIDTH_WITH_PADDING = (gameWidth * gameAreaNetWidth / SCALED_SCREEN_BASESIZE_WIDTH)
		const HEIGHT_WITH_PADDING = (gameHeight * gameAreaNetHeight / SCALED_SCREEN_BASESIZE_HEIGHT);
		const SCALAR = Math.min(HEIGHT_WITH_PADDING, WIDTH_WITH_PADDING);

		camera.setZoom(minScale * SCALAR * (globalThis.zoomScalar || 1)); // use zoomScalar to change camera zoom

		const sX = 2;
		const sY = 2;
		if (gameWidth > gameHeight) {
			const upSpaceRatio = scalarsHor.minUpHeight / (scalarsHor.minDownHeight + scalarsHor.minUpHeight) || 0;
			const downSpaceRatio = scalarsHor.minDownHeight / (scalarsHor.minDownHeight + scalarsHor.minUpHeight) || 0;
			const offsetY = -(gameHeight * paddingTotalHeight) * ((downSpaceRatio - upSpaceRatio) * 0.5) - gameHeight / sY;

			if (this.alignHor == "right") {

				camera.setViewport(
					-paddingRightWidth * gameWidth - SCALED_SCREEN_BASESIZE_WIDTH / sX * SCALAR,
					offsetY,
					gameWidth * sX,
					gameHeight * sY
				);

				globalThis.gameAreaLeftX = gameWidth - paddingRightWidth * gameWidth - SCALED_SCREEN_BASESIZE_WIDTH * SCALAR;
			} else if (this.alignHor == "left") {

				camera.setViewport(
					-gameWidth + paddingLeftWidth * gameWidth + SCALED_SCREEN_BASESIZE_WIDTH * 0.5 * SCALAR,
					offsetY,
					gameWidth * sX,
					gameHeight * sY
				);

				globalThis.gameAreaLeftX = paddingLeftWidth * gameWidth;
			} else if (this.alignHor == "center") {

				camera.setViewport(
					(paddingLeftWidth - paddingRightWidth) * gameWidth * 0.5 - gameWidth / sX,
					offsetY,
					gameWidth * sX,
					gameHeight * sY
				);

				globalThis.gameAreaLeftX = gameWidth * 0.5 - gameWidth * (paddingRightWidth - paddingLeftWidth) * 0.5 - SCALED_SCREEN_BASESIZE_WIDTH * 0.5 * SCALAR;
			}

			globalThis.gameAreaCenterX = gameWidth * 0.5 - gameWidth * (paddingRightWidth - paddingLeftWidth) * 0.5;
			globalThis.gameAreaCenterY = gameHeight - SCALED_SCREEN_BASESIZE_WIDTH * paddingDownHeight - SCALED_SCREEN_BASESIZE_HEIGHT * (1 - paddingTotalHeight) * 0.5;
			globalThis.gameAreaTopY = globalThis.gameAreaCenterY - SCALED_SCREEN_BASESIZE_HEIGHT * 0.5 * SCALAR;
			globalThis.gameAreaBottomY = gameHeight - SCALED_SCREEN_BASESIZE_HEIGHT * paddingDownHeight;
			globalThis.gameAreaRightX = globalThis.gameAreaLeftX + SCALED_SCREEN_BASESIZE_WIDTH * SCALAR;
			globalThis.gameAreaAvailableSpace = {
				left: globalThis.gameAreaLeftX,
				right: gameWidth - globalThis.gameAreaRightX,
				top: globalThis.gameAreaTopY,
				bottom: gameHeight - globalThis.gameAreaBottomY
			}

		} else {
			const leftSpaceRatio = scalarsVer.minLeftWidth / (scalarsVer.minLeftWidth + scalarsVer.minRightWidth) || 0;
			const rightSpaceRatio = scalarsVer.minRightWidth / (scalarsVer.minLeftWidth + scalarsVer.minRightWidth) || 0;
			const offsetX = -(gameWidth * paddingTotalWidth) * ((rightSpaceRatio - leftSpaceRatio) * 0.5) - gameWidth / sX;

			if (this.alignVer == "bottom") {

				camera.setViewport(
					offsetX,
					-paddingDownHeight * gameHeight - SCALED_SCREEN_BASESIZE_HEIGHT / sY * SCALAR,
					gameWidth * sX,
					gameHeight * sY
				);

				globalThis.gameAreaTopY = gameHeight - paddingDownHeight * gameHeight - SCALED_SCREEN_BASESIZE_HEIGHT * SCALAR;

			} else if (this.alignVer == "top") {

				camera.setViewport(
					offsetX,
					-gameHeight + paddingUpHeight * gameHeight + SCALED_SCREEN_BASESIZE_HEIGHT / sY * SCALAR,
					gameWidth * sX,
					gameHeight * sY
				);

				globalThis.gameAreaTopY = paddingUpHeight * gameHeight;

			} else if (this.alignVer == "center") {

				camera.setViewport(
					offsetX,
					(paddingUpHeight - paddingDownHeight) * gameHeight * 0.5 - gameHeight / sY,
					gameWidth * sX,
					gameHeight * sY
				);

				globalThis.gameAreaTopY = gameHeight * 0.5 + gameHeight * (paddingUpHeight - paddingDownHeight) * 0.5 - SCALED_SCREEN_BASESIZE_HEIGHT * 0.5 * SCALAR;

			}

			globalThis.gameAreaLeftX = gameWidth * 0.5 - gameWidth * (paddingRightWidth - paddingLeftWidth) * 0.5 - SCALED_SCREEN_BASESIZE_WIDTH * 0.5 * SCALAR;
			globalThis.gameAreaRightX = globalThis.gameAreaLeftX + SCALED_SCREEN_BASESIZE_WIDTH * SCALAR;
			globalThis.gameAreaBottomY = globalThis.gameAreaTopY + SCALED_SCREEN_BASESIZE_HEIGHT * SCALAR;
			globalThis.gameAreaCenterX = globalThis.gameAreaLeftX + SCALED_SCREEN_BASESIZE_WIDTH * SCALAR * 0.5;
			globalThis.gameAreaCenterY = globalThis.gameAreaTopY + SCALED_SCREEN_BASESIZE_HEIGHT * SCALAR * 0.5;
			globalThis.gameAreaAvailableSpace = {
				left: globalThis.gameAreaLeftX,
				right: gameWidth - globalThis.gameAreaRightX,
				top: globalThis.gameAreaTopY,
				bottom: gameHeight - globalThis.gameAreaBottomY
			}

		}

		camera.scrollX = iW * 0.5 - camera.width * 0.5;
		camera.scrollY = iH * 0.5 - camera.height * 0.5;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
