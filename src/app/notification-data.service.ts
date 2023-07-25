import { Injectable } from '@angular/core';
import { Notification } from 'src/shared/models/notification.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationDataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }
}
