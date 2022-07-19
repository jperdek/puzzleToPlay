import { Injectable } from '@angular/core';
import { MenuManagerService } from '../menu-manager.service';
import { FeatureConfigLoaderService } from './feature-config-loader.service';
import { featureConfig } from './feature-config';

@Injectable({
  providedIn: 'root'
})
export class TreeManagerService {

  private featureConfiguration = null;
  private functionalityMapping = {
    "deleteItem": this.menuManagerService.initialize
  }

  constructor(
    private featureConfigLoader: FeatureConfigLoaderService,
    private menuManagerService: MenuManagerService) {
    //this.featureConfiguration = featureConfigLoader.getFeatureConfig();


    //console.log(featureConfig);
    //1. solution without parser
    //this.functionalityMapping["deleteItem"](featureConfig["environmentModule"]["applicationCore"]["item"]["controls"]["deleteItem"]);

    //2. solution with parser
    FeatureConfigLoaderService.parseConfig(this.functionalityMapping, featureConfig);
  }
}
