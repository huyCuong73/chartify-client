import { INIT_STATE } from "../initialState/initialState";

const socketReducer = (state = INIT_STATE.socket, action) => {
    switch (action.type) {
      case "SOCKET_REQUEST":
        return action.payload;

      default:
        return state;
    }
  };
  
  export default socketReducer;