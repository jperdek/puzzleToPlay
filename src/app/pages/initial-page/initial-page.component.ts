import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ImagesToPuzzleMock } from 'src/app/mockups/gallery.mock';
import { TemplateImage } from 'src/app/models/defaultTemplates';
import { PuzzleManagerService } from 'src/app/services/puzzleGenerator/puzzle-manager.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent {

  constructor(
    private puzzleManagerService: PuzzleManagerService,
    private router: Router) {}

  public getSlides(): Observable<TemplateImage[]> {
    return of(ImagesToPuzzleMock);
  }

  public createPuzzleForImage(slide: TemplateImage): void {
    console.log('HEre');
    this.router.navigateByUrl('/puzzle/selectPuzzles');
    // its in another module which needs to be loaded first
    setTimeout(() => this.puzzleManagerService.startGame(slide.src), 700);
  }
}
