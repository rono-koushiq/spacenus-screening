'use client';
import { DeleteIcon } from '@/components/icons/delete-icon';
import { cn } from '@/lib/utilities';
import { deleteArea, updateArea } from '@/store/slices/area-slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import classes from './index.module.scss';

type Props = {
  data: Area;
};

const formSchema = z.object({
  corners: z.array(z.tuple([z.number(), z.number()])),
});

export default function Area({ data }: Props) {
  const dispatch = useDispatch();
  const { label, corners } = data;
  // const [editable, setEditable] = useState<boolean>(false);

  const handleDelete = () => {
    dispatch(deleteArea({ id: data.id }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      corners: data.corners,
    },
  });

  useEffect(() => {
    reset({ corners: data.corners });
  }, [data.corners, reset]);

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    try {
      const { corners } = formData;

      const lastIdx = corners.length - 1;
      const first = corners[0];
      const last = corners[lastIdx];

      if (first[0] !== last[0] || first[1] !== last[1]) {
        throw new Error('First and last corners should be same');
      }

      dispatch(
        updateArea({
          id: data.id,
          corners,
        }),
      );
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(classes['area'])}>
        <div className={cn(classes['header'])}>
          <h6>{label}</h6>
          <div className={cn(classes['controls'])}>
            <button type="button" className="icon" onClick={handleDelete}>
              <DeleteIcon />
            </button>
          </div>
        </div>

        <div className={cn(classes['corners'])}>
          <h6>Corners:</h6>
          <ul className={cn(classes['list'])}>
            {corners.map((_, idx) => {
              return (
                <li
                  className={cn(classes['corner'])}
                  key={`area-corners-list-corner-${idx}`}
                >
                  <div className={cn(classes['lat'])}>
                    <label>Lat:</label>
                    <input
                      {...register(`corners.${idx}.0`, { valueAsNumber: true })}
                    />
                    {errors.corners?.[idx]?.[0] && (
                      <span>Invalid latitude</span>
                    )}
                  </div>
                  <div className={cn(classes['lng'])}>
                    <label>Lng:</label>
                    <input
                      {...register(`corners.${idx}.1`, { valueAsNumber: true })}
                    />
                    {errors.corners?.[idx]?.[1] && (
                      <span>Invalid longitude</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={classes['submit']}>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}
