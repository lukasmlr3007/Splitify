import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NameSplitterService} from "../../../services/name-splitter.service";
import {NameModel} from "../../../models/NameModel";

@Component({
  selector: 'app-splitify',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule
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
}
