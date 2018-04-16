//Just a plus cursor to be rendered at the
//cursor's location each Update
//The cursor for the entire HTML document is turned off via styling on the document.
class Cursor {
    constructor() {
        this.loadImage();
    }

    loadImage() {
        this.isImageLoaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.isImageLoaded = true;
        };
        this.image.src = "Graphics/crosshair.png";
    }
}
export default Cursor;
