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
import {selectFilterList} from "./selector";
import Filter from "../Filter/index";


const FilterContainer = () => {

    const filterList = selectFilterList();

    const [emptyFilter, setEmptyFilter] = useState(null);

    const invisibleInput = (<input type='text' className='invisible-element'/>);

    const addNewFilter = () => {
        setEmptyFilter({
            lhs: null,
            operator: null,
            rhs: null,
        })
    };

    const removeFilter = index => {
        // todo: dispatch remove filter
    };

    const removeEmptyFilter = () => {
        setEmptyFilter(null);
    };

    const hasEmptyFilter = () => emptyFilter !== null;

    const onFocusChange = index => {
        console.log(`focus changed to ${index}`);
    };

    const getCloseButton = index => {
        if (index === 0 && filterList.length === 1) return ('');
        return (
            <button className='btn-filter-remove' onClick={() => { removeFilter(index) }} key={`action-${index}`}>
                <i className="material-icons">close</i>
            </button>
        );
    };

    const getEmptyFilterJSX = () => {
        if (emptyFilter === null) return ('');
        return (
            <DivFilter>
                <Filter index={null} filterData{emptyFilter} onFocusChange={onFocusChange}/>
                <button className='btn-filter-remove' onClick={() => { removeEmptyFilter() }} key={`remove-empty-filter`}>
                    <i className="material-icons">close</i>
                </button>
            </DivFilter>
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

                                    <Filter index={index} filterData={filter} onFocusChange={onFocusChange}/>
                                    {getCloseButton(index)}
                                </DivFilter>
                            ))
                            (getEmptyFilterJSX())
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