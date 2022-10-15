import React from 'react'
interface IntroduceProps {
    classname: string
}

export const Introduce: React.FC<IntroduceProps> = ({ classname }) => {
    return (
        <div className='absolute flex top-0 h-full w-full justify-center items-center'>
            <div className={`${classname}`}>astronaut vibes</div>
        </div>
    )
}
