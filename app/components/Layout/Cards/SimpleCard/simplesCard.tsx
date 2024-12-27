import useWeatherReducer from "../../Structure/generalReducer";
import { SkeletonLoading, SkeletonLoadingTextBlocks } from "../../Loadings/skeletonLoading";

export const SimpleCard = ({
  icon,
  value,
  description,
}: {
  icon: string;
  value: string;
  description: string;
}) => {
  const {loadingState} = useWeatherReducer();
  return (
    <div className="grid grid-cols-[50px,1fr] items-center gap-4">
      <i className={`wi wi-${icon} text-[40px] md:text-[30px] lg:[text-40px] text-center opacity-70`}></i>
      <div className="flex flex-col items-start">
        <div className="opacity-70 text-sm">{description}</div>
        {loadingState === 1 ? <div className="text-[30px] md:text-[18px] lg:text-[18px]">{value}</div>
        : <div className="opacity-50">
          <SkeletonLoadingTextBlocks number={1} height="!h-[12px] !p-0 mt-2" />
        </div>  
      }
      </div>
    </div>
  );
};