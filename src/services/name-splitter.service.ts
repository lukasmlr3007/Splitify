import {Injectable} from '@angular/core';
import {NameModel} from "../models/NameModel";

@Injectable({
  providedIn: 'root'
})
export class NameSplitterService {

  constructor() {
  }

  splitName(name: string): NameModel {
    let hasGender: boolean = false;
    let male: boolean = false;
    let hasTitle: boolean = false;
    let hasDoubleTitle: boolean = false;
    let result: NameModel = {
      gender: "",
      title: "",
      firstName: "",
      lastName: "",
    }

    if (name.includes("Dr ")
      || name.includes("Dr. ")
      || name.includes("Prof ")
      || name.includes("Prof. ")) {
      hasTitle = true;
    }
    if (name.includes("Prof Dr")
      || name.includes("Prof. Dr.")
      || name.includes("Prof Prof")
      || name.includes("Prof. Prof.")
      || name.includes("Dr Dr")
      || name.includes("Dr. Dr.")) {
      hasDoubleTitle = true;
    }
    if (name.includes("Fr ") || name.includes("Frau ")) {
      hasGender = true;
    } else if(name.includes("Hr ") || name.includes("Herr ")) {
      hasGender = true;
      male = true;
    }

    let parts: string[] = name.split(" ");
    console.log("NameSplitter: " + name);

    if (hasTitle && !hasGender && !hasDoubleTitle) {
      result.title = parts[0]
      result.firstName = parts[1]
      result.lastName = parts[2]
      result.hasTitle = true
    } else if (!hasTitle && hasGender) {
      result.gender = parts[0]
      result.firstName = parts[1]
      result.lastName = parts[2]
      result.male = male
    } else if (hasTitle && hasGender && !hasDoubleTitle) {
      result.gender = parts[0]
      result.title = parts[1]
      result.firstName = parts[2]
      result.lastName = parts[3]
      result.hasTitle = true
      result.male = male
    } else if(hasTitle && hasDoubleTitle && !hasGender) {
      result.title = parts[0] + " " + parts[1]
      result.firstName = parts[2]
      result.lastName = parts[3]
      result.hasTitle = true
    } else if(hasTitle && hasDoubleTitle && hasGender) {
      result.gender = parts[0]
      result.title = parts[1] + " " + parts[2]
      result.firstName = parts[3]
      result.lastName = parts[4]
      result.hasTitle = true
      result.male = male
    } else {
      result.firstName = parts[0]
      result.lastName = parts[1]
    }

    return result;
  }

  generateGreeting(type: string, name: NameModel): string {
    let greeting: string = "";
    if (type == "mail"){
      greeting = "mail Sehr geehrte"
      if (name.male == true){
        greeting.concat("r Herr ")
      } else if(name.male == false){
        greeting.concat(" Frau ")
      }
      if (name.hasTitle){
        greeting.concat(name.title! + " ")
      }
      greeting.concat(name.firstName + " " + name.lastName + ",")
    } else if(type == "letter"){
      greeting = "letter Sehr geehrte"
      if (name.male == true){
        greeting.concat("r Herr ")
      } else if(name.male == false){
        greeting.concat(" Frau ")
      }
      if (name.hasTitle){
        greeting.concat(name.title! + " ")
      }
      greeting.concat(name.firstName + " " + name.lastName + ",")
    } else {
      return "GreetingTypeError!"
    }

    return greeting;
  }
}
