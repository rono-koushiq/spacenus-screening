type Coordinate = [number, number];

type Area = {
  id: number;
  label: string;
  fillColor: string;
  borderColor: string;
  corners: Coordinate[];
  createdAt: string;
  updatedAt: string;
};

type AreaCreate = Pick<Area, 'corners'>;

type AreaUpdate = Pick<Area, 'id' | 'corners'>;
