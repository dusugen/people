import React, { useCallback } from "react";
import { TFilters } from "../UsersList/UsersList";
import {
  Checkbox,
  CheckboxContainer,
  Input,
  Label,
  Root,
  Select,
  StyledButton,
  StyledLink,
  Title,
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
    }, [onFiltering]);

    return (
      <Root>
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
        <CheckboxContainer>
          <Checkbox
            id="activeCheckbox"
            value="active"
            checked={filters.activeStatus}
            onChange={() => {
              onFiltering({ activeStatus: !filters.activeStatus });
            }}
          />
          <Label htmlFor="activeCheckbox">Active</Label>
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox
            id="inActiveCheckbox"
            checked={filters.inActiveStatus}
            onChange={() => {
              onFiltering({ inActiveStatus: !filters.inActiveStatus });
            }}
            value="inactive"
          />
          <Label htmlFor="inActiveCheckbox">Inactive</Label>
        </CheckboxContainer>
        <StyledButton onClick={handleReset}>
          <StyledLink to={"/"}>Reset</StyledLink>
        </StyledButton>
      </Root>
    );
  }
);

export default Filters;
