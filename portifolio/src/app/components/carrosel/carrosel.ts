import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import projetosData from '../../../../public/local/projetos.json';

@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrosel.html', 
  styleUrls: ['./carrosel.css']   
})
export class Carrosel implements OnInit, OnDestroy {
  
  indexAtivo: number = 0;
  timer: any;
  projetos: any[] = projetosData;

  ngOnInit() {
    this.iniciarAutoPlay();
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  iniciarAutoPlay() {
    this.timer = setInterval(() => {
      this.proximo();
    }, 7000); 
  }

  proximo() {
    this.indexAtivo = (this.indexAtivo + 1) % this.projetos.length;
  }

  anterior() {
    this.indexAtivo = this.indexAtivo === 0 ? this.projetos.length - 1 : this.indexAtivo - 1;
  }

  pularPara(i: number) {
    this.indexAtivo = i;
  }
}