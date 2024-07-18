import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private gameStatusSubject = new Subject<boolean>();

    setGameStatus(status: boolean) {
        this.gameStatusSubject.next(status);
    }

    getGameStatus(): Observable<boolean> {
        return this.gameStatusSubject.asObservable();
    }
}
