import {createSlice} from '@reduxjs/toolkit';

const favSlice = createSlice({
  name: 'favList',
  initialState: {
    favList: [],
  },
  reducers: {
    favItem: (state, action) => {
      const itemInFav = state.favList.find(
        item => item.id === action.payload.id,
      );
      if (itemInFav) {
        const removeFavItem = state.favList.filter(
          item => item.id !== action.payload.id,
        );
        state.favList = removeFavItem;
      } else {
        state.favList.push({...action.payload});
      }
      console.log('favList Length:- ', state.favList.length);
    },
  },
});

export const favReducer = favSlice.reducer;
export const {favItem} = favSlice.actions;
