import { Injectable } from "@angular/core";
import { User } from "../models/user/user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  private nurseUrl = 'http://localhost:3000/api/nurses'
  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  public getAllNurses(): Observable<User[]> {
    return this.http.get<User[]>(this.nurseUrl)
  }
}