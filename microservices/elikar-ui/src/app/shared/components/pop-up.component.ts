import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {
  public text!: string

  public wasSuccessful!: boolean

  public showPopUp = false

  @ViewChild('popUp')
  private popUp!: ElementRef

  public show(text: string, wasSuccessful: boolean): void {
    this.showPopUp = true
    this.text = text
    this.wasSuccessful = wasSuccessful
    setTimeout(() => {
      this.showPopUp = false
    }, 3000)
  }

  protected readonly Text = Text;
}
