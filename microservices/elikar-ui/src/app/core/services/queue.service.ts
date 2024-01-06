import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Queue } from "../models/queue/queue";
import { Observable } from "rxjs";
import { BookQueue } from "../models/queue/book-queue";
import { SlotSetDone } from "../models/queue/slot-set-done";

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private queueUrl = 'http://localhost:3000/api/electronic-queue'
  private http: HttpClient
  constructor(http: HttpClient) {
    this.http = http
  }

  public getQueue(nurseId: string, hospitalId: string): Observable<Queue> {
    return this.http.get<Queue>(`${this.queueUrl}/${nurseId}/${hospitalId}`)
  }

  public registerInQueue(bookQueue: BookQueue): Observable<any> {
    return this.http.post(`${this.queueUrl}`, bookQueue)
  }

  public slotSetDone(slotSetDone: SlotSetDone): Observable<any> {
    return this.http.put(`${this.queueUrl}/${slotSetDone.queueId}`, slotSetDone)
  }
}
