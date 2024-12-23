import {ChangeEvent, useCallback} from "react";
import {TextField} from "@mui/material";

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

export function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface NumericalInputProps {
    value: string,
    onChange: (value: string) => void,
}

export const NumericalInput = ({value, onChange}: NumericalInputProps) => {
    const onChangeNumericalInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === "" || inputRegex.test(escapeRegExp(value))) {
            onChange(value)
        }
    }, [onChange]);

    return (
        <TextField value={value} onChange={onChangeNumericalInput}/>
    )
}