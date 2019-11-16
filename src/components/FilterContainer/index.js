import React, { useState } from 'react';
import {
    StyledFilterContainer,
    DivFilterBody,
    DivFilterSection,
    DivWhere,
    DivFilters,
    DivFilter
} from './style';
import RevenueFilter from '../RevenueFilter/index'


const FilterContainer = (LHS) => {

    const [filterState, setFilterState] = useState({
        filterList: [],
        currFilterIndex: 0,
    });
    const [filterList, setFilterList] = useState([]);
    const [currFilterIndex, setCurrFilterIndex] = useState(0);
    const [availableLhs, setAvailableLhs] = useState(LHS);
    const [availableOperators, setAvailableOperators] = useState(LHS.map((item) => ({ [item.id] : item.operators })));
    const [availableValues, setAvailableValues] = useState(LHS.map((item) => ({ [item.id] : item.values })));

    const invisibleInput = (<input type='text' className='invisible-element'/>);

    const addNewFilter = () => {
        let newFilterList = filterList;
        newFilterList.push({
            lhs: null,
            operator: null,
            rhs: null,
        });
        setFilterList(newFilterList);
    };

    const removeFilter = index => {
        const newFilterList = filterList.filter((filter, currIndex) => currIndex !== index);
        setFilterList(newFilterList);
    };

    const hasEmptyFilter = () =>
        undefined !== filterList.find((filter) =>
            filter.lhs === null || filter.value === null || filter.rhs === null
        );

    const onFocusChange = index => {
        if (currFilterIndex !== index) setCurrFilterIndex(index);
    };


    const getFilterJSX = (filter, index) => {
        switch (filter.lhs.id ? filter.lhs.id : 'default') {
            case 'account':
                return (
                    <MultiSelectDropdown index={index} onFocus={onFocusChange} selected={filter.rhs} available={availableValues[filter.rhs.id]} />
                );
            case 'country':
                return (
                    <MultiSelectDropdown index={index} onFocus={onFocusChange} selected={filter.rhs} available={availableValues[filter.rhs.id]} />
                );
            case 'campaign_name':
                return (
                    <input type='text' value={availableValues[filter.rhs.label]} />
                );
            case 'revenue':
                return (
                    <RevenueFilter index={index} onFocus={onFocusChange} value={availableValues[filter.rhs.label]} />
                );
            default:
                return invisibleInput;
        }
    };

    const getCloseButton = index => {
        if (index === 0 && filterList.length === 1) return ('');
        return (
            <button className='btn-filter-remove' onClick={() => { removeFilter(index) }} key={`action-${index}`}>
                <i className="material-icons">close</i>
            </button>
        );
    };


    return (
        <StyledFilterContainer>
            <DivFilterBody className="filter-body">
                <DivFilterSection className="filter-section">
                    <DivWhere>
                        <h4>where</h4>
                    </DivWhere>

                    <DivFilters className="filters">
                        {
                            filterList.map((filter, index) => (
                                <DivFilter>
                                    <SingleSelectDropdown index={index} selected={filter.lhs} availableValues={availableLhs} onChange={lhsChanged} onFocus={onFocusChange} />
                                    {filter.rhs.id ?
                                        <SingleSelectDropdown index={index} selected={filter.operator} availableValues={availableOperators[filter.rhs.id]}  onFocus={onFocusChange} />
                                        : invisibleInput}
                                    {getFilterJSX(filter, index)}
                                    {getCloseButton(index)}
                                </DivFilter>
                            ))
                        }
                    </DivFilters>
                </DivFilterSection>

                <div>
                    <button onClick={addNewFilter} disabled={hasEmptyFilter}>
                        <i className="material-icons btn-range-add-icon">add</i> Add
                    </button>
                </div>
            </DivFilterBody>

            <div className="filter-footer">
                <span>Apply</span>
            </div>
        </StyledFilterContainer>
    );
};

export default FilterContainer;