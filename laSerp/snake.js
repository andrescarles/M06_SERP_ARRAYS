/**
 * Classe que representa el joc de la serp (snake).
 * @class
 */
class Game {

    /**
     * Inicialitza els paràmetres del joc i crea el canvas
     * @constructor
     * @param {number} width -  width del canvas
     * @param {number} height -  height del canvas
     * @param {number} amount -  nombre de quadrats per fila de la quadrícula
     */
    constructor(width, height, amount) {
        this.width = width;
        this.height = height;
        this.amount = amount;
        this.serp = [];
        this.food = { x: 0, y: 0 };
        this.direccion;
        this.puntuacion;
        this.initCanvas();
        this.start();
        this.puntuacion;
        this.directionChanged = false;
    }

    /**
     * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
     * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
     * @param {number} width -  width del canvas
     * @param {number} height -  height del canvas
     */
    initCanvas() {
        let canvasElem = document.createElement('canvas');
        document.body.appendChild(canvasElem);
        canvasElem.id = "canvas";
        canvasElem.width = this.width;
        canvasElem.height = this.height;
        canvasElem.style.border = "2px solid black";
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.stroke();
    }

    /**
     * Inicialitza els paràmetres del joc:
     * Serp al centre, direcció cap a la dreta, puntuació 0
     */
    start() {
        this.serp.push({ x: this.width / 2, y: this.height / 2 });
        this.direccion = "right";
        this.puntuacion = 0;
    }

    /**
     * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
     * @param {number} x -  posició x de la quadrícula (no del canvas)
     * @param {number} y -  posició y de la quadrícula (no del canvas)
     * @param {string} color -  color del quadrat
     */
    drawSquare(x, y, color) {
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.amount, this.amount);
        ctx.stroke();
    }

    /**
     * Neteja el canvas (pinta'l de blanc)
     */
    clear() {
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.stroke();
    }

    /**
     * Dibuixa la serp al canvas
     */
    drawSnake() {
        this.serp.forEach(element => this.drawSquare(element.x, element.y, "black"));
        /*
        for (let i = 0; i < this.serp.length; i++) {
            this.drawSquare(this.serp[i].x, this.serp[i].y, "black")
        }
        */
    }

    /**
     * Dibuixa la poma al canvas
     */
    drawFood() {
        this.drawSquare(this.food.x, this.food.y, "red")
    }

    /**
     * La serp xoca amb la posició donada?
     * @param {number} x -  posició x a comprovar
     * @param {number} y -  posició y a comprovar
     * @return {boolean} - xoca o no
     */
    collides(x, y) {
        let colision = (element) => JSON.stringify(element) === JSON.stringify({ x: x, y: y });
        return this.serp.some(colision, this);

        /*
            for (let i = 0; i < this.serp.length; i++) {
                let snakePosition = JSON.stringify(this.serp[i]);
                let positionValue = JSON.stringify({ x: x, y: y });
                if (snakePosition === positionValue) {
                    return true
                }
            }    
        */
    }

    /**
     * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
     */
    addFood() {
        do {
            this.food.x = Math.round((Math.random() * (this.width - this.amount)) / this.amount) * this.amount;
            this.food.y = Math.round((Math.random() * (this.height - this.amount)) / this.amount) * this.amount;
        } while (this.collides(this.food))
    }

    /**
     * Calcula una nova posició a partir de la ubicació de la serp
     * @return {Array} - nova posició
     */
    newTile() {

        switch (this.direccion) {
            // (((that.snake[that.snake.length - 1].x + newValue.x) % that.sizeBoard) + that.sizeBoard) % that.sizeBoard
            case "right":
                return { x: (((this.serp[this.serp.length - 1].x + this.amount) % this.width) + this.width) % this.width, y: this.serp[this.serp.length - 1].y }
            case "left":
                return { x: (((this.serp[this.serp.length - 1].x - this.amount) % this.width) + this.width) % this.width, y: this.serp[this.serp.length - 1].y }
            case "up":
                return { x: this.serp[this.serp.length - 1].x, y: (((this.serp[this.serp.length - 1].y - this.amount) % this.height) + this.height) % this.height }
            case "down":
                return { x: this.serp[this.serp.length - 1].x, y: (((this.serp[this.serp.length - 1].y + this.amount) % this.height) + this.height) % this.height }
        }

    }

    /**
     * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
     * i ho dibuixa al canvas
     */
    step() {
        this.directionChanged = false;
        let that = this
        let nuevaDireccion = this.newTile();
        if (this.collides(nuevaDireccion.x, nuevaDireccion.y)) {
            console.log("fin")
            that.drawSquare(nuevaDireccion.x, nuevaDireccion.y, "grey")
            clearInterval(x);
        } else {
            this.serp.push(nuevaDireccion)

            if (this.collides(this.food.x, this.food.y)) {
                this.addFood()
                this.puntuacion++;
                document.getElementById("puntuacion").innerHTML = this.puntuacion
            } else {
                this.serp.shift()
            }
            this.clear()
            this.drawSnake()
            this.drawFood()
        }
    }


    /**
     * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
     * @param {event} e - l'event de la tecla premuda
     */

    input(e) {
        e = e || window.event;
        if (!this.directionChanged) {
            if (e.keyCode === 38 & this.direccion != "down") {
                this.direccion = "up"
            } else if (e.keyCode === 40 & this.direccion != "up") {
                this.direccion = "down"
            } else if (e.keyCode === 37 & this.direccion != "right") {
                this.direccion = "left"
            } else if (e.keyCode === 39 & this.direccion != "left") {
                this.direccion = "right"
            }
            this.directionChanged = true;
        }
    }

}


let game = new Game(300, 300, 15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
let x = window.setInterval(game.step.bind(game), 100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms