import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NameSplitterService} from "../../../services/name-splitter.service";
import {NameModel} from "../../../models/NameModel";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-splitify',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './splitify.component.html',
  styleUrl: './splitify.component.scss'
})
export class SplitifyComponent {
  inputName: string = "";
  nameSplitterService: NameSplitterService = new NameSplitterService();
  gender: string = "";
  title: string = "";
  firstName: string = "";
  lastName: string = "";
  newTitle: string = "";
  greeting: string = `Beispieltext`;

  constructor(private snackBar: MatSnackBar) {
  }

  onKeyName(event: any) {
    this.inputName = event.target.value;
  }

  onKeyNewTitle(event: any) {
    this.newTitle = event.target.value + " ";
  }

  identifyNameParts(): void {
    if (this.inputName == "") {
      this.snackBar.open("Bitte geben sie einen Namen ein", "ok", {
        duration: 5000
      })
    } else {
      let result: NameModel = this.nameSplitterService.splitName(this.inputName);
      this.gender = result.gender!
      this.title = result.title!
      this.firstName = result.firstName
      this.lastName = result.lastName
    }
  }

  generateGreeting(): void {
    if (this.gender == "" && this.title == "" && this.firstName == "" && this.lastName == "") {
      this.snackBar.open("Bitte erst einen Namen erkennen lassen, bevor sie eine Anrede generieren wollen", "ok", {
        duration: 5000
      })
    } else {
      let editedName: NameModel = {
        gender: this.gender,
        title: this.title,
        firstName: this.firstName,
        lastName: this.lastName,
      }
      if (this.gender == "Herr" || this.gender == "Hr") {
        editedName.male = true;
      } else if (this.gender == "Frau" || this.gender == "Fr") {
        editedName.male = false;
      }
      if (this.title != "") {
        editedName.hasTitle = true;
      }
      this.greeting = this.nameSplitterService.generateGreeting(editedName);
    }
  }

  addNewTitle(): void {
    if (this.nameSplitterService.possibleTitles.length < 36 && this.newTitle.trim() != "") {
      this.nameSplitterService.possibleTitles.push(this.newTitle.trim() + " ")
      this.snackBar.open("Der Titel wurde hinzugefügt", "ok", {
        duration: 5000
      })
    } else {
      this.snackBar.open("Es werden nicht mehr als 30 verschiedene Titel unterstützt!", "ok", {
        duration: 5000
      })
    }
  }
}
