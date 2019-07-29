import { SET_UNITS } from "../actions"

const initialState = {
    units: null
}

export default (state = initialState, action) => {
    if (action.type === SET_UNITS) {
        console.log("testedee", action)
        state = {
            ...state,
            units: action.units
        }
    }
    return state
}