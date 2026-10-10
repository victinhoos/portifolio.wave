import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Slide, SlideItem } from '../../services/slide';
@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrosel.html',
  styleUrl: './carrosel.css'
})
export class Carrosel implements OnInit, OnDestroy {
  indexAtivo = 0;
  timer: ReturnType<typeof setInterval> | undefined;
  projetos: SlideItem[] = [];

  private subscription?: Subscription;

  constructor(private slideService: Slide) {}

  ngOnInit(): void {
    this.subscription = this.slideService.listar().subscribe({
      next: (slides) => {
        this.projetos = slides;

        if (this.projetos.length > 1) {
          this.iniciarAutoPlay();
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar slides:', erro);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.subscription?.unsubscribe();
  }

  iniciarAutoPlay(): void {
    this.timer = setInterval(() => this.proximo(), 7000);
  }

  proximo(): void {
    if (this.projetos.length === 0) return;

    this.indexAtivo = (this.indexAtivo + 1) % this.projetos.length;
  }

  anterior(): void {
    if (this.projetos.length === 0) return;

    this.indexAtivo =
      this.indexAtivo === 0
        ? this.projetos.length - 1
        : this.indexAtivo - 1;
  }

  pularPara(i: number): void {
    this.indexAtivo = i;
  }
}
