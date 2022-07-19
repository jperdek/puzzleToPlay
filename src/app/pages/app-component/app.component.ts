import { Component } from '@angular/core';
import { TreeManagerService } from 'src/app/puzzle-builder/management-services/main/tree-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'puzzleToPlay';
  constructor(private treeManagerService: TreeManagerService) { }

}
