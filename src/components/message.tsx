import React, { FunctionComponent } from 'react';

export interface MessageProps {
  message: string;
}

export const Message: FunctionComponent<MessageProps> = ({ message }) => {
  return <h2>{message}</h2>;
};
