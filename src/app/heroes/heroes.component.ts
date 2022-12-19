import { Component } from '@angular/core';
import { IHero } from '../Ihero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes: IHero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void{
    name = name.trim();
    if(!name){return ;}
    this.heroService.addHero({name} as IHero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: IHero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}

