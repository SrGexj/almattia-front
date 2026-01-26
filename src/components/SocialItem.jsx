export const SocialItem = ({link, svg}) => {
    return (
         <a href={link} target="_blank" rel="noreferrer" className="hover:text-[] transition-colors text-white font-light max-[1367px]:text-[14px] flex items-center gap-2 max-[768px]:flex-col max-[768px]:!text-[16px]">
            <span>
                {svg}
            </span>
        </a>
    )
}