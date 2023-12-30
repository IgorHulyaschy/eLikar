import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthenticationForm } from '../models/authentication/authentication-form'
import { jwtDecode } from 'jwt-decode'
import { AuthenticationResponse } from '../models/authentication/authentication-response'
import * as moment from 'moment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient
  private authUrl = 'http://localhost:3000/api/auth/nurses/sign-in'
  private authAsAdminUrl = 'http://localhost:3000/api/auth/hospitals/sign-in'
  constructor(http: HttpClient) {
    this.http = http
  }

  private readonly AUTH_TOKEN = 'token'
  private readonly EXPIRES_AT = 'expires_at'
  private readonly USER_ID = 'user_id'

  public getAuthenticationToken(
    authForm: AuthenticationForm,
    authAsAdmin: boolean
  ): Observable<any> {
    if (authAsAdmin) {
      return this.http.post(this.authAsAdminUrl, authForm)
    } else {
      return this.http.post(this.authUrl, authForm)
    }
  }

  public authenticateWithToken(token: string): void {
    const authResponse = this.buildAuthResponse(token)
    this.setSession(authResponse)
  }

  public logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN)
    localStorage.removeItem(this.EXPIRES_AT)
    localStorage.removeItem(this.USER_ID)
    console.log('User logout!')
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration())
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn()
  }

  public getExpiration(): any {
    const expiration = localStorage.getItem(this.EXPIRES_AT)
    if (expiration) {
      const expiresAt = JSON.parse(expiration)
      return moment(expiresAt)
    }
  }

  private buildAuthResponse(token: string): AuthenticationResponse {
    const tokenPayload = jwtDecode(token)
    const authResponse = tokenPayload as AuthenticationResponse
    authResponse.token = token
    return authResponse
  }

  private setSession(authResponse: AuthenticationResponse): void {
    const expiresAt = moment().add(authResponse.exp, 'second')

    localStorage.setItem(this.AUTH_TOKEN, authResponse.token)
    localStorage.setItem(this.EXPIRES_AT, JSON.stringify(expiresAt.valueOf()))
    localStorage.setItem(this.USER_ID, authResponse.id)

    console.log('User logged in!')
  }
}