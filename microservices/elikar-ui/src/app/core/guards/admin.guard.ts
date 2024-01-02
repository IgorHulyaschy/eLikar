import { Injectable } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { UserService } from '../services/user.service'
@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isAdmin()) {
      this.router.navigate(['/home'])
      return false
    }
    return true
  }
}
