import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Control, Controller, Path, PathValue, UnpackNestedValue } from "react-hook-form";

interface AppSelectOption {
  label: string;
  value: string;
}

interface AppSelectProps<FormFieldTypes, AppSelectOptions extends AppSelectOption[]> {
  name: Path<FormFieldTypes>;
  label: string;
  control: Control<FormFieldTypes, object> | undefined;
  options: AppSelectOptions;
  defaultValue: AppSelectOptions[number]["value"] | "";
  disabled: boolean | undefined;
}
export function UnmemoizedAppSelect<FormFieldTypes, AppSelectOptions extends AppSelectOption[]>({
  name,
  label,
  control,
  options,
  defaultValue,
  disabled,
}: AppSelectProps<FormFieldTypes, AppSelectOptions>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as UnpackNestedValue<PathValue<FormFieldTypes, Path<FormFieldTypes>>>}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <FormControl disabled={disabled} error={Boolean(error)} variant="outlined" style={{ width: "100%" }}>
          <InputLabel>{label}</InputLabel>
          <Select style={{ width: "100%" }} onChange={onChange} onBlur={onBlur} value={value} label={label} autoWidth>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export const AppSelect = React.memo(UnmemoizedAppSelect) as typeof UnmemoizedAppSelect & { displayName: string };
