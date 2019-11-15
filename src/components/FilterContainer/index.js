import React, { useState } from 'react';
import { StyledFilterContainer } from './style';
import { LHS } from '../../constants';

const FilterContainer = () => {

    [filterList, setFilterList] = useState([{lhs: null, operator: null, rhs: null}]);
    [availableLhs, setAvailableLhs] = useState(LHS);

    let opsAvailable = LHS.reduce((map, lhs) => {
        map[lhs.id] = lhs.
    });

    return (



        <StyledFilterContainer>
            <div className="filter-body">
                <div>
                    <h4>where</h4>
                </div>

                <div className="filters">
                    {
                      filterList.map((filter) => (
                          <div>
                              <Dropdown selected={filter.lhs} list={LHS.filter((item) => item.id !== filter.lhs)}/>
                              <Dropdown selected={filter.operator} list={}/>
                          </div>
                      ))
                    }
                </div>

                <div>
                    <span>+ADD</span>
                </div>
            </div>

            <div className="filter-footer">
                <span>Apply</span>
            </div>
        </StyledFilterContainer>
    );
};

export default FilterContainer;