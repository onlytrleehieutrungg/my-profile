import * as React from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import FormErrorMessage from './formErrorMessage';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    isHiddenLabel?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ name, label, type = 'text', isHiddenLabel = false, ...rest }) => {
    const { register } = useFormContext();

    return (
        <div>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-10 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    {...register(name)}
                    {...rest}
                    type={type}
                    className="block w-full pl-10 pr-20 py-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
            </div>
            {/* <FormErrorMessage className="text-sm text-red-500" name={name} label={label} /> */}
        </div>
    );
};

export default TextField