import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScanLineService {
  left = Number.MAX_SAFE_INTEGER;
  right = Number.MIN_SAFE_INTEGER;

  constructor() { }


  public setBoundary(leftRight: number): void{
    if (leftRight < this.left){
      this.left = leftRight;
    }
    if (leftRight - 1 > this.right){
      this.right = leftRight - 1;
    }
  }

  public clearBoundary(): void {
    this.left = Number.MAX_SAFE_INTEGER;
    this.right = Number.MIN_SAFE_INTEGER;
  }

  public isValid(): boolean {
    return (this.left <= this.right);
  }

  public set(newLeft: number, newRight: number): void{
    this.left = newLeft;
    this.right = newRight;
  }

  public equals(left: number, right: number): boolean{
    return (this.left === left && this.right === right);
  }

}
