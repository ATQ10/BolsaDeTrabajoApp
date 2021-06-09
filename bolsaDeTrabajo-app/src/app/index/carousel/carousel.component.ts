import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images: string[] = [];
  constructor() { 
    this.images[0]="https://picsum.photos/id/944/900/500";
    this.images[1]="https://picsum.photos/id/1011/900/500";
    this.images[2]="https://picsum.photos/id/984/900/500";
  }

  ngOnInit(): void {
  }

}
