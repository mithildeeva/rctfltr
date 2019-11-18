import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {selectAvailableLhs, selectAvailableOperator, selectAvailableRhs, selectSelectedRhs} from "./selector";
import {UPDATE_FILTER_IN_LIST} from "../../constants";
import SingleSelectDropdown from "../SingleSelectDropdown/index";

const Filter = ({index = null, filterProp = {
    lhs: null,
    operator: null,
    rhs: null,
}, onFocusChange}) => {

    const [filterState, setFilterState] = useState(filterProp);
    const dispatch = useDispatch();


    const shouldDispatchFilterListUpdate = filter => {
        return filter.lhs !== null
            && filter.operator !== null
            && filter.rhs !== null;
    };

    const lhsChanged = newLhs => {
        let newFilter = Object.assign({}, filterState, {lhs: newLhs});
        processUpdate(newFilter);
    };

    const operatorChanged = newOperator => {
        let newFilter = Object.assign({}, filterState, {operator: newOperator});
        processUpdate(newFilter);
    };

    const rhsChanged = newRhs => {
        let newFilter = Object.assign({}, filterState, {rhs: newRhs});
        processUpdate(newFilter);
    };

    const processUpdate = newFilter => {
        setFilterState(newFilter);

        // dispatch action to update filter list
        if (shouldDispatchFilterListUpdate(newFilter)) {
            dispatch({
                type: UPDATE_FILTER_IN_LIST,
                payload: {
                    filter: newFilter,
                    index
                },
            });
        }
    };

    const getLhsDropdown = () => {
        return (
            <SingleSelectDropdown
                placeholder='dimension/metric'
                selected={filterState.lhs}
                availableValues={selectAvailableLhs()}
                onChange={lhsChanged}
            />
        );
    };

    const getOperatorDropdown = () => {
        if (filterState.lhs === null) return ('');

        return (
            <SingleSelectDropdown
                placeholder='operator'
                selected={filterState.operator}
                availableValues={selectAvailableOperator(filterState.lhs.id)}
                onChange={operatorChanged}
            />
        );
    };

    const getRhsJSX = () => {
        if (filterState.operator === null) return ('');

        switch (filterState.lhs.id) {
            case 'account':
            case 'country':
                return (
                    <MultiSelectDropDown
                        selected={selectSelectedRhs(index)}
                        available={selectAvailableRhs(filterState.lhs.id)}
                        onChange={rhsChanged}
                    />
                );
            case 'campaign_name':
                return (
                    <CampaignFilter
                        selected={selectSelectedRhs(index)}
                        onChange={rhsChanged}
                    />
                );
            case 'revenue':
                return (
                    <CampaignFilter
                        selected={selectSelectedRhs(index)}
                        onChange={rhsChanged}
                    />
                );
            default:
                return ('');
        }
    };

    return (
        <div>
            {getLhsDropdown()}
            {getOperatorDropdown()}
            {getRhsJSX()}
        </div>
    )
};

export default Filter;