import { Injectable } from '@angular/core';
import {NameModel} from "../models/NameModel";

@Injectable({
  providedIn: 'root'
})
export class NameSplitterService {

  constructor() { }

  splitName(name: string): NameModel {
    let result: NameModel = {
      gender: "",
      title: "",
      firstName: "",
      lastName: "",
    }
    let parts: string[] = name.split(" ");
    console.log("NameSplitter: " + name);

    result.firstName = parts[0]
    result.lastName = parts[1]

    return result;
  }
}
