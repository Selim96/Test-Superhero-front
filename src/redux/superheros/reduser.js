import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import * as action from "../superheros/actions";

const herosReduser = createReducer({heros: [], dataLength: 0}, {
  [action.fetchHerosSuccess]: (_, { payload }) => ({heros: [...payload.result], dataLength: payload.dataLength}),
  [action.deleteHeroSuccess]: (state, { payload }) => ({heros: state.heros.filter(item => item._id !== payload), dataLength: state.dataLength - 1}),
  [action.addHerosSuccess]: (state, {payload}) => ({heros: [payload, ...state.heros], dataLength: state.dataLength + 1})
});

const aboutHeroReducer = createReducer({}, {
  [action.toClearHero]: () => ({}),
  [action.addHerosSuccess]: (_, { payload }) => ({ ...payload }),
  [action.fetchByIdSuccess]: (_, { payload }) => ({...payload }),
  [action.editImageSuccess]: (state, { payload }) => ({...state, images: [...payload.images]}),
});

const isAddedReducer = createReducer(false, {
  [action.addHerosSuccess]: () => true,
  [action.toCleanAdded]: () => false
});

const loadingReducer = createReducer(false, {
  [action.fetchHerosRequest]: () => true,
  [action.fetchHerosSuccess]: () => false,
  [action.fetchHerosError]: () => false,

  [action.deleteHeroRequest]: () => true,
  [action.deleteHeroError]: () => false,
  [action.deleteHeroSuccess]: () => false,

  [action.addHerosRequest]: () => true,
  [action.addHerosSuccess]: () => false,
  [action.addHerosError]: () => false,

  [action.fetchByIdReqest]: () => true,
  [action.fetchByIdSuccess]: () => false,
  [action.fetchByIdError]: () => false,

  [action.editImageRequest]: () => true,
  [action.editImageSuccess]: () => false,
  [action.editImageError]: () => false,
});

const errorReducer = createReducer(false, {
  [action.toCleanError]: () => false,
  [action.fetchHerosError]: (_, { payload }) => payload.message,
  [action.fetchByIdError]: (_, { payload }) => payload.message,
  [action.deleteHeroError]: (_, { payload }) => payload.message,
  [action.addHerosError]: (_, { payload }) => payload.message,
  [action.editImageError]: (_, { payload }) => payload.message
})

export default combineReducers({
    allHeros: herosReduser,
    aboutHeros: aboutHeroReducer,
    isAddedHero: isAddedReducer,
    onLoading: loadingReducer,
    error: errorReducer
});