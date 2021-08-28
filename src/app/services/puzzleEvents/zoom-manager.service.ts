import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { ZoomManagementComponent } from 'src/app/puzzle-builder/pages/zoom-management/zoom-management.component';

@Injectable({
  providedIn: 'root'
})
export class ZoomManagerService {

  maxZoom = 20;   // can be 20
  minZoom = 0.4;  // can be 0.01
  defaultZoom = 1.0;
  zoomPositionX = 25;
  zoomPositionY = 25;
  zoomManagementComponent?: ZoomManagementComponent;

  constructor() { }

  public initForComponent(zoomComponent: ZoomManagementComponent): void {
    this.zoomManagementComponent = zoomComponent;
  }

  public saveDefaultZoom(zoom: number): void { this.defaultZoom = zoom; }

  public resetZoom(puzzleBoard: fabric.Canvas): void {
    puzzleBoard.setViewportTransform([1, 0, 0, 1, 0, 0]); ;
    puzzleBoard.setZoom(this.defaultZoom);
  }

  public zoomToPoint(x: number, y: number, puzzleBoard: fabric.Canvas, delta = 0.05): void {
    let zoom = puzzleBoard.getZoom();
    zoom *= 0.999 ** delta;
    zoom = this.restrictZoom(zoom);
    puzzleBoard.zoomToPoint({ x, y }, zoom);
  }

  public zoomToPointWithZoom(x: number, y: number, puzzleBoard: fabric.Canvas, newZoom: number): void {
    newZoom = this.restrictZoom(newZoom);
    puzzleBoard.zoomToPoint({ x, y }, newZoom);
  }

  public registerZoomOnMouseWheel(puzzleBoard: fabric.Canvas): void {
    puzzleBoard.on('mouse:wheel', (opt: fabric.IEvent) => {
      const delta = (opt.e as WheelEvent).deltaY;
      let zoom = puzzleBoard.getZoom();
      zoom *= 0.999 ** delta;
      zoom = this.restrictZoom(zoom);
      puzzleBoard.zoomToPoint({ x: (opt.e as WheelEvent).offsetX, y: (opt.e as WheelEvent).offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  public setZoomPosition(x: number, y: number): void {
    this.zoomPositionX = parseFloat(x.toFixed(2));
    this.zoomPositionY = parseFloat(y.toFixed(2));
    this.zoomManagementComponent?.setCenterXAndY(this.zoomPositionX, this.zoomPositionY);
  }

  public getZoomPositionX(): number { return this.zoomPositionX; }

  public getZoomPositionY(): number { return this.zoomPositionY; }

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
