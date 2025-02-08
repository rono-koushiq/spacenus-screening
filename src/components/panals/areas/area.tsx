'use client';
import { DeleteIcon } from '@/components/icons/delete-icon';
import { cn } from '@/lib/utilities';
import { deleteArea } from '@/store/slices/area-slice';
import { useDispatch } from 'react-redux';
import classes from './index.module.scss';

type Props = {
  data: Area;
};

export default function Area({ data }: Props) {
  const dispatch = useDispatch();
  const { label, corners } = data;

  const handleDelete = () => {
    dispatch(deleteArea({ id: data.id }));
  };

  return (
    <div className={cn(classes['area'])}>
      <div className={cn(classes['header'])}>
        <h6>{label}</h6>
        <div className={cn(classes['controls'])}>
          <button className="icon" onClick={handleDelete}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className={cn(classes['corners'])}>
        <h6>Corners:</h6>
        <ul className={cn(classes['list'])}>
          {corners.slice(0, corners.length - 1).map((corner, idx) => {
            return (
              <li
                className={cn(classes['corner'])}
                key={`area-corners-list-corner-${idx}`}
              >
                <div className={cn(classes['lat'])}>
                  <label>Lat:</label>
                  <input defaultValue={corner[0]} />
                </div>
                <div className={cn(classes['lng'])}>
                  <label>Lng:</label>
                  <input defaultValue={corner[1]} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
