import dayjs from 'dayjs';
import { VNode, h, Text } from 'vue';

import { defaultDateAndTimeWithSecondsFormat } from '@shared/constants';

export function getDateToShowInTable(
  value?: string,
  defaultValue = '',
  format = defaultDateAndTimeWithSecondsFormat,
): VNode {
  return h(Text, typeof value === 'string' ? dayjs(value).format(format) : defaultValue);
}
