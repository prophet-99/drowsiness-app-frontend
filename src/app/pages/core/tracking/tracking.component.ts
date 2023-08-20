import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { EMPTY, Observable, Subscription, forkJoin, mergeMap, of } from 'rxjs';
import { Loader } from '@googlemaps/js-api-loader';

import { LoaderService } from 'src/app/components/loader/loader.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { StatisticsWebSocketService } from 'src/app/services/statistics-websocket.service';
import { StatisticsDTO } from 'src/app/models/dto/statistics.dto';
import { environment } from 'src/environments/environment.development';
import { StatisticsModel } from 'src/app/models/statistics.model';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  providers: [LoaderService],
})
export class TrackingComponent implements OnInit, OnDestroy {
  @Input() serviceType!: 'GENERAL' | 'SPECIFIC';
  @Input() userDNI!: string;
  public baseAPI = environment.API_BASE_URL;
  public statistics$: Observable<StatisticsDTO[]> = EMPTY;
  private notificationSubscription!: Subscription;
  private MapRef!: typeof google.maps.Map;
  private InfoWindowRef!: typeof google.maps.InfoWindow;
  private AdvancedMarkerElementRef!: typeof google.maps.marker.AdvancedMarkerElement;
  private GeocoderRef!: typeof google.maps.Geocoder;
  private googleMapRef!: google.maps.Map;
  private googleInfoWindowRef!: google.maps.InfoWindow;
  private googleMarkerRef!: google.maps.marker.AdvancedMarkerElement;
  private googleGeocoder!: google.maps.Geocoder;

  constructor(
    private loaderService: LoaderService,
    private statisticsService: StatisticsService,
    private statisticsWebSocketService: StatisticsWebSocketService
  ) {}

  ngOnInit(): void {
    // GOOGLE INITIALIZE
    const loader = new Loader({
      apiKey: environment.GOOGLE_API_KEY,
      version: 'weekly',
    });
    loader.load().then(async () => {
      const { Map, InfoWindow } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      this.MapRef = Map;
      this.InfoWindowRef = InfoWindow;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;
      this.AdvancedMarkerElementRef = AdvancedMarkerElement;
      const { Geocoder } = (await google.maps.importLibrary(
        'geocoding'
      )) as google.maps.GeocodingLibrary;
      this.GeocoderRef = Geocoder;
      // INIT GOOGLE MAP
      this.googleMapRef = new this.MapRef(
        document.querySelector('.js-google-maps') as HTMLElement,
        {
          center: { lat: -9.189967, lng: -75.015152 }, // PERU LOCATION
          zoom: 5,
          mapId: '#DDS161299',
        }
      );
      // LOAD STATISTICS
      this.loadAllStatistics();
    });
    // SOCKET INITIALIZE
    this.notificationSubscription =
      this.statisticsWebSocketService.notification$.subscribe(() => {
        this.loadAllStatistics();
      });
  }

  private getSpecificService(searchParam = ''): Observable<StatisticsModel[]> {
    if (this.serviceType === 'SPECIFIC') {
      return this.statisticsService.getAllByUserDNI(this.userDNI, searchParam);
    }
    return this.statisticsService.getAll(searchParam);
  }

  private loadAllStatistics(searchParam = ''): void {
    if (!this.googleGeocoder) this.googleGeocoder = new this.GeocoderRef();

    this.statistics$ = this.loaderService.showLoaderUntilCompleted(
      this.getSpecificService(searchParam).pipe(
        mergeMap((statistics) => {
          if (statistics.length === 0) return of([]);
          // IF DATA IS PRESENT
          const observablesRef = statistics.map(async (statisticSc) => {
            const response = await this.googleGeocoder.geocode({
              location: {
                lat: statisticSc.latitude,
                lng: statisticSc.longitude,
              },
            });
            const statisticDTO: StatisticsDTO = {
              ...statisticSc,
              siteAddress: '',
            };
            if (response.results[0]) {
              statisticDTO.siteAddress = response.results[0].formatted_address;
            }
            return statisticDTO;
          });
          return forkJoin(observablesRef);
        })
      )
    );
  }

  public whenInputDateChange(evt: Event): void {
    const dateSearch = (evt.target as HTMLInputElement).value;
    this.loadAllStatistics(dateSearch && dateSearch !== '' ? dateSearch : '');
  }

  public whenCallToUser(evt: Event, cellphone: string): void {
    evt.stopPropagation();
    open(`tel:+51${cellphone}`);
  }

  public whenIncidenceClick(
    statistic: StatisticsDTO,
    cardRef: HTMLElement
  ): void {
    // UI LOGIC
    document.querySelectorAll('.js-incidence-card').forEach((incidenceCard) => {
      incidenceCard.classList.remove('border-indigo-500');
      incidenceCard.classList.add('border-gray-200');
    });
    cardRef.classList.remove('border-gray-200');
    cardRef.classList.add('border-indigo-500');
    // MAIN LOGIC
    if (this.googleMarkerRef) this.googleMarkerRef.map = null;

    const { latitude, longitude } = statistic;
    this.googleMapRef.setCenter({ lat: latitude, lng: longitude });
    this.googleMapRef.setZoom(14);
    this.googleMarkerRef = new this.AdvancedMarkerElementRef({
      map: this.googleMapRef,
      position: { lat: latitude, lng: longitude },
      title: `lat: ${latitude}, lng: ${longitude}`,
    });
    // INFOWINDOW
    if (this.googleInfoWindowRef) this.googleInfoWindowRef.close();
    else this.googleInfoWindowRef = new this.InfoWindowRef();

    this.googleInfoWindowRef.setContent(statistic.siteAddress);
    this.googleInfoWindowRef.open(this.googleMapRef, this.googleMarkerRef);
  }

  public checkCurrentIncidence(registerDate: string) {
    const parsedRegisterDate = new Date(registerDate);
    const tenMinutesLater = new Date(
      parsedRegisterDate.getTime() + 10 * 60 * 1000
    );
    const currentDate = new Date();

    if (
      parsedRegisterDate.getFullYear() === currentDate.getFullYear() &&
      parsedRegisterDate.getMonth() === currentDate.getMonth() &&
      parsedRegisterDate.getDate() === currentDate.getDate()
    ) {
      if (
        tenMinutesLater.getHours() > currentDate.getHours() ||
        (tenMinutesLater.getHours() === currentDate.getHours() &&
          tenMinutesLater.getMinutes() > currentDate.getMinutes())
      ) {
        return true;
      } else if (tenMinutesLater > currentDate) return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }
}
