import { Component, Input, OnInit } from '@angular/core';
import { MenuItens } from '../../interfaces/menu-itens';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.scss'
})
export class ItemMenuComponent implements OnInit {
  @Input('item') item: MenuItens = {nome: '.', isfocus: false, page: ''};

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.activateItem();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
          this.activateItem();
      }
    });
  }
  activateItem() {
    if(this.router.url.includes(`/${this.item.page}`)) {
      this.item.current = true;
    } else {
      this.item.current = false;
    }
  }

  navigate(location: string) {
    if(location != 'exit')
      this.router.navigate([`${location}`], { relativeTo: this.route});
    else
      this.exit();
  }

  exit() {
    this.router.navigate(['login']);
  }
}
