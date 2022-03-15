import * as React from "react";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { Autocomplete as AutocompleteMui, TextField } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { makeStyles } from "@mui/styles";

/**
 * This is a Select component.
 */

const Autocomplete = forwardRef<HTMLDivElement, SelectProps>(
  ({
    label = "",
    id,
    children,
    listOptions,
    onChangeValue,
    className,
    ...props
  }) => {
    const handleChange = (
      event: SelectChangeEvent,
      newValue: { label: string; value: string | object }
    ) => {
      onChangeValue && onChangeValue(event, newValue);
    };

    const classes = useStyles(props);
    return (
      <AutocompleteMui
        id={id}
        options={listOptions}
        renderInput={(params) => <TextField {...params} label={label} />}
        // @ts-ignore: Unreachable code error
        onChange={handleChange}
        className={classes.autocomplete}
      />
    );
  }
);

const useStyles = makeStyles({
  autocomplete: {
    marginBottom: 20,
    width: 300,
  },
});

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  id: string;
  children?: ReactNode;
  listOptions: any[];
  // @ts-ignore: Unreachable code error
  onChangeValue?(
    event: React.SyntheticEvent | SelectChangeEvent,
    newValue: { label: string; value: string | object }
  );
}

export default Autocomplete;
