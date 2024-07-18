import {Game} from './game'; // Assicurati di importare correttamente la classe Game dal file corrispondente

export class Home {

    private canvas: HTMLCanvasElement;
    private game: Game | undefined;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.game = new Game(canvas);

        document.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
    }

    private handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case ' ':
                if (!this.game?.status) this.game?.start();
                break;
            case 'Escape':
                if (this.game?.status) this.game?.stop();
                break;
        }
    }
}
