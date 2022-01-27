import Phaser from "phaser";
import Level from "./scenes/Level";
import preloadPackUrl from "../static/assets/preload-asset-pack.json";
import Preload from "./scenes/Preload";
import Ui from "./scenes/Ui";

class Boot extends Phaser.Scene {

	constructor() {
		super("Boot");
	}

	preload() {

		this.load.pack("pack", preloadPackUrl);
	}

	create() {

		this.scene.start("Preload");
	}
}

window.addEventListener('load', function () {
	const SIZE_WIDTH_SCREEN = 960;
	const SIZE_HEIGHT_SCREEN = 540;

	globalThis.screenBaseSize = {
		width: SIZE_WIDTH_SCREEN,
		height: SIZE_HEIGHT_SCREEN
	};

	const game = new Phaser.Game({
		type: Phaser.AUTO,
		scale: {
			mode: Phaser.Scale.RESIZE,
			parent: 'game',
			width: SIZE_WIDTH_SCREEN,
			height: SIZE_HEIGHT_SCREEN
		},
		dom: {
			createContainer: true
		},
		backgroundColor: "#2f2f2f",
		scene: [Boot, Preload, Level, Ui]
	});

	game.scene.start("Boot");
});