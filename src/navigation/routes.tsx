import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage';
import { TextRepeaterPage } from '@/pages/TextRepeaterPage';
import { TextToEmojiPage } from '@/pages/TextToEmojiPage';
import { UpperPage } from '@/pages/UpperPage';
import { FontsPage } from '@/pages/FontsPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/text-repeater', Component: TextRepeaterPage },
  { path: '/text-to-emoji', Component: TextToEmojiPage },
  { path: '/upper', Component: UpperPage },
  { path: '/fonts', Component: FontsPage },
];
