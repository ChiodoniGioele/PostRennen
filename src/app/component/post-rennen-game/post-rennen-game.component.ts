import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Game } from "./controllers/game";

@Component({
  selector: 'app-post-rennen-game',
  templateUrl: './post-rennen-game.component.html',
  styleUrls: ['./post-rennen-game.component.css']
})
export class PostRennenGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('game', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private game: Game | undefined;

  ngAfterViewInit() {
    this.resizeCanvas();
    this.startGame();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.resizeCanvas();

  }

  ngOnDestroy() {
    this.game?.stop();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private startGame() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (ctx) {
      this.game = new Game(this.canvasRef.nativeElement);
      this.game.start();
    } else {
      console.error('Impossibile ottenere il contesto 2d dal canvas.');
    }
  }
}
