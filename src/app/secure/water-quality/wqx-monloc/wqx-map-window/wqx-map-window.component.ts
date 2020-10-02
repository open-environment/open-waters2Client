import { AgmMap } from '@agm/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'ngx-wqx-map-window',
  templateUrl: './wqx-map-window.component.html',
  styleUrls: ['./wqx-map-window.component.scss']
})
export class WqxMapWindowComponent implements OnInit, AfterViewInit {

  lat = 51.678418;
  lng = 7.809007;

  @ViewChild('agmMap', { static: false })
  agmMap: AgmMap;
  constructor(private windowRef: NbWindowRef) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('Resizing');
      if (this.windowRef.config !== null && this.windowRef.config.context !== null) {
        let data = {} as DummyLatLng;
        data = JSON.parse(JSON.stringify(this.windowRef.config.context));
        console.log(data);
        this.lat = +data.lat;
        this.lng = +data.lng;
        this.agmMap.latitude = +this.lat.toFixed(4);
        this.agmMap.longitude = +this.lng.toFixed(4);
        this.agmMap.triggerResize();
      } else {
        this.agmMap.triggerResize();
      }

    }, 100);
  }

  ngOnInit() {
  }

  mapClicked($event: MouseEvent) {
    this.lat = +$event.coords.lat.toFixed(4);
    this.lng = +$event.coords.lng.toFixed(4);
    const data = {} as DummyLatLng;
    data.lat = this.lat.toFixed(4);
    data.lng = this.lng.toFixed(4);
    this.windowRef.config.context = data;
    this.windowRef.close();
  }

}
interface DummyLatLng {
  lat: string;
  lng: string;
}
