import Image from "next/image";
import Link from "next/link";

const StoryItem = (props) => {
  console.log("PRI", props.profilePicture);
  return (
    <div className={`w-20 h-fit rounded-full hover:cursor-pointer `}>
      <div
        // href={`/Story/${props.username}?ind=${props.indexToView}`}
        onClick={() => {
          const newUrl = `?username=${props.username}&ind=${props.indexToView}`;
          window.history.pushState(null, "", newUrl);
          props.viewHandler(true);
        }}
        className="w-20 h-full flex flex-col items-center"
      >
        <div className={`rounded-full p-[2px] transition-transform hover:scale-105 duration-300 ${props.hasNew ? "bg-gradient-to-tr from-maroon to-amber-500" : "border-2 border-beige-dark"}`}>
          <Image
            className="w-16 h-16 rounded-full object-cover border-2 border-cream"
            width={64}
            height={64}
            src={`${process.env.NEXT_PUBLIC_URL}${props.profilePicture}`}
            alt="profile"
          />
        </div>
        <span className="max-w-full text-center text-sm break-words line-clamp-1 mt-1">
          {props.username}
        </span>
      </div>
    </div>
  );
};

export default StoryItem;
