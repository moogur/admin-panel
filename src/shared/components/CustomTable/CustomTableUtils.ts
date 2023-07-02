import { Sort, SortOrder } from '@shared/types';

export function getCurrentSortOrder(key: string, previousSorter?: Sort<string>): SortOrder {
  if (previousSorter?.sortOrder === undefined) return null;

  if (key !== previousSorter.key) return 'ascend';

  switch (previousSorter.sortOrder) {
    case 'ascend': {
      return 'descend';
    }

    case 'descend': {
      return null;
    }

    default: {
      return 'ascend';
    }
  }
}
