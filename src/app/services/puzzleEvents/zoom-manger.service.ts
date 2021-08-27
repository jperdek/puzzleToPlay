import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class ZoomMangerService {

  maxZoom = 20; // can be 20
  minZoom = 0.4; // can be 0.01

  constructor() { }

  public registerZoomOnMouseWheel(puzzleBoard: fabric.Canvas): void {
    puzzleBoard.on('mouse:wheel', (opt: fabric.IEvent) => {
      const delta = (opt.e as WheelEvent).deltaY;
      let zoom = puzzleBoard.getZoom();
      zoom *= 0.999 ** delta;
      zoom = this.restrictZoom(zoom);
      console.log(zoom);
      puzzleBoard.zoomToPoint({ x: (opt.e as WheelEvent).offsetX, y: (opt.e as WheelEvent).offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  private restrictZoom(zoom: number): number {
    if (zoom > this.maxZoom ) {
      zoom = this.maxZoom;
    }
    if (zoom < this.minZoom) {
      zoom = this.minZoom;
    }
    return zoom;
  }
}
