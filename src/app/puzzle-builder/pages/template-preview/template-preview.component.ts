import { Component } from '@angular/core';
import { PuzzleManagerService } from 'src/app/services/puzzleGenerator/puzzle-manager.service';

@Component({
  selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss']
})
export class TemplatePreviewComponent {

  constructor(private puzzleManagerService: PuzzleManagerService) { }

  public getTemplatePreviewImage(): string {
    const templatePreviewImage = this.puzzleManagerService.getTemplatePreviewImage();
    if (templatePreviewImage !== undefined) {
      return templatePreviewImage.src;
    }
    console.log('Error: no template preview image for puzzles!');
    return '';
  }
}
