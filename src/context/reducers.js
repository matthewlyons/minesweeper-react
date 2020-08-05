const initialState = {
  gameTime: Date.now(),
  lost: false,
  won: false,
  gameBoard: [],
  height: 10,
  width: 10,
  bomb_percent: 0.1
};

const types = {
  SET_NEWGAME: 'SET_NEWGAME',
  SET_GAMEBOARD: 'SET_GAMEBOARD',
  SET_LOST: 'SET_LOST',
  SET_WON: 'SET_WON'
};

const reducer = (state = initialState, action) => {
  let updatedState;
  switch (action.type) {
    case types.SET_NEWGAME:
      updatedState = {
        ...state,
        gameBoard: action.payload,
        gameTime: Date.now()
      };
      return updatedState;
    case types.SET_GAMEBOARD:
      updatedState = { ...state, gameBoard: action.payload };
      return updatedState;
    case types.SET_LOST:
      updatedState = { ...state, lost: action.payload };
      return updatedState;
    case types.SET_WON:
      updatedState = { ...state, won: action.payload };
      return updatedState;
    default:
      throw new Error('Unexpected action');
  }
};

export { initialState, types, reducer };
