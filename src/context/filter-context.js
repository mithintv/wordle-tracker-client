import React from "react";

const FilterContext = React.createContext({
  filter: 'weekly'
});

export const FilterContextProvider = props => {

  return (
    <FilterContext.Provider
      value={
        { filter: '7' }
      }>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;