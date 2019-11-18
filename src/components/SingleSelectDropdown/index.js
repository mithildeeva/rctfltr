import React, {useState} from 'react';

const SingleSelectDropdown = (props) => {

    const [state, setState] = useState({
        selected: props.selected,
        availableValues: props.availableValues,
    });

    const onSelect = (e) => {
        const selectedValueArr = e.target.value.split('~~');
        // if value changed to itself
        if (state.selected.id === selectedValueArr[0]) return;

        const selected = {id: selectedValueArr[0], label: selectedValueArr[1]};

        // removing selected item from available values
        let availableValues = state.availableValues.filter(value => value.id !== selected.id);

        // adding previously selected value to availableValues
        if (state.selected !== null) {
            availableValues.push(state.selected);
        }

        // updating local state
        setState(Object.assign({}, state, {selected, availableValues}));

        // calling onChange of parent with newly selected value obj
        props.onChange(selected);
    };

    const getPlaceholderOption = () => {
        return (
            <option
                value="select_placeholder"
                disabled
                selected
                hidden
            >
                {props.placeholder ? props.placeholder : 'select an option'}
            </option>
        );
    };

    const getSelectedOption = () => {
        return (
            <option
                value={`${state.selected.id}~~${state.selected.label}`}
                selected
            >
                {state.selected.label}
            </option>
        );
    };

    return (
        <div className="single-select-dropdown">
            <select onChange={onSelect}>
                {state.selected === null ? getPlaceholderOption() : getSelectedOption()}
                {state.availableValues.map((valueObj, index) => (
                    <option
                        value={`${valueObj.id}~~${valueObj.label}`}
                    >
                        {valueObj.label}
                    </option>
                ))}
            </select>
            <div className="select_arrow"></div>
        </div>
    );
};

export default SingleSelectDropdown;