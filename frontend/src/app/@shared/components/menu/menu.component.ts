import { Component } from '@angular/core';
import { Pages } from '@shared/enums/pages.enum';
import { NavigationService } from '@shared/services/navigation.service';

interface MenuItem {
  text: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public readonly menuList: MenuItem[] = [
    {text: "Задачи", icon: "task_alt", url: `/${Pages.tasks}`},
    {text: "Ссылки", icon: "link", url: `/${Pages.links}`},
    {text: "Заметки", icon: "sticky_note_2", url: `/${Pages.notes}`},
    {text: "Файлы", icon: "folder", url: `/${Pages.files}`},
  ];

  constructor(private readonly navigationService: NavigationService) {}

  public navigate(route: string): void {
    this.navigationService.goToRoute(route);
  }
}
