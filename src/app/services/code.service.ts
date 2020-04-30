import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class CodeService {

    url = 'https://scannables.scdn.co/uri/plain';

    constructor(protected http: HttpClient) {}

    /**
     * Service used to get the spotify sound wave
     *
     * @param format format could be JPEG, SVG, PNG
     * @param backgroundColor rgb color. If it has a # it will be removed
     * @param color WHITE or BLACK
     * @param size size from 256px to 2047px
     * @param uri spotify playlist or song uri, ex: spotify:track:6cy3ki60hLwimwIje7tALf
     */
    getCode(format: string, backgroundColor: string, color: string, size: number, uri: string): Observable<Blob> {
        backgroundColor = backgroundColor.replace('#', '');
        const url = `${this.url}/${format}/${backgroundColor}/${color}/${size}/${uri}`;
        console.log(url);
        return this.http.get<Blob>(url, { responseType : 'blob' as 'json' });
    }
}
