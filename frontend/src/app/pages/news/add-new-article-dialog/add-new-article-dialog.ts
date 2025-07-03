import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { NewsStore } from '../../../store/news.store';
import { CheckboxModule } from 'primeng/checkbox';
import { InteractionStore } from '../../../store/interaction.store';
import { EditorModule } from 'primeng/editor';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'c-add-new-article-dialog',
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    TextareaModule,
    MessageModule,
    CheckboxModule,
    EditorModule,
  ],
  templateUrl: './add-new-article-dialog.html',
  styleUrl: './add-new-article-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewArticleDialog {
  dialogConfig = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);
  fb = inject(FormBuilder);
  newsStore = inject(NewsStore);
  interaction = inject(InteractionStore);
  messageService = inject(MessageService);
  form: FormGroup;
  tags = ['tag1', 'tag2', 'tag3'];
  article = this.dialogConfig.data?.article as Article;

  ngOnInit() {
    this.initForm();
  }

  async save() {
    let formValue = this.form.value;

    formValue = {
      ...formValue,
      tags: formValue.tags.join(','),
    };

    this.interaction.turnOnNamedLoading('save');
    if (this.article) {
      await this.newsStore.updateArticle(this.article.documentId!, formValue);
      this.newsStore.getArticles({
        filters: this.newsStore.filters(),
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Article updated successfully',
      });
    } else {
      await this.newsStore.addArticle(formValue);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Article added successfully',
      });
    }
    this.interaction.turnOffNamedLoading('save');
    this.ref.close();
  }

  private initForm() {
    let title = null;
    let shortSummary = null;
    let content = null;
    let tags = null;
    if (this.article) {
      title = this.article.title;
      content = this.article.content;
      shortSummary = this.article.shortSummary;
      tags = this.article.tags.split(',');
    }
    this.form = this.fb.group({
      title: [title, Validators.required],
      shortSummary: [shortSummary, Validators.required],
      tags: [tags, Validators.required],
      content: [content, Validators.required],
      isArchived: [this.article?.isArchived || false],
    });
  }
}
