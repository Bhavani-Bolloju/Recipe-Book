export function formReducer(state, action) {
  switch (action.type) {
    case "email": {
      return {
        ...state,
        email: action.value,
      };
    }
    case "password": {
      return {
        ...state,
        password: action.value,
      };
    }
    case "error": {
      return {
        ...state,
        error: action.value,
      };
    }
    case "loading": {
      return {
        ...state,
        loading: action.value,
      };
    }
    case "reset": {
      return {
        email: "",
        password: "",
        loading: false,
        error: state.error,
      };
    }

    default: {
      throw Error("unknown action" + action.type);
    }
  }
}
