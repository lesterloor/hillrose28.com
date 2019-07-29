import { call, put } from "redux-saga/effects"
import { SET_UNITS } from "../actions"
import * as firebase from 'firebase';
function connect() {
    return new Promise(resolve => {
        const database = firebase.database();
        const connectionRef = database.ref('floors');
        connectionRef.on('value', resolve);
    });
}
export function* fetchUnits(action) {
    try {
        const units = yield call(connect);
        yield put({
            type: SET_UNITS,
            units: units.val()
        })
    }
    catch (err) {
        console.log("err", err)
    }
}