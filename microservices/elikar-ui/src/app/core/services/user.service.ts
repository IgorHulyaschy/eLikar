import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private nurseUrl = 'http://localhost:3000/api/nurses'
  private adminUrl = 'http://localhost:3000/api/hospital'
  private http: HttpClient
  private readonly IS_ADMIN = 'is_admin'

  constructor(http: HttpClient) {
    this.http = http
  }

  public getInfoAboutMe(): Observable<User> {
    if (this.isAdmin()) {
      return this.http.get<User>(this.adminUrl + '/me')
    } else {
      return this.http.get<User>(this.nurseUrl + '/me')
    }
  }

  public isAdmin(): boolean {
    const isAdmin = localStorage.getItem(this.IS_ADMIN)
    if (isAdmin) {
      return JSON.parse(isAdmin) as boolean
    }
    return false
  }
}
