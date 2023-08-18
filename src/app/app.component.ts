import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { SnackBarService } from './components/snack-bar/snack-bar.service';
import { StatisticsWebSocketService } from './services/statistics-websocket.service';
import { generateSoundAlertUtil } from 'src/utils/generate-sound-alert.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SnackBarService],
})
export class AppComponent implements OnInit, OnDestroy {
  private notificationSubscription!: Subscription;

  constructor(
    private snackBarService: SnackBarService,
    private statisticsWebSocketService: StatisticsWebSocketService
  ) {}

  ngOnInit(): void {
    this.statisticsWebSocketService.connect();
    this.notificationSubscription =
      this.statisticsWebSocketService.notification$.subscribe((message) => {
        //GENERATE SOUND
        generateSoundAlertUtil();
        // SHOW SNACK BAR
        this.snackBarService.showSnackBar({
          message,
          type: 'success',
        });
        setTimeout(() => this.snackBarService.hideSnackBar(), 3000);
      });
  }

  ngOnDestroy(): void {
    this.statisticsWebSocketService.disconnect();
    this.notificationSubscription.unsubscribe();
  }
}
