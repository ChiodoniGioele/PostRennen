import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {Game} from "./controllers/game";
import {Home} from "./controllers/home";

@Component({
    selector: 'app-post-rennen-game',
    templateUrl: './post-rennen-game.component.html',
    styleUrls: ['./post-rennen-game.component.css']
})
export class PostRennenGameComponent implements AfterViewInit {

    @ViewChild('game', {static: false}) canvasRef!: ElementRef<HTMLCanvasElement>;

    private home: Home | undefined;

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
        this.home = new Home(this.canvasRef.nativeElement);
    }
}
