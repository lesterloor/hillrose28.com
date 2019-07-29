import { all, takeLatest } from "redux-saga/effects"

import { FETCH_UNITS } from "../actions"
import { fetchUnits } from "./fetchSaga"

export default function* () {
    yield all([takeLatest(FETCH_UNITS, fetchUnits)])
}