# Webpack + TypeScript + Responsive project template for Phaser Editor 2D

A project template for Phaser 3, Webpack 5, TypeScript, and Phaser Editor 2D v3. Responsive template that you can align game canvas to edges of the screen.

## First steps

This project requires [Node.js](https://nodejs.org) and [NPM.js](https://www.npmjs.com). It is recommended that you learn the basics of [Webpack.js](https://www/webpack.js.org).

* Install dependencies:

    ```
    npm install
    ```

* Run the development server:

    ```
    npm start
    ```

    Open the browser at `http://127.0.0.1:8080`.

* Make a production build:

    ```
    npm run build
    ```

    It is generated in the `/dist` folder.

## Run the editor

* You can run the editor using the `editor` NPM script, defined in the `package.json` file:

    ```bash
    $ npm install
    $ npm run editor
    ```

* If you are in a remote environment (like the Gitpod.io IDE), then run the editor like this:

    ```bash
    $ npm run editor-remote
    ```

* If you want to see all the editor options, run:

    ```bash
    $ npx phasereditor2d-launcher -help
    ```

* If Phaser Editor 2D Core is globally installed, you can run:

    ```bash
    $ PhaserEditor2D -project .
    ```

## Responsiveness

There is an 'AlignCanvas' component in the template. You can align the canvas left, right or center for the landscape and top, bottom or center for the portrait orientation.

You can also locate ui elements to the edges of the screen with 'AlignToScreen' component or you can write your own resize method to locate GameObjects wherever you want!

On the other hand, you will see 'gameAreaLeft, gameAreaTop, gameAreaRight, gameAreaBottom, gameAreaCenter, canvasAvailableSpace' properties in the 'AlignCanvas' component. You can use these responsive data to avoid objects overlapping. You can fit ui GameObjects to spaces in the canvas with using 'canvasAvailableSpace' data. This data returns width and height value that is available in the canvas other than game area. You can see an example in Ui scene resize method.

I recommend this template for making mobile games.

## Author

Created by the Phaser Editor 2D team and added responsiveness by Agonima who is an HTML5 Game Developer.
