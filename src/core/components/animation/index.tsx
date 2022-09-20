import * as React from 'react';

interface AnimationProps {
    children: any;
    className: string;
    fromClassName: string;
    toClassName: string;
    appear?: boolean;
    isTransition?: boolean | undefined;
    isAnimationOnScroll?: boolean;
}

export const Animation: React.FC<AnimationProps> = ({ children, className, fromClassName, toClassName, appear = false, isTransition }) => {
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (appear) setIsActive(true);
    }, [appear]);
    

    React.useEffect(() => {
        if (isTransition !== undefined) {
            setIsActive(isTransition);
        }
    }, [isTransition]);

    return (
        <div ref={ref} className={`${className} ${isActive ? toClassName : fromClassName}`}>
            {children}
        </div>
    );
};
