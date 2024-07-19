import {GameService} from '../../../service/game.service';
import {Game} from './game';
import {Initial} from '../view/initial';
import {Subscription} from 'rxjs';
import {Injectable} from "@angular/core";
import {LocalStorageService} from "../../../service/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class Home {
    private canvas: HTMLCanvasElement;
    private game: Game | undefined;
    private gameStatusSubscription: Subscription | undefined;
    private diedSubscription: Subscription | undefined;

    constructor(private gameService: GameService, canvas: HTMLCanvasElement, private localStorage: LocalStorageService) {
        this.canvas = canvas;
        this.game = new Game(canvas, localStorage, gameService);

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

        this.diedSubscription = this.gameService.getDied().subscribe((died: boolean) => {
            if (died) {
                initialScreen.draw();
            }
        });
    }

    private handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == 'p' && this.game?.status) {
            this.game?.stop();
        }
    }

    ngOnDestroy() {
        this.gameStatusSubscription?.unsubscribe();
        this.diedSubscription?.unsubscribe();
    }
}
