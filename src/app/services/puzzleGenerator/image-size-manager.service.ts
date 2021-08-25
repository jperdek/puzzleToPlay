import { Injectable } from '@angular/core';
import { Point } from 'src/app/models/point';

@Injectable({
  providedIn: 'root'
})
export class ImageSizeManagerService {

  constructor() { }

  public getSizeAccordingAspectRatio(width: number, height: number, aspectRatio: number): Point {
    if (width < height) {
      const obtainedWidth = width;
      const obtainedHeight = obtainedWidth / aspectRatio;
      return { x: obtainedWidth, y: obtainedHeight};
    } else {
      const obtainedHeight = height;
      const obtainedWidth = obtainedHeight * aspectRatio;
      return { x: obtainedWidth, y: obtainedHeight};
    }
  }

  public getLargestSide(width: number, height: number, aspectRatio: number): Point {
    if (width < height) {
      const obtainedWidth = width;
      const obtainedHeight = height / aspectRatio;
      return { x: obtainedWidth, y: obtainedHeight};
    } else {
      const obtainedHeight = height;
      const obtainedWidth = width * aspectRatio;
      return { x: obtainedWidth, y: obtainedHeight};
    }
  }
}
