import {Injectable} from '@angular/core';
import {NameModel} from "../models/NameModel";

@Injectable({
  providedIn: 'root'
})
export class NameSplitterService {

  constructor() {
  }

  splitName(name: string): NameModel {
    let hasTitle: boolean = false;
    let hasGender: boolean = false;
    let result: NameModel = {
      gender: "",
      title: "",
      firstName: "",
      lastName: "",
    }

    if (name.includes("Dr") || name.includes("Dr.") || name.includes("Prof") || name.includes("Prof.")) {
      hasTitle = true;
    }
    if (name.includes("Fr") || name.includes("Hr") || name.includes("Frau") || name.includes("Herr")) {
      hasGender = true;
    }

    let parts: string[] = name.split(" ");
    console.log("NameSplitter: " + name);

    if (hasTitle && !hasGender) {
      result.title = parts[0]
      result.firstName = parts[1]
      result.lastName = parts[2]
    } else if(!hasTitle && hasGender){
      result.gender = parts[0]
      result.firstName = parts[1]
      result.lastName = parts[2]
    } else if(hasTitle && hasGender){
      result.gender = parts[0]
      result.title = parts[1]
      result.firstName = parts[2]
      result.lastName = parts[3]
    } else {
      result.firstName = parts[0]
      result.lastName = parts[1]
    }

    return result;
  }
}
