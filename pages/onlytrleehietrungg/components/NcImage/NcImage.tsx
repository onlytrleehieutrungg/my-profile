import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import checkInViewIntersectionObserver from "./isInViewPortIntersectionObserver";
// import checkInViewIntersectionObserver from "utils/isInViewPortIntersectionObserver";
import PlaceIcon from "./PlaceIcon";

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  src = "https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/297035096_1868108510189807_8903148336479921394_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Fgr3xx2apjsAX8SSJvP&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT964CQ8_HNpou6DDjDU79V4yqdkE89Ba1m4jBt5Zs3vTA&oe=6336F841",
  className = "object-cover w-full h-full rounded-b-lg",
  ...args
}) => {
  let isMounted = false;
  const _containerRef = useRef(null);
  let _imageEl: HTMLImageElement | null = null;
  // const darkmodeState = useAppSelector(selectDarkmodeState);

  const [__src, set__src] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const _initActions = async () => {
    // set__src(placeholderImage);
    _checkInViewPort();
  };

  const _checkInViewPort = () => {
    if (!_containerRef.current) return;
    checkInViewIntersectionObserver({
      target: _containerRef.current as any,
      distanceFromEnd: 0,
      callback: _imageOnViewPort,
    });
  };

  const _imageOnViewPort = () => {
    if (!src) {
      _handleImageLoaded();
      return true;
    }
    _imageEl = new Image();
    if (_imageEl) {
      _imageEl.src = src;
      _imageEl.addEventListener("load", _handleImageLoaded);
    }
    return true;
  };

  const _handleImageLoaded = () => {
    if (!isMounted) return;
    setImageLoaded(true);
    set__src(src);
  };

  useEffect(() => {
    isMounted = true;
    _initActions();
    return () => {
      isMounted = false;
    };
  }, [src]);

  const renderLoadingPlaceholder = () => {
    return (
      <div
        className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
      >
        <div className="h-2/4 max-w-[50%]">
          <PlaceIcon />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-NcImage rounded-b-lg ${containerClassName}`}
      data-nc-id="NcImage"
      ref={_containerRef}
    >
      {src && imageLoaded ? (
        <img src={__src} className={className} alt={alt} {...args} />
      ) : (
        renderLoadingPlaceholder()
      )}
    </div>
  );
};

export default NcImage;
