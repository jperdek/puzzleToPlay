import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { GalleryMock } from 'src/app/mockups/gallery.mock';
import { TemplateCategory, TemplateImage } from 'src/app/models/defaultTemplates';
import { PuzzleManagerService } from 'src/app/services/puzzleGenerator/puzzle-manager.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  constructor(private puzzleManagerService: PuzzleManagerService) { }

  public getGallery(): Observable<TemplateCategory[]> {
    return of(GalleryMock);
  }

  public startNewGame(image: TemplateImage): void {
    this.puzzleManagerService.startGame(image.src);
  }
}
