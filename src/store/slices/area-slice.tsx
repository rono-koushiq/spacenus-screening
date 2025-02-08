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
      const areaId =
        state.areas.length > 0
          ? Math.max(...state.areas.map((area) => area.id)) + 1
          : 0;
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
      const index = state.areas.findIndex(
        (area) => area.id === action.payload.id,
      );
      if (index !== -1) {
        state.areas[index].corners = action.payload.corners;
      }
    },

    deleteArea: (state, action: PayloadAction<Pick<Area, 'id'>>) => {
      state.areas = state.areas.filter((area) => area.id !== action.payload.id);
    },
  },
});

export const { createArea, updateArea, deleteArea } = areaSlice.actions;
const areaReducer = areaSlice.reducer;
export default areaReducer;
