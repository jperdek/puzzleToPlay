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
      if (obtainedHeight > height) {
        const obtainedNewHeight = height;
        const obtainedNewWidth = obtainedNewHeight * aspectRatio;
        return { x: obtainedNewWidth, y: obtainedNewHeight};
      }
      return { x: obtainedWidth, y: obtainedHeight};
    } else {
      const obtainedHeight = height;
      const obtainedWidth = obtainedHeight * aspectRatio;
      if (obtainedWidth > width) {
        const obtainedNewWidth = width;
        const obtainedNewHeight = obtainedNewWidth / aspectRatio;
        return { x: obtainedNewWidth, y: obtainedNewHeight};
      }
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
