/**
 * The Controller class listens for user inputs and stores what is being pressed.
 */
class Controller {

    /**
     * The constructor initializes the fields of the Controller. It also adds event listeners for keydown, keyup, mousemove,
     * mousedown, and mouseup.
     * @param documentBody The body of the document.
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
     * This function returns if the inputted key is being pressed.
     * @param key The key to check.
     * @returns {boolean} Whether the key is being pressed.
     */
    isKeyPressed(key) {
        return this.keysPressed[key];
    }

    /**
     * This function checks if the mouse is being pressed.
     * @returns {boolean} Whether the mouse is pressed.
     */
    isMousePressed() {
        return this.mousePressed;
    }

    /**
     * This function returns the mouse position.
     * @returns {number[]} The x and y position of the mouse as an array. ([x,y])
     */
    getMousePosition() {
        return this.mouse;
    }
}

export default Controller;
