import { MatPaginatorIntl } from '@angular/material/paginator';

export class MatPaginatorIntlRussian extends MatPaginatorIntl {

  override itemsPerPageLabel = 'Элементов на странице:';
  override nextPageLabel = 'Вперёд';
  override previousPageLabel = 'Назад';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 из ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} из ${length}`;
  };
}
