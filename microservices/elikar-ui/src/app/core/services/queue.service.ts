import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Queue } from "../models/queue/queue";
import { Observable } from "rxjs";
import { BookQueue } from "../models/queue/book-queue";

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
}
