// import { TNUtils } from 'swd-mono-react-ui';
// import * as React from 'react';
// import { useFormContext } from 'react-hook-form';
// import { useStoreApi } from '../../../core/store';

// interface FormErrorMessageProps {
//     name: string;
//     className: string;
//     label?: string;
// }

// const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ name, label, className }) => {
//     const { errorDetails } = useStoreApi();
//     const [errorMessage, setErrorMessage] = React.useState('');
//     React.useEffect(() => {
//         setErrorMessage('');

//         const key = Object.keys(errorDetails).find((item) => TNUtils.stringHelper.lowercaseFirstLetter(item) === name);
//         if (key) {
//             setErrorMessage(errorDetails[key]);
//         }
//     }, [errorDetails, name]);
//     return (
//         <>
//             {Boolean(errorMessage) && (
//                 <div className={className}>
//                     {label} {errorMessage}
//                 </div>
//             )}
//         </>
//     );
// };

// export default FormErrorMessage

const FormErrorMessage = () => {
    return <div></div>
}
export default FormErrorMessage
