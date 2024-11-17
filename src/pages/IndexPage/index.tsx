import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <List>
        <Section
        >
          <Link to="/text-repeater">
            <Cell
              subtitle='Repeat text many times'
            >
                Text Repeater
            </Cell>
          </Link>
          <Link to="/text-to-emoji">
            <Cell
              subtitle='You can write text using emoji'
            >
                Text to Emoji
            </Cell>
          </Link>
          <Link to="/upper">
            <Cell
              subtitle='Make text big or small'
            >
                Upper/Lower case text
            </Cell>
          </Link>
          <Link to="/fonts">
            <Cell
              subtitle='Beautiful fonts for your messages'
            >
                Fonts for messages
            </Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};
