import React from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';

export const CustomDialog = ({
  visible,
  hideDialog,
  text,
}: {
  visible: boolean;
  hideDialog: () => void;
  text: string;
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>System Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{text}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
