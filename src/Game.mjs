
export default class Game {
    constructor() {
        this.currentScore = 0;
        this.highScore = this.loadHighScore();
    }

    addScore() {
        this.currentScore += 1;
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            this.saveHighScore();
        }
    }

    resetScore() {
        this.currentScore = 0;
    }

    loadHighScore() {
        try {
            const highScore = localStorage.getItem("highScore");
            return highScore ? parseInt(highScore, 10) : 0;
        } catch(error){
            console.error("Error loading", error);
            return 0;
        }
        
    }

    saveHighScore() {
        try {
            localStorage.setItem("highScore", this.highScore);
        } catch (error) {
            console.error("Error loading", error);
        }
       
    }

    getCurrentScore() {
        return this.currentScore;
    }

    getHighScore() {
        return this.highScore;
    }

    shuffleCards(card) {
        return card.sort(() => Math.random() - 0.5);
    }
}
