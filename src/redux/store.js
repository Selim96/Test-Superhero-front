import { configureStore } from "@reduxjs/toolkit";
import reducer from "./superheros/reduser";

export const store = configureStore({reducer});