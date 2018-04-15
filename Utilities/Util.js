/**
 * Sources:
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 */

/**
 * The Util class contains various utility functions.
 */
class Util {

    /**
     * The isCollision method checks if there is a collision between the two inputted rectangles. This algorithm only
     * works with axis-aligned rectangles.
     * @param rectangle1 The first rectangle.
     * @param rectangle2 The second rectangle.
     * @returns {boolean} Whether there exists a collision between the two inputted rectangles.
     */
    static isCollision(rectangle1, rectangle2) {
        if(rectangle1.x < rectangle2.x + rectangle2.width &&
            rectangle1.x + rectangle1.width > rectangle2.x &&
            rectangle1.y < rectangle2.y + rectangle2.height &&
            rectangle1.y + rectangle1.height > rectangle2.y) {
            return true;
        }
        else {
            return false;
        }
    }

    static isWithin(x1, y1, width1, height1, x2, y2, width2, height2) {

    }
}

export default Util;