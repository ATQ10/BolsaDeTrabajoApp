import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images: string[] = [];
  constructor() { 
    this.images[0]="https://www.business.com/images/content/5e5/6e2775a215e1c688b4573/1500-0-";
    this.images[1]="https://tikinti.org/wp-content/uploads/2013/03/edificio-z-02.jpg";
    this.images[2]="http://www.openmet.com/wp-content/uploads/2016/05/compromiso-de-los-trabajadores.jpg";
  }

  ngOnInit(): void {
  }

}
