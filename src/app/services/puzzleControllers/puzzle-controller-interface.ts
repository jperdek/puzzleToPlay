import { Injectable } from "@angular/core";
import { ManagePuzzleService } from "../puzzleGenerator/manage-puzzle.service";

@Injectable({
  providedIn: 'root'
})
export abstract class PuzzleController {
  abstract registerControllers(managePuzzleService: ManagePuzzleService): void;
}
