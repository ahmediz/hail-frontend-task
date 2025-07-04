import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { httpResource } from '@angular/common/http';
import { API_URL } from '../../../shared/components/constants/api.constant';
import { DatePipe } from '@angular/common';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html-pipe';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'c-article-details',
  imports: [ButtonModule, RouterLink, DatePipe, SafeHtmlPipe, SkeletonModule],
  templateUrl: './article-details.html',
  styleUrl: './article-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetails {
  route = inject(ActivatedRoute);
  id = toSignal(this.route.params.pipe(map((params) => params['id'])));
  articleResource = httpResource<HttpResponse<Article>>(
    () => `${API_URL}/articles/${this.id()}`,
    {
      defaultValue: undefined,
    }
  );
  article = computed<Article | undefined>(() => this.articleResource.value()?.data);
  isLoading = computed(() => this.articleResource.isLoading());
}
