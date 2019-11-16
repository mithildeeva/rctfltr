import React from 'react';

const Filter = ({index, filter, onFocusChange}) => {

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

    return (
        <div>
            <SingleSelectDropdown index={index} selected={filter.lhs} availableValues={availableLhs} onChange={lhsChanged} onFocus={onFocusChange} />
            {filter.rhs.id ?
                <SingleSelectDropdown index={index} selected={filter.operator} availableValues={availableOperators[filter.rhs.id]}  onFocus={onFocusChange} />
                : invisibleInput}
            {getFilterJSX(filter, index)}
        </div>
    )
};

export default Filter;