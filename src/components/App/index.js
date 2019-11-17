import React from 'react';
import './index.css';
import { StyledWrapper } from '../../styledcomponents/StyledWrapper';
import FilterContainer from "../FilterContainer/index";

const App = () => (



  <StyledWrapper>
    {/*<FilterContainer />*/}
    <input onBlur={console.log}/>
  </StyledWrapper>
);

export default App;
