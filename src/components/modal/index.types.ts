import React from 'react';

export type Props = {
  title: string;
  children: React.ReactNode;
  action: () => void;
};
