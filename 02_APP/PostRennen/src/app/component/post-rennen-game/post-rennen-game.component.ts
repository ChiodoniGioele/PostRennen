import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { GameService } from '../../service/game.service';
import { Home } from './controllers/home';
import {LocalStorageService} from "../../service/local-storage.service";

@Component({
    selector: 'app-post-rennen-game',
    templateUrl: './post-rennen-game.component.html',
    styleUrls: ['./post-rennen-game.component.css']
})
export class PostRennenGameComponent implements AfterViewInit {
    @ViewChild('game', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
    private home: Home | undefined;

    constructor(private gameService: GameService, private localStorageService: LocalStorageService) {}

    ngAfterViewInit() {
        this.resizeCanvas();
        this.startHome();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.resizeCanvas();
    }

    private resizeCanvas() {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    private startHome() {
        this.home = new Home(this.gameService, this.canvasRef.nativeElement, this.localStorageService);
    }
}
