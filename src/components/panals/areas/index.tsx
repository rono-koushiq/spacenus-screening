'use client';
import { cn } from '@/lib/utilities';
import { RootState } from '@/store';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Area from './area';
import classes from './index.module.scss';

type Props = {};

export default function AreasPanel({}: Props) {
  const { areas } = useSelector((state: RootState) => state.area);

  return (
    <div className={cn(classes['area-panel'])}>
      <div className={cn(classes['header'])}>
        <h4>Areas</h4>
      </div>
      <div className={cn(classes['body'])}>
        {areas.map((area, idx) => {
          return (
            <Fragment key={`areas-panel_area_${area.id}`}>
              {!!idx && <div className={cn(classes['divider'])} />}
              <Area data={area} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
