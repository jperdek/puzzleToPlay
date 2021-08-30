import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PuzzleManagerService } from 'src/app/services/puzzleGenerator/puzzle-manager.service';

@Component({
  selector: 'app-drag-and-drop-image',
  templateUrl: './drag-and-drop-image.component.html',
  styleUrls: ['./drag-and-drop-image.component.scss']
})
export class DragAndDropImageComponent {

  constructor(
    private puzzleManagerService: PuzzleManagerService,
    private router: Router) { }

  public onDroppedPuzzleImage(files: FileList): void {
    if (this.loadingFromOtherModuleFix(Array.from(files))) {
      return;
    }

    if (files !== null) {
      this.getOnlyOneFile(Array.from(files));
    } else {
      console.log('Error: no files are present!');
    }
  }

  public loadingFromOtherModuleFix(files: File[]): boolean {
    if (this.router.url.indexOf('/puzzle/') === -1) {
      this.router.navigateByUrl('/puzzle');
      setTimeout(() => this.getOnlyOneFile(files), 1000);
      return true;
    }
    return false;
  }

  public puzzleImageFileInput(filesEventTarget: EventTarget | null): void {
    if (this.loadingFromOtherModuleFix(Array.from((filesEventTarget as any).files))) {
      return;
    }

    if (filesEventTarget !== null){
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.getOnlyOneFile(Array.from((filesEventTarget as any).files));
    } else {
      console.log('Error: event target is null while loading file!');
    }
    console.log(filesEventTarget);
  }

  private getOnlyOneFile(files: Array<File>): void {
    if (files.length > 1) {
      console.log('Error: more then one file has been inserted');
      return;
    }
    if (files.length === 0) {
      console.log('No file has been inserted');
      return;
    }

    this.getImageContent(files[0]);
  }

  private createBase64String(file: File, base64: string): string {
    return 'data:' + file.type + ';base64,' + base64;
  }

  private getImageContent(file: File): void {
    file.arrayBuffer().then(arrayBuffer => {
      const wholeBase64 = this.imageConversionToBase64(file, arrayBuffer);
      this.puzzleManagerService.startGame(wholeBase64);
    });
  }

  private imageConversionToBase64(file: File, arrayBuffer: ArrayBuffer): string {
    const arrayBufferView = new Uint8Array( arrayBuffer );
    const blob = new Blob( [ arrayBufferView ], { type: file.type } );
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL( blob );
  }

  private limitsSizeOfImageConversionToBase64(file: File, arrayBuffer: ArrayBuffer): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer) as any));
    return this.createBase64String(file, base64);
  }

}
