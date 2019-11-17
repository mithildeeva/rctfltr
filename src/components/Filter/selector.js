import { useSelector } from 'react-redux';
import {FREE_FORM_VALUE} from "../../constants";

export function selectAvailableLhs() {
    return useSelector(state => {
        if (! state.selectedLhs || state.selectedLhs.length === 0) {
            return Object.keys(state.lhs).map(lhsId => ({
                id: lhsId,
                label: state.lhs[lhsId].label,
            }));
        }

        // creating a map of SELECTED lhsId to OperatorId-array
        let selectedLhsIdToOpId = {};
        for (let i = 0; i < state.selectedLhs.length; i++) {

            const selectedLhs = state.selectedLhs[i];
            const selectedOp = state.selectedOps[i];

            if (selectedLhsIdToOpId[selectedLhs] === undefined) {
                selectedLhsIdToOpId[selectedLhs] = [];
            }

            selectedLhsIdToOpId[selectedLhs].push(selectedOp);
        }

        // looping over lhs and checking if any lhs (with untouched operators) still exist
        let availableLhs = [];
        for (const lhsId in state.lhs) {
            if (selectedLhsIdToOpId[lhsId] === undefined
                || selectedLhsIdToOpId[lhsId].length < state.lhs[lhsId].operators.length) {
                availableLhs.push({
                    id: lhsId,
                    label: state.lhs[lhsId].label,
                });
            }
        }

        return availableLhs;

    })
}

export function selectAvailableOperator(lhsId) {
    return useSelector(state => {
        if (! state.selectedOps || state.selectedOps.length === 0) {
            return state.lhs[lhsId].operators
        }

        // get all operators currently selected for the given lhs
        const selectedOpsId = state.selectedLhs.reduce((selectedOpsIdForLhs, currLhsId, index) => {
            if (currLhsId !== lhsId) return selectedOpsIdForLhs;

            selectedOpsIdForLhs.push(state.selectedOps[index]);
        }, []);

        // filter out selected operators and return the remaining
        return state.lhs[lhsId].operators.filter(operator => !selectedOpsId.includes(operator.id));
    });
}

export function selectSelectedRhs(index) {
    return useSelector(state => {
        if (! state.selectedRhs || state.selectedRhs.length === 0) {
            return null;
        }
        return state.selectedRhs[index];
    })
}

export function selectAvailableRhs(lhsId) {
    return useSelector(state => {
        const lhsIdIndex = state.lhsIds.indexOf(lhsId);

        // null availableValues means any value can be entered (no restricted set)
        if (state.lhsValues[lhsIdIndex] === FREE_FORM_VALUE) return null;

        // if no rhs have yet been selected, return all rhs for corresponding lhs
        if (state.selectedLhs === undefined || !state.selectedLhs.includes(lhsId)) {
            return state.lhsValues[lhsIdIndex];
        }

        // extract the rhs that haven't been selected yet
        const selectedRhsIdForLhs = state.selectedLhs.reduce((selectedRhs, currLhsId, index) => {
            if (currLhsId !== lhsId) return selectedRhs;
            selectedRhs.push(...state.selectedRhs[index].map(rhs => rhs.id));
            return selectedRhs;
        }, []);

        let availableRhs = [];
        for (let i = 0; i < state.lhsValues[lhsIdIndex]; i++) {
            if (! selectedRhsIdForLhs.includes(state.lhsValues[lhsIdIndex][i].id)) {
                availableRhs.push(state.lhsValues[lhsIdIndex][i]);
            }
        }

        return availableRhs;
    });
}