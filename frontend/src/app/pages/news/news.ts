import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MaxWidthContainer } from '../../shared/components/max-width-container/max-width-container';
import { NewsItem } from '../../shared/components/news-item/news-item';
import { HttpClient } from '@angular/common/http';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddNewArticleDialog } from './add-new-article-dialog/add-new-article-dialog';
import { NewsStore } from '../../store/news.store';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InteractionStore } from '../../store/interaction.store';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-news',
  imports: [
    ButtonModule,
    MaxWidthContainer,
    NewsItem,
    DynamicDialogModule,
    SelectModule,
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule,
    InputTextModule,
    SkeletonModule,
  ],
  templateUrl: './news.html',
  styleUrl: './news.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class News {
  http = inject(HttpClient);
  dialogService = inject(DialogService);
  newsStore = inject(NewsStore);
  interaction = inject(InteractionStore);
  destroyRef = inject(DestroyRef);
  messageService = inject(MessageService);
  articles = computed(() => this.newsStore.articles());
  loadingArray = signal<any[]>(Array.from({ length: 8 }, (v, i) => i));
  meta = computed(() => this.newsStore.meta());
  articleStatuses = [
    { label: 'Published', value: false },
    { label: 'Archived', value: true },
  ];
  search = new FormControl('');
  selectedArticleStatus = signal<boolean>(false);

  constructor() {}

  ngOnInit() {
    this.newsStore.getArticles({});
    this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.newsStore.getArticles({
          filters: [
            {
              field: 'title',
              operator: '$contains',
              value: value as string,
              type: 'or',
            },
            {
              field: 'content',
              operator: '$contains',
              value: value as string,
              type: 'or',
            },
          ],
        });
      });
  }

  onPageChange($event: PaginatorState) {
    this.newsStore.getArticles({
      page: $event.page! + 1,
      pageSize: $event.rows!,
    });
  }

  onArticleStatusChange($event: SelectChangeEvent) {
    const value = $event.value;
    this.newsStore.getArticles({
      filters: [{ field: 'isArchived', value }],
    });
  }

  async deleteArticle(article: Article) {
    this.interaction.turnOnNamedLoading('delete');
    await this.newsStore.deleteArticle(article.documentId!);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Article deleted successfully',
    });
    this.interaction.turnOffNamedLoading('delete');
  }

  openAddNewArticleDialog(article?: Article) {
    this.dialogService.open(AddNewArticleDialog, {
      header: article ? `Edit ${article.title}` : 'Add New Article',
      modal: true,
      focusOnShow: false,
      closable: true,
      closeOnEscape: true,
      ariaLabelledBy: 'add-new-article-dialog',
      closeAriaLabel: 'Close',
      data: {
        article,
      },
    });
  }
}
