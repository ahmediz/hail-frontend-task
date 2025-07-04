import { HttpClient } from '@angular/common/http';
import { effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { API_URL } from '../shared/components/constants/api.constant';
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

type NewsState = {
  articles: Article[] | undefined;
  filters: Filter<string>[] | undefined;
  meta: Meta | undefined;
};

const initialState: NewsState = {
  articles: undefined,
  filters: undefined,
  meta: undefined,
};

export const NewsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const apiUrl = `${API_URL}/articles`;
    const http = inject(HttpClient);

    return {
      getArticles({
        page = 1,
        pageSize = 5,
        filters,
      }: {
        page?: number;
        pageSize?: number;
        filters?: Filter<string>[];
      }) {
        const url = new URL(apiUrl);
        url.searchParams.set('sort', 'createdAt:desc');
        url.searchParams.set('filters[isArchived][$eq]', 'false');

        if (filters) {
          patchState(store, {
            filters,
          });
          filters?.forEach((filter, index) =>
            url.searchParams.set(
              `filters${filter.type === 'or' ? `[$or][${index}]` : ''}[${filter.field}][${filter.operator || '$eq'}]`,
              filter.value.toString()
            )
          );
        }
        url.searchParams.set('pagination[page]', page.toString());
        url.searchParams.set('pagination[pageSize]', pageSize.toString());
        return firstValueFrom(
          http.get<HttpResponse<Article[]>>(url.toString()).pipe(
            tap((articles) => {
              patchState(store, {
                articles: articles.data,
                meta: articles.meta,
              });
            })
          )
        );
      },
      updateArticle(id: number, article: Article) {
        return firstValueFrom(
          http
            .put<HttpResponse<Article>>(`${apiUrl}/${id}`, {
              data: article,
            })
            .pipe(
              tap((article) => {
                patchState(store, {
                  articles: store
                    .articles()
                    ?.map((a) => (a.documentId === id ? article.data : a)),
                });
              })
            )
        );
      },
      addArticle(article: Article) {
        return firstValueFrom(
          http
            .post<HttpResponse<Article>>(apiUrl, {
              data: article,
            })
            .pipe(
              tap((article) => {
                patchState(store, {
                  articles: [article.data, ...(store.articles() || [])],
                });
              })
            )
        );
      },
      deleteArticle(id: number) {
        return firstValueFrom(
          http.delete<HttpResponse<Article>>(`${apiUrl}/${id}`).pipe(
            tap(() => {
              patchState(store, {
                articles: store.articles()?.filter((a) => a.documentId !== id),
              });
            })
          )
        );
      },
    };
  }),
  withComputed((store) => ({}))
);
