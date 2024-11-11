import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage';
import { TextRepeaterPage } from '@/pages/TextRepeaterPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/text-repeater', Component: TextRepeaterPage }
];
