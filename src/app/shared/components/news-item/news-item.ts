import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InteractionStore } from '../../../store/interaction.store';
import { ConfirmationService } from 'primeng/api';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'c-news-item',
  imports: [DatePipe, ButtonModule, RouterLink],
  templateUrl: './news-item.html',
  styleUrl: './news-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsItem {
  article = input.required<Article>();
  interaction = inject(InteractionStore);
  confirmationService = inject(ConfirmationService);
  onEdit = output<void>();
  onDelete = output<void>();

  edit(event: MouseEvent) {
    event.stopPropagation();
    this.onEdit.emit();
  }

  deleteConfirmation(event: MouseEvent) {
    event.stopPropagation();
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.delete();
      },
      reject: () => {},
    });
  }

  delete() {
    this.onDelete.emit();
  }
}
