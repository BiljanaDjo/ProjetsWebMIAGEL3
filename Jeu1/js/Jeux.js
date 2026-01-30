import { initListeners } from "./ecouteurs.js";
import Joueur from "./Joueur.js";

export default class Jeux {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.inputStates = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };

        this.joueur = new Joueur(5, 5);

        initListeners(this.inputStates);
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    update() {
        this.joueur.vx = 0;
        this.joueur.vy = 0;

        /*if (this.inputStates.ArrowLeft)  this.joueur.vx = -3;
        if (this.inputStates.ArrowRight) this.joueur.vx =  3;
        if (this.inputStates.ArrowUp)    this.joueur.vy = -3;
        if (this.inputStates.ArrowDown)  this.joueur.vy =  3;
        */
       if(this.inputStates.ArrowRight) {
            this.joueur.vx = 3;
        } 
        if(this.inputStates.ArrowLeft) {
            this.joueur.vx = -3;
        } 

        if(this.inputStates.ArrowUp) {
            this.joueur.vy = -3;
        } 

        if(this.inputStates.ArrowDown) {
            this.joueur.vy = 3;
        } 

        this.joueur.move();
        this.CollisionBordsEcran();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.joueur.draw(this.ctx);
    }

    CollisionBordsEcran() {
    // Gauche
        if (this.joueur.x < 0) {
            this.joueur.x = 0;
            this.joueur.vx = 0;
        }

        // Droite
        if (this.joueur.x + this.joueur.size > this.canvas.width) {
            this.joueur.x = this.canvas.width - this.joueur.size;
            this.joueur.vx = 0;
        }

    // Haut
        if (this.joueur.y < 0) {
            this.joueur.y = 0;
            this.joueur.vy = 0;
        }

    // Bas
        if (this.joueur.y + this.joueur.size > this.canvas.height) {
            this.joueur.y = this.canvas.height - this.joueur.size;
            this.joueur.vy = 0;
        }
    }   

}

