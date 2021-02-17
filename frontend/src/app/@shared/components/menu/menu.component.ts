import { Component } from '@angular/core';

interface MenuItem {
  text: string;
  icon: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public readonly menuList: MenuItem[] = [
    {text: "Задачи", icon: "task_alt"},
    {text: "Ссылки", icon: "link"},
    {text: "Заметки", icon: "sticky_note_2"},
    {text: "Файлы", icon: "folder"},
  ];
}
