import * as React from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import FormErrorMessage from './formErrorMessage';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    isHiddenLabel?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ name, label, type = 'text', isHiddenLabel = false, ...rest }) => {
    const { register } = useFormContext();

    return (
        <div className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input
                    {...register(name)}
                    {...rest}
                    style={{paddingLeft: "32px"}}
                    type={type}
                    className="inline-flex items-center py-2.5 ml-2 text-sm font-medium text-white bg-transparent rounded-lg border border-gray-400 focus:outline-none focus:ring-gray-300"
                />
            </div>
            <FormErrorMessage className="text-sm text-red-500" name={name} label={label} />
        </div>
    );
};

export default TextField