"use client";

import useCountries from "@/app/hooks/useCountries";
import React, { FC, useState } from "react";
import Select from "react-select";

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({
    value,
    onChange
}) => {

    const { getAll } = useCountries();
    const [focused, setFocused] = useState(false);

    return (
        <div>
        <Select
            placeholder="Anywhere"
            isClearable
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            defaultMenuIsOpen={true}
            options={getAll()}
            value={value}
            onChange={(value) => onChange(value as CountrySelectValue)}
            formatOptionLabel={(option: any) => (
                <div className="flex flex-row items-center gap-3">
                    <div>{option.flag}</div>
                    <div>
                        {option.label}, 
                        <span className="text-neutral-500 ml-1">
                            {option.region}
                        </span>
                    </div>
                </div>
            )}
            classNames={{
                control: () => `p-3 !border-2 ${focused ? "!border-black !shadow-selected" : ""}`,
                input: () => "text-lg",
                option: () => "text-lg active:!bg-tahiti-300",
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                color: {
                    ...theme.colors,
                    primary: "black",
                    primary25: "#ffe4e6",
                }
            })}
        />
        </div>
    )
}

export default CountrySelect;