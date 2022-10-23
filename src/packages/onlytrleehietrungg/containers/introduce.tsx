import React from 'react'
interface IntroduceProps {
    classname: string
}

const Introduce: React.FC<IntroduceProps> = ({ classname }) => {
    return (
        <div className='absolute top-0 h-full w-full justify-center items-center'>
            <div className={``}>astronaut vibes</div>
        </div>
    )
}

export default Introduce