import React, { useState } from 'react';
import Checkbox from '../Checkbox/index';

const Dropdown = ({ title, dataList }) => {

    const [open, setOpen] = useState(false);
    const [headerTitle, setHeaderTitle] = useState(title);
    const [list, setList] = useState(dataList.map((value) => ({value, selected: false})));

    const handleSelectAll = ({ target }) => {

    };

    const handleItemCheckToggle = ({ target }) => {
        let newList = list.map((item) => {
            if (item.value !== target.value) return item;

            return {value: item, selected: target.checked}
        });
        setList(newList);
    };

    return (
        <div>
            <div className="select-all-checkbox">
                <Checkbox
                    id="selectAll"
                    label="Select All"
                    onChange={handleSelectAll}
                    checked={list.length === dataList.length}
                />
            </div>
            <ul>
                {
                    list.map((item) => (
                        <li key={item.value}>
                            <Checkbox
                                id={item.value}
                                title={item.value}
                                label={item.value}
                                checked={item.selected}
                                onChange={handleItemCheckToggle}
                                value={item.value}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Dropdown;