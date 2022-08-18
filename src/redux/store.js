import { createStore } from "redux";
import reducer from "./superheros/reduser";

export const store = createStore(reducer);