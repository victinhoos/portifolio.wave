import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css'
})
export class Projetos implements OnInit {
  listaProjetos: any[] = [];
  projetosFiltrados: any[] = [];
  projetosExibidos: any[] = [];
  
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number[] = [];
  filtroAtivo = 'Todos';

  configTechs: any = {
    'SpringBoot': { icone: 'bi-patch-check-fill' },
    'Java':       { icone: 'bi-filetype-java' },
    'Docker':     { icone: 'bi-box-seam-fill' },
    'Laravel':    { icone: 'bi-filetype-php' },
    'Angular':    { icone: 'bi-hexagon-fill' },
    'PostgreSQL': { icone: 'bi-database-fill' },
    'HTML':       { icone: 'bi-filetype-html' },
    'CSS':        { icone: 'bi-filetype-css' },
    'TypeScript': { icone: 'bi-filetype-tsx' },
    'AWS':        { icone: 'bi-cloud-check-fill' }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Busca o JSON na pasta public/local/
    this.http.get<any[]>('local/projetos.json').subscribe({
      next: (data) => {
        this.listaProjetos = data.map(p => ({
          ...p,
          techsConfiguradas: p.techs.map((t: string) => ({
            nome: t,
            icone: this.configTechs[t]?.icone || 'bi-cpu-fill'
          }))
        }));
        this.filtrar('Todos');
      },
      error: (err) => console.error('Erro ao carregar projetos:', err)
    });
  }

  filtrar(categoria: string) {
    this.filtroAtivo = categoria;
    this.paginaAtual = 1;
    this.projetosFiltrados = categoria === 'Todos' 
      ? this.listaProjetos 
      : this.listaProjetos.filter(p => p.categoria === categoria);
    this.gerarPaginas();
    this.definirExibicao();
  }

  gerarPaginas() {
    const qtd = Math.ceil(this.projetosFiltrados.length / this.itensPorPagina);
    this.totalPaginas = Array.from({ length: qtd }, (_, i) => i + 1);
  }

  definirExibicao() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    this.projetosExibidos = this.projetosFiltrados.slice(inicio, inicio + this.itensPorPagina);
  }

  irParaPagina(num: number) {
    this.paginaAtual = num;
    this.definirExibicao();
    
    const secao = document.getElementById('projetos-secao');
    if (secao) {
      secao.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}