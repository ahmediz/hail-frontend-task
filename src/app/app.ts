import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaxWidthContainer } from './shared/components/max-width-container/max-width-container';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SettingsStore } from './store/settings.store';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MaxWidthContainer,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'hail-frontend-task';
  settingsStore = inject(SettingsStore);
}
