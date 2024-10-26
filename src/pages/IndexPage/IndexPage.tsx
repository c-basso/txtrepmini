import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <List>

        <Section
          header="Text Tools"
        >
          <Link to="/text-repeater">
            <Cell
              subtitle='Repeat text many times'
            >
                Text Repeater
            </Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};
