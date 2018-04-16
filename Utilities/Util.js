/*
  Sources:
  https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
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

    /**
     * This function checks if there are any collisions between the two arrays. This algorithm only works with
     * axis-aligned rectangles.
     * @param array1 An array of rectangles.
     * @param array2 An array of rectangles.
     * @returns {integer} -1 if there are no collisions or the index of the first array if there is.
     */
    static areAnyCollisions(array1, array2) {
        for(let i = 0; i < array1.length; i++) {
            for(let j = 0; j < array2.length; j++) {
                if(this.isCollision(array1[i], array2[j]))
                    return i;
            }
        }
        return -1;
    }

    /**
     * This function returns a random number in the given interval.
     * @param from
     * @param to
     * @returns {number}
     */
    static randomIntFromInterval(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from)
    }
}

export default Util;