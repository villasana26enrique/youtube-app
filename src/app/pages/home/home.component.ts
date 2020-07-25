import { Component, OnInit, HostListener } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from 'src/app/models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showScrollHeight = 400;
  hideScrollHeight = 200;

  showGoUpButton: boolean;

  videos: Video[] = [];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  constructor(public youtubeService: YoutubeService) {
    this.showGoUpButton = false;
  }

  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos() {
    this.youtubeService.getVideos$()
      .subscribe( data => {
        /* De esta manera se va a agregando al array
        de videos, cada vez que este llamado se ejecute*/
        this.videos.push( ...data );
      });
  }

  verVideo( video: Video ) {
    Swal.fire({
      html: `
      <h4>${ video.title }</h4>
      <hr>
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/${ video.resourceId }"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      `
    });
  }

  onScroll(): void {
    this.cargarVideos();
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

}
