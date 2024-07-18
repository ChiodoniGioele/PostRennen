import { GameService } from '../../../service/game.service';
import { Game } from './game';
import { Initial } from '../view/initial';
import { Subscription } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Home {
    private canvas: HTMLCanvasElement;
    private game: Game | undefined;
    private gameStatusSubscription: Subscription | undefined;

    constructor(private gameService: GameService, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.game = new Game(canvas);

        document.addEventListener('keydown', this.handleKeyboardEvent.bind(this));

        const initialScreen = new Initial(gameService, canvas);
        initialScreen.draw();

        this.gameStatusSubscription = this.gameService.getGameStatus().subscribe((gameStatus: boolean) => {
            if (gameStatus) {
                if (!this.game?.status) {
                    this.game?.start();
                }
            } else {
                if (this.game?.status) {
                    this.game?.stop();
                }
            }
        });
    }

    private handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == 'Escape' && this.game?.status) {
            this.game?.stop();
        }
    }

    ngOnDestroy() {
        this.gameStatusSubscription?.unsubscribe();
    }
}
