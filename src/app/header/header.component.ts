import { Component, OnInit } from '@angular/core';
import { NotificationDataService } from '../notification-data.service';
import { Notification } from 'src/shared/models/notification.model';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notifications: Notification[] = [];
  showNotifications = false;
  displayedNotifications: Notification[] = [];



  constructor(private dataService: NotificationDataService,
    private cdef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.dataService.getNotifications().subscribe(
      (notifications: Notification[]) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.showNotificationsOneByOne();
    }
  }

  showNotificationsOneByOne() {
    const maxNotificationsToShow = 5;
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.notifications.length && index < maxNotificationsToShow) {
        this.displayedNotifications.push(this.notifications[index]);
        index++;
        this.cdef.detectChanges(); //
      } else {
        clearInterval(interval);
      }
    }, 1000);

  }
}




