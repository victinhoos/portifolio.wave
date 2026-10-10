import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SlideItem {
  id: number;
  titulo: string;
  categoria: string;
  descricao: string;
  banner: string;
  techs: string[];
  linkedin?: string;
  github?: string;
  doc?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Slide {
  private readonly url = '/local/slide.json';

  constructor(private http: HttpClient) {}

  listar(): Observable<SlideItem[]> {
    return this.http.get<SlideItem[]>(this.url);
  }
}