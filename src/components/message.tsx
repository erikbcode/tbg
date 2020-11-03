import React, { FunctionComponent } from 'react';

export interface MessageProps {
  message: string;
}

export const Message: FunctionComponent<MessageProps> = ({ message }) => {
  return (
    <div>
      <b>{message}</b>
    </div>
  );
};
