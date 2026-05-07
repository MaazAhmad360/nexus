import Link from "next/link";

const SidebarLink = (props) => {
  const IconComponent = props.icon;
  return (
    <li>
      <Link
        href={props.link}
        className={`p-3 relative overflow-hidden group w-full flex items-center hover:bg-neutral-800 transition-all duration-300 rounded-2xl font-medium`}
      >
        <IconComponent className="size-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300 stroke-[1.5]" />
        <span className="text-base ml-4 self-center h-fit hidden lg:inline-block">
          {props.text}
        </span>
      </Link>
    </li>
  );
};

export default SidebarLink;
