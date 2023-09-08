import * as React from 'react';
import NumberFormat from 'react-number-format';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string; }; }) => void;
    name: string;
    value: null | number;
    defaultValue: undefined | number | string;
}

export const NumberFormatCustom = React.forwardRef<NumberFormat<Number>, CustomProps>(
    (props, ref) => {
        const { onChange, ...other } = props;

        return (
            <NumberFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator="."
                decimalSeparator=","
                isNumericString
                prefix=""
                value={props.value}
                defaultValue={props.defaultValue}
                maxLength={9}
            />
        );
    },
);
