import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl    = 'https://www.googleapis.com/youtube/v3/';
  private apiKey        = 'AIzaSyCAQRVoKp0O1sjaQf5TP9NfZGQGmCq6zBY';
  private playlistId    = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private http: HttpClient) {}

  getVideos$() {
    const URL = `${ this.youtubeUrl }playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('maxResults', '10')
      .set('playlistId', this.playlistId);

    return this.http.get( URL, { params } );
  }

}
