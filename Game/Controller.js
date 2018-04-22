/**
 *
 */
class Controller {

    /**
     *
     * @param documentBody
     */
    constructor(documentBody) {
        this.keysPressed = [];
        this.mouse = [0, 0];
        this.mousePressed = false;

        documentBody.addEventListener("keydown", (event) => {
            this.keysPressed[event.keyCode] = true;
        });

        documentBody.addEventListener("keyup", (event) => {
            this.keysPressed[event.keyCode] = false;
        });

        documentBody.addEventListener('mousemove', (event) => {
            this.mouse[0] = event.clientX;
            this.mouse[1] = event.clientY;
        });

        documentBody.addEventListener('mousedown', (event) => {
            this.mousePressed = true;
        });

        documentBody.addEventListener('mouseup', (event) => {
            this.mousePressed = false;
        });
    }

    /**
     *
     * @param key
     * @returns {*}
     */
    isKeyPressed(key) {
        return this.keysPressed[key];
    }

    /**
     *
     * @returns {boolean}
     */
    isMousePressed() {
        return this.mousePressed;
    }

    /**
     *
     * @returns {number[]}
     */
    getMousePosition() {
        return this.mouse;
    }
}

export default Controller;
