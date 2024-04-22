import { Component, Input } from '@angular/core';
import { MenuItens } from '../../interfaces/menu-itens';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.scss'
})
export class ItemMenuComponent {
  @Input('item') item: MenuItens = {nome: '.', isfocus: false, page: ''};

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('teste');
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
