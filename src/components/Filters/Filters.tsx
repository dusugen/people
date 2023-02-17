import React, { useCallback } from "react";
import { TFilters } from "../UsersList/UsersList";
import {
  Checkbox,
  CheckboxInner,
  CheckboxWrapper,
  Input,
  Label,
  Select,
  StyledButton,
  StyledLink,
  Title,
  Wrapper,
} from "./Filters.styled";

type TFiltersProps = {
  filters: TFilters;
  onFiltering: (params: Partial<TFilters>) => void;
};

const Filters: React.FC<TFiltersProps> = React.memo(
  ({ onFiltering, filters }) => {
    const handleReset = useCallback(() => {
      onFiltering({
        name: "",
        email: "",
        gender: "",
        activeStatus: false,
        inActiveStatus: false,
      });
    }, [filters]);

    return (
      <Wrapper>
        <Title>Filters</Title>
        <Input
          placeholder={`Name`}
          value={filters.name}
          onChange={(e) => onFiltering({ name: e.target.value })}
        />
        <Input
          placeholder={`Email`}
          value={filters.email}
          onChange={(e) => onFiltering({ email: e.target.value })}
        />
        <Select
          aria-label={`Default select example`}
          onChange={(e) => onFiltering({ gender: e.target.value })}
        >
          <option value={``}>Choose your gender</option>
          <option value={`male`}>Male</option>
          <option value={`female`}>Female</option>
        </Select>
        <CheckboxWrapper>
          <CheckboxInner>
            <Checkbox
              id="activeCheckbox"
              value="active"
              checked={filters.activeStatus}
              onChange={() => {
                onFiltering({ activeStatus: !filters.activeStatus });
              }}
            />
            <Label htmlFor="activeCheckbox">Active</Label>
          </CheckboxInner>
          <CheckboxInner>
            <Checkbox
              id="inActiveCheckbox"
              checked={filters.inActiveStatus}
              onChange={() => {
                onFiltering({ inActiveStatus: !filters.inActiveStatus });
              }}
              value="inactive"
            />
            <Label>Inactive</Label>
          </CheckboxInner>
        </CheckboxWrapper>
        <StyledButton onClick={handleReset}>
          <StyledLink to={"/"}>Reset</StyledLink>
        </StyledButton>
      </Wrapper>
    );
  }
);

export default Filters;
