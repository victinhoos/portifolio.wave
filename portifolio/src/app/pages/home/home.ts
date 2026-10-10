import { Component } from '@angular/core';

import { Header } from '../../components/header/header';
import { Sobre } from '../../components/sobre/sobre'
import { Carrosel } from "../../components/carrosel/carrosel";
import { Projetos } from "../../components/projetos/projetos";
import { Footer } from "../../components/footer/footer"; 

@Component({
  selector: 'app-home',
  imports: [Header, Sobre, Carrosel, Projetos, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
