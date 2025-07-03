import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  sanitizer = inject(DomSanitizer);
  transform(value: unknown, ...args: unknown[]): unknown {
    return this.sanitizer.bypassSecurityTrustHtml(value as string);
  }

}
