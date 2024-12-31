import { createSlice } from "@reduxjs/toolkit";

const intialSplitCreateState = {
  files: [],
  previews: [],
  fileInd: null,
  fileError: {
    error: null,
    file: null,
  },
  detailValidation: false,
  fileValidation: false,
  recFilter: null,
  recSorting: null,
  warFilter: null,
  warSorting: null

};

export const vaultSlice = createSlice({
  name: "vault",
  initialState: intialSplitCreateState,
  reducers: {
    pushFile(state, action) {
      const file = action.payload;
      state.files.push(file);
    },
    pushPreview(state, action) {
      const preview = action.payload;
      state.previews.push(preview);
    },
    setFileInd(state, action) {
      state.fileInd = action.payload;
    },
    deleteImg(state, action) {
      state.files.splice(action.payload, 1);
      state.previews.splice(action.payload, 1);
      state.fileInd = null;
    },
    setFileError(state, action) {
      const obj = { error: action.payload.error, file: action.payload.file };
      state.fileError = obj;
    },
    removeFileError(state, action) {
      state.fileError = { error: null, file: null };
    },
    setDetailValidation(state, action) {
      state.detailValidation = action.payload;
    },
    setFileValidation(state, action) {
      state.fileValidation = action.payload;
    },
    clearAll(state, action) {
      state.files = [];
      state.previews = [];
      state.fileInd = null;
      state.fileError = { file: null, error: null };
      state.detailValidation = false;
      state.fileValidation = false;

      state.recFilter = null;
      state.recSorting = null;
      state.warFilter = null;
      state.warSorting = null;

    },
    setRecFilter(state, action) {
      state.recFilter = action.payload;
    },
    setRecSorting(state, action) {
      state.recSorting = action.payload;
    },
    setWarFilter(state, action) {
      state.warFilter = action.payload;
    },
    setWarSorting(state, action) {
      state.warSorting = action.payload;
    }
  },
});
