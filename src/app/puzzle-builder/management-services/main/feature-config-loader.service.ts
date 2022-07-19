import { ListKeyManager } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FeatureConfigLoaderService {

  constructor(private httpClient: HttpClient) { }

  public getFeatureConfig(): any {
      let jsonObject = null
      this.httpClient.get("/assets/featureConfig/featureConfig.json").subscribe(data => {
        jsonObject = data;
        console.log(jsonObject);
      });
      console.log(jsonObject);
      return jsonObject;
    }

  public static parseConfig(functionalityMapping: any, featureConfig: any, keyName: string = ""): any {
    if ("focus" in featureConfig && featureConfig["focus"] !== "single") {
        for (const [key, value] of Object.entries(featureConfig)) {
          if (key === "focus" || key === "implemented" || key === "include" || key === "type") { continue; }
          if (typeof value !== 'object') { continue; }
          this.parseConfig(functionalityMapping, value, key);
        }
    } else {
      if (keyName in functionalityMapping) {
        //console.log("Feature " + keyName + " has functionalityMapping!");
        if (featureConfig["include"]) {
          console.log("Applying functionalityMapping for Feature " + keyName + "!");
          functionalityMapping[keyName](featureConfig);
        }
      } else {
        //console.log("Feature " + keyName + " does not have functionalityMapping!");
      }
    }

  }
}
