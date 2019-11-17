import {produce} from "immer";
import {UPDATE_FILTER_IN_LIST} from "../constants";

const updateFilterList = produce((draftState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_FILTER_IN_LIST:
            // init the filterList's normalized data
            draftState.selectedLhs = draftState.selectedLhs === undefined ? [] : draftState.selectedLhs;
            draftState.selectedOps = draftState.selectedOps === undefined ? [] : draftState.selectedOps;
            draftState.selectedRhs = draftState.selectedRhs === undefined ? [] : draftState.selectedRhs;

            // if index = null, it means this is a new filter (and not update on existing filter)
            if (payload.index === null) {
                draftState.selectedLhs.push(payload.filter.lhs.id);
                draftState.selectedOps.push(payload.filter.operator.id);
                draftState.selectedRhs.push(payload.filter.rhs);

                return draftState;
            }

            // it is an update for an existing filter
            draftState.selectedLhs[payload.index] = payload.filter.lhs.id;
            draftState.selectedOps[payload.index] = payload.filter.operator.id;
            draftState.selectedRhs[payload.index] = payload.filter.rhs;

            return draftState;
        default:
            return draftState;
    }
});

export {
    updateFilterList,
};