type Area = {
  id: number;
  label: string;
  fillColor: string;
  borderColor: string;
  corners: [number, number][];
  createdAt: string;
  updatedAt: string;
};

type AreaCreate = Pick<Area, 'id' | 'corners'>;

type AreaUpdate = Pick<Area, 'id'> & Partial<Pick<Area, 'corners'>>;
