import { Injectable } from '@angular/core';
import { PuzzleControllerManagerService } from 'src/app/services/puzzleControllers/puzzle-controller-manager.service';
import { aop, hookName, createHook  } from 'to-aop';
import { PuzzleControllerManagerService2 } from './puzzle-controller-manager2.service';


@Injectable({
  providedIn: 'root'
})
export class MenuManagerService {

  menuManageHook: any;
  serviceContext: PuzzleControllerManagerService | null = null;

  constructor() { }

  public initialize(menuConfig: any): void {
    console.log('Initializing menu variants!');

    this.menuManageHook = createHook(hookName.aroundMethod, 'applyToMe',  (args: any) => {
      console.log('AOP: Selecting new Puzzle control!!!');
      this.serviceContext = args.context;
      if (menuConfig["include"]) {
        return new PuzzleControllerManagerService2(
          args.context.returnPuzzleService,
          args.context.helpPuzzleService,
          args.context.bringToFrontService,
          args.context.bringToBackService);
      }
      return args.context;
    });
    aop(PuzzleControllerManagerService , this.menuManageHook, { constructor: true });
  }
}
