import {Injectable} from '@angular/core';
import {NameModel} from "../models/NameModel";

@Injectable({
  providedIn: 'root'
})
export class NameSplitterService {
  public possibleTitles: string[] = [
    "Dr ",
    "Dr. ",
    "Prof ",
    "Prof. ",
  ]

  constructor() {
  }

  splitName(name: string): NameModel {
    let hasGender: boolean = false;
    let male: boolean = false;
    let hasTitle: boolean = false;
    let hasDoubleTitle: boolean = false;
    let hasLastNameBeforeFirstName: boolean = false;
    let result: NameModel = {
      gender: "",
      title: "",
      firstName: "",
      lastName: "",
    }

    if (name.includes(",")) {
      hasLastNameBeforeFirstName = true
    }
    this.possibleTitles.forEach(title => {
      if (name.includes(title)){
        hasTitle = true
      }
    })
    this.possibleTitles.forEach(title => {
      this.possibleTitles.forEach(secondTitle => {
        if (name.includes(title + secondTitle)){
          hasDoubleTitle = true
        }
      })
    })
    if (name.includes("Fr ") || name.includes("Frau ")) {
      hasGender = true;
    } else if (name.includes("Hr ") || name.includes("Herr ")) {
      hasGender = true;
      male = true;
    }

    name = name.replace(",", "")
    let parts: string[] = name.split(" ");
    console.log("NameSplitter: " + name);
    console.log(parts)
    console.log(parts.length)

    if (!hasLastNameBeforeFirstName) {
      if (hasTitle && !hasGender && !hasDoubleTitle) {
        result.title = parts[0]
        result.firstName = parts[1]
        for (let i = 2; i < parts.length; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.hasTitle = true
      } else if (!hasTitle && hasGender) {
        result.gender = parts[0]
        result.firstName = parts[1]
        for (let i = 2; i < parts.length; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.male = male
      } else if (hasTitle && hasGender && !hasDoubleTitle) {
        result.gender = parts[0]
        result.title = parts[1]
        result.firstName = parts[2]
        for (let i = 3; i < parts.length; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.hasTitle = true
        result.male = male
      } else if (hasTitle && hasDoubleTitle && !hasGender) {
        result.title = parts[0] + " " + parts[1]
        result.firstName = parts[2]
        for (let i = 3; i < parts.length; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.hasTitle = true
      } else if (hasTitle && hasDoubleTitle && hasGender) {
        result.gender = parts[0]
        result.title = parts[1] + " " + parts[2]
        result.firstName = parts[3]
        for (let i = 4; i < parts.length; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.hasTitle = true
        result.male = male
      } else {
        result.firstName = parts[0]
        for (let i = 1; i < parts.length; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
      }
    } else if (hasLastNameBeforeFirstName) {
      if (hasTitle && !hasGender && !hasDoubleTitle) {
        result.title = parts[0]
        result.firstName = parts[parts.length - 1]
        for (let i = 1; i < parts.length - 1; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.hasTitle = true
      } else if (!hasTitle && hasGender) {
        result.gender = parts[0]
        result.firstName = parts[parts.length - 1]
        for (let i = 1; i < parts.length - 1; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.male = male
      } else if (hasTitle && hasGender && !hasDoubleTitle) {
        result.gender = parts[0]
        result.title = parts[1]
        result.firstName = parts[parts.length - 1]
        for (let i = 2; i < parts.length - 1; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.hasTitle = true
        result.male = male
      } else if (hasTitle && hasDoubleTitle && !hasGender) {
        result.title = parts[0] + " " + parts[1]
        result.firstName = parts[parts.length - 1]
        for (let i = 2; i < parts.length - 1; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.hasTitle = true
      } else if (hasTitle && hasDoubleTitle && hasGender) {
        result.gender = parts[0]
        result.title = parts[1] + " " + parts[2]
        result.firstName = parts[parts.length - 1]
        for (let i = 3; i < parts.length - 1; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
        result.hasTitle = true
        result.male = male
      } else {
        result.firstName = parts[parts.length - 1]
        for (let i = 0; i < parts.length - 1; i++) {
          result.lastName = result.lastName + " " + parts[i]
          result.lastName = result.lastName.trim()
        }
      }
    }

    return result;
  }

  generateGreeting(name: NameModel): string {
    let greeting = `Sehr geehrte`
    if (name.male == true) {
      greeting = greeting.concat(`r Herr `)
    } else if (name.male == false) {
      greeting = greeting.concat(` Frau `)
    } else if (name.male == undefined) {
      greeting = greeting.concat(`/r `)
    }
    if (name.hasTitle) {
      greeting = greeting.concat(name.title! + ` `)
    }
    greeting = greeting.concat(name.firstName + ` ` + name.lastName + `,`)

    greeting = greeting.concat(`

--- hier Nachricht einfügen ---

Mit freundlichen Grüßen`)

    return greeting;
  }
}
