import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModal: null,
  modalHistory: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeActiveModal(state, action) {
      let newActiveModal = action.payload || null;
      let localModalHistory = state.modalHistory ? [...state.modalHistory] : [];

      if (newActiveModal === null) {
        localModalHistory = [];
      } else if (state.modalHistory.indexOf(newActiveModal) !== -1) {
        localModalHistory = localModalHistory.splice(
          0,
          localModalHistory.indexOf(newActiveModal) + 1
        );
      } else {
        localModalHistory.push(newActiveModal);
      }

      state.activeModal = newActiveModal;
      state.modalHistory = localModalHistory;
    },
    modalBack(state, action) {
      console.log(action.payload);
      state.activeModal = null;
      // changeActiveModal(state.modalHistory[state.modalHistory.length - 3]);
    },
  },
});

export default modalSlice.reducer;
export const { changeActiveModal, modalBack } = modalSlice.actions;
