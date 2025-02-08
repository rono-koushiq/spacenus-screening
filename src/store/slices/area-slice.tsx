import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AreaState = {
  areas: Area[];
};

const initialState: AreaState = {
  areas: [],
};

const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    createArea: (state, action: PayloadAction<AreaCreate>) => {
      const areaId = action.payload.id;
      const areaLabel = `polygon_${areaId}`;

      state.areas.push({
        id: areaId,
        label: areaLabel,
        corners: action.payload.corners,
        borderColor: '#2563eb',
        fillColor: '#93c5fd',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },

    updateArea: (state, action: PayloadAction<AreaUpdate>) => {
      const targetArea = state.areas.find(
        (area) => area.id === action.payload.id,
      );
      if (!targetArea) return;

      const { id, ...restPayload } = action.payload; // eslint-disable-line @typescript-eslint/no-unused-vars

      Object.assign(targetArea, restPayload);
    },

    deleteArea: (state, action: PayloadAction<Pick<Area, 'id'>>) => {
      state.areas = state.areas.filter((area) => area.id !== action.payload.id);
    },
  },
});

export const { createArea, updateArea, deleteArea } = areaSlice.actions;
const areaReducer = areaSlice.reducer;
export default areaReducer;
