import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Queue } from "../models/queue/queue";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private queueUrl = 'http://localhost:3000/api/electronic-queue'
  private http: HttpClient
  constructor(http: HttpClient) {
    this.http = http
  }

  public getQueue(nurseId: string): Observable<any> {
    return this.http.get<any>(`${this.queueUrl}/${nurseId}`)
  }
}