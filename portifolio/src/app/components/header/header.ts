import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para o *ngIf
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  headerVisivel = false;
  
  // Texto completo que queremos
  textoSobre = "Olá, eu sou Victor!";
  // Texto que o Angular vai mostrar (começa vazio)
  textoDigitado = "";
  // Indice para controlar qual letra estamos digitando
  indexTexto = 0;
  // Booleano para saber se a animação já aconteceu
  jaDigitou = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollAtual = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostra o header (ajuste 400 se necessário)
    this.headerVisivel = scrollAtual > 100;

    // Começa a digitação assim que o Header desce e APENAS uma vez
    if (this.headerVisivel && !this.jaDigitou) {
      this.jaDigitou = true;
      this.iniciarDigitacao();
    }
  }

  iniciarDigitacao() {

    this.textoDigitado = "Olá, ";
    this.indexTexto = 5;

    let typingInterval = setInterval(() => {
      if (this.indexTexto < this.textoSobre.length) {
        this.textoDigitado += this.textoSobre.charAt(this.indexTexto);
        this.indexTexto++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); 
  }
}