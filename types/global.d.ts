declare global {
    var screenBaseSize: {
        width: number,
        height: number
    }

    var gameAreaLeftX: number

    var gameAreaRightX: number
    var gameAreaTopY: number

    var gameAreaBottomY: number
    var gameAreaCenterX: number
    var gameAreaCenterY: number
    var gameAreaAvailableSpace: {
        left: number,
        right: number,
        top: number,
        bottom: number
    }

    var gameWidth: number;
    var gameHeight: number;

    var zoomScalar: number;
}
export { };