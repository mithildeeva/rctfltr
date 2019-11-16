import { useSelector } from 'react-redux';

export function selectFilterList() {
    return useSelector(state => {
        if (! state.selectedLhs || state.selectedLhs.length === 0) return [];

        return state.selectedLhs.map((lhsId, index) => {
            let operatorId = state.selectedOps[index];
            return {
                lhs: {
                    id: lhsId,
                    label: state.lhs[lhsId].label,
                },
                operator: state.lhs[lhsId].operators.find(operator => operator.id === operatorId),
                rhs: state.selectedRhs[index],
            }
        });
    })
}