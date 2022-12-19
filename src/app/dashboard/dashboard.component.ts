import { Component } from '@angular/core';
import { IHero } from '../Ihero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  heroes: IHero[] = [];

  constructor(private heroeService: HeroService){}

  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroeService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
