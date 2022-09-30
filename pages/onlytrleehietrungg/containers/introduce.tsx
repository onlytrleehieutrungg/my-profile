import React from 'react'
interface IntroduceProps {
    classname: string
}

export const Introduce: React.FC<IntroduceProps> = ({ classname }) => {
    return (
        <div className={`${classname} absolute flex top-20 text-white`}>astronaut vibes</div>
    )
}
