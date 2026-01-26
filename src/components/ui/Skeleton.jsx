export const Skeleton = ({ isFor }) => {
    return (
        isFor === 'infoCard' ? (
            <div className="w-full flex flex-col items-start text-white gap-5 px-8 py-15 bg-[#24272d] border-2 rounded-[20px] border-[#353f4f] animate-pulse">
                <div className="w-12 h-12 bg-gray-700 animate-pulse rounded-md"></div>
                <div className="w-3/4 h-8 bg-gray-700 animate-pulse rounded-md"></div>
                <div className="w-full h-20 bg-gray-700 animate-pulse rounded-md"></div>
            </div>
        ) : null
    )
}