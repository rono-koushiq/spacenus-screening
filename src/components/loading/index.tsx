import React from 'react';
import classes from './index.module.scss';
import { cn } from '@/lib/utilities';

type Props = {
  fullScreen?: boolean;
};

export default function Loading({ fullScreen = true }: Props) {
  return (
    <div className={cn(classes['loader-container'])}>
      <div className={cn(classes['loader'])} />
    </div>
  );
}
