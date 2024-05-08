import { TestBed } from '@angular/core/testing';

import { NameSplitterService } from './name-splitter.service';
import {NameModel} from "../models/NameModel";

describe('NameSplitterService', () => {
  let service: NameSplitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameSplitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse Frau Sandra Berger', () => {
    let expectedOutput: NameModel = {
      gender: "Frau",
      male: false,
      title: "",
      firstName: "Sandra",
      lastName: "Berger",
    }

    expect(service.splitName("Frau Sandra Berger")).toEqual(expectedOutput);
  });

  it('should parse Herr Dr. Sandro Gutmensch', () => {
    let expectedOutput: NameModel = {
      gender: "Herr",
      male: true,
      title: "Dr.",
      hasTitle: true,
      firstName: "Sandro",
      lastName: "Gutmensch",
    }

    expect(service.splitName("Herr Dr. Sandro Gutmensch")).toEqual(expectedOutput);
  });

  it('should parse Professor Heinreich Freiherr vom Wald', () => {
    let expectedOutput: NameModel = {
      gender: "",
      title: "Professor",
      hasTitle: true,
      firstName: "Heinreich",
      lastName: "Freiherr vom Wald",
    }

    expect(service.splitName("Professor Heinreich Freiherr vom Wald")).toEqual(expectedOutput);
  });

  it('should parse Frau Prof. rer. Maria von Leuthäuser-Schnarrenberger', () => {
    let expectedOutput: NameModel = {
      gender: "Frau",
      male: false,
      title: "Prof. rer.",
      hasTitle: true,
      firstName: "Maria",
      lastName: "von Leuthäuser-Schnarrenberger",
    }
    service.possibleTitles.push("rer. ")

    expect(service.splitName("Frau Prof. rer. Maria von Leuthäuser-Schnarrenberger")).toEqual(expectedOutput);
  });

  it('should parse Dr. Russwurm, Winfried', () => {
    let expectedOutput: NameModel = {
      gender: "",
      title: "Dr.",
      hasTitle: true,
      firstName: "Winfried",
      lastName: "Russwurm",
    }

    expect(service.splitName("Dr. Russwurm, Winfried")).toEqual(expectedOutput);
  });

  it('should parse Herr Dipl. Ing. Max von Müller', () => {
    let expectedOutput: NameModel = {
      gender: "Herr",
      male: true,
      title: "Dipl. Ing.",
      hasTitle: true,
      firstName: "Max",
      lastName: "von Müller",
    }
    service.possibleTitles.push("Dipl. ", "Ing. ")

    expect(service.splitName("Herr Dipl. Ing. Max von Müller")).toEqual(expectedOutput);
  });
});
