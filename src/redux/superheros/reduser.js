const initialState = {
    allHeros: [],
    dataLength: 0,
    onLoading: false,
    error: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.payload];

    case "DELETE_NOTE":
      return state.filter(note => note.id !== action.payload.id);

    default:
      return state;
  }
}