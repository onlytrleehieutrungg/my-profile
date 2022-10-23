import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import TextField from './textField';

interface SearchProps {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
const Search: React.FC<SearchProps> = () => {
    const methods = useForm();
    return (
        <FormProvider  {...methods}>
            <form className="flex items-center" onSubmit={() => { }}>
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <TextField name={'search'} label={'Any song...'} />
                </div>
            </form>
        </FormProvider>
    );
}

export default Search


