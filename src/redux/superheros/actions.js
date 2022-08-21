import { createAction } from "@reduxjs/toolkit";

export const fetchHerosRequest = createAction("fetchHerosRequest");
export const fetchHerosSuccess = createAction("fetchHerosSuccess");
export const fetchHerosError = createAction("fetchHerosError");

export const fetchByIdReqest = createAction("fetchByIdReqest");
export const fetchByIdSuccess = createAction("fetchByIdSuccess");
export const fetchByIdError = createAction("fetchByIdError");

export const addHerosRequest = createAction("addHerosRequest");
export const addHerosSuccess = createAction("addHerosSuccess");
export const addHerosError = createAction("addHerosError");

export const deleteHeroRequest = createAction("deleteHeroRequest");
export const deleteHeroSuccess = createAction("deleteHeroSuccess");
export const deleteHeroError = createAction("deleteHeroError");

export const editImageRequest = createAction("addImageRequest");
export const editImageSuccess = createAction("addImageSuccess");
export const editImageError = createAction("addImageError");

export const toClearHero = createAction("toClearHero");

export const toCleanError = createAction("toCleanError");
export const toCleanAdded = createAction("toCleanAdded");