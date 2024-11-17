import { Button, List, Modal, Section, Snackbar} from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type Props = {
    showResult: boolean;
    setShowResult: (show: boolean) => void;
    result: string;
};

export const ResultModal: FC<Props> = ({
    showResult,
    setShowResult,
    result
}) => {
    const [snak, setSnak] = useState(false);

    const onCopyText = () => {
        setShowResult(false);
        setSnak(true);
    }

    return (
        <>
            <Modal
                header={<ModalHeader />}
                open={showResult}
                modal
                dismissible
                onOpenChange={setShowResult}
            >
                <List
                    style={{
                        padding: '0 20px 40px'
                    }}
                >
                    <Section
                        style={{
                            height: '300px',
                            overflow: 'auto'
                        }}
                    >
                        <pre>{result}</pre>
                    </Section>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <CopyToClipboard
                            text={result}
                            onCopy={onCopyText}
                        >
                            <Button>Copy</Button>
                        </CopyToClipboard>
                    </div>
                </List>
            </Modal>

            {
                snak && (
                    <Snackbar
                        onClose={() => setSnak(false)}
                    >
                        Copied!
                    </Snackbar>
                )
            }
        </>
    );
}