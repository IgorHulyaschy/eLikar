import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user/user";

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  public user: User | undefined
  private userService: UserService
  constructor(userService: UserService) {
    this.userService = userService
  }

  public ngOnInit(): void {
    this.userService.getInfoAboutMe().subscribe((res) => {
      console.log(res)
      this.user = res
      console.log(this.user.fname)
    })
  }

  public isUserAdmin(): boolean {
    return this.userService.isAdmin()
  }
}
