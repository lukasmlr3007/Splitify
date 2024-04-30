import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NameSplitterService} from "../../../services/name-splitter.service";
import {NameModel} from "../../../models/NameModel";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";

interface SelectGreetingValues{
  value: string,
  viewValue: string
}

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

  greetingTypes: SelectGreetingValues[] = [
    { value: 'mail', viewValue: 'Mail' },
    { value: 'letter', viewValue: 'Brief'}
  ];
  greetingType: string = "mail"
  greeting: string = "Sehr geehrte Frau Mustermann, sehr geehrter Herr Beispiel, Sehr geehrter Herr Beispiel! Sehr geehrte Frau Mustermann!";

  onKey(event: any) {
    this.inputName = event.target.value;
  }

  identifyNameParts(): void {
    console.log(this.inputName);
    let result: NameModel = this.nameSplitterService.splitName(this.inputName);
    this.gender = result.gender!
    this.title = result.title!
    this.firstName = result.firstName
    this.lastName= result.lastName
  }

  generateGreeting(): void {
    let editedName: NameModel = {
      gender: this.gender,
      title: this.title,
      firstName: this.firstName,
      lastName: this.lastName,
    }
    console.log(editedName)
    this.greeting = this.nameSplitterService.generateGreeting(this.greetingType, editedName);
  }
}
