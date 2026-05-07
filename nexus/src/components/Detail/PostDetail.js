import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Heart, MessageCircle, Trash2, MoreHorizontal } from "lucide-react";
import Slideup from "../Layout/Slideup";
import usePost from "../hooks/Post/usePost";
import ConfirmationModal from "../Layout/ConfirmationModal";

import PlaceholderLogo from "../../assets/mountain.JPG";

const Comments = [
  {
    username: "zayn_malik",
    profilePicture: PlaceholderLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
  {
    username: "zayn_malik",
    profilePicture: PlaceholderLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
  {
    username: "zayn_malik",
    profilePicture: PlaceholderLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
  {
    username: "zayn_malik",
    profilePicture: PlaceholderLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
  {
    username: "zayn_malik",
    profilePicture: PlaceholderLogo,
    commentText:
      "A random comment with some dyummy textwhcbeywcblebc lhb cl2jdnj2o jlndjknd2f  i3ndu24fb jbfi24fb 24fbo42ufbiy34fb k2fhu",
  },
];

const PostDetail = (props) => {
  const [isSlideupOpen, setIsSlideupOpen] = useState(false);
  const [heading, setHeading] = useState();
  const [mode, setMode] = useState();
  const [currentLikes, setCurrentLikes] = useState(props.likes);
  const [hasLiked, setHasLiked] = useState(props.hasLiked);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [caption, setCaption] = useState(props.caption);
  const { toggleLike, editPost, deletePost, modalHandler, isModalOpen } =
    usePost();

  const router = useRouter();

  const slideupHandler = (value) => {
    setIsSlideupOpen(value);
  };

  const likeHandler = () => {
    if (!hasLiked) {
      setCurrentLikes((state) => state + 1);
    } else {
      setCurrentLikes((state) => state - 1);
    }
    setHasLiked((state) => !state);
    toggleLike(props.id);
  };

  const editHandler = () => {
    setIsEditingCaption(true);
    setTimeout(() => {
      const input = document.getElementById(`post-input-${props.id}`);
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 0);
  };

  return (
    <div className="flex flex-col w-full max-w-[500px] gap-y-3 glass-card p-6 mb-8 mt-4 transition-transform hover:-translate-y-1 hover:shadow-xl duration-500">
      <div className="flex justify-between items-center">
        <Link href={`/profile/${props.username}`} className="flex items-center">
          <Image
            src={
              props.profilePicture &&
              `${process.env.NEXT_PUBLIC_URL}${props.profilePicture}`
            }
            className="w-10 h-10 rounded-full"
            alt="profile"
            width={10}
            height={10}
          />
          <span className="ml-3">{props.username}</span>
        </Link>
        {props.isOwner && (
          <div className="flex gap-x-4">
            <MoreHorizontal
              className="hover:cursor-pointer text-neutral-400 hover:text-white transition-colors h-6 w-6 mt-[1px]"
              onClick={editHandler}
            />
            <Trash2
              className="hover:cursor-pointer text-neutral-400 hover:text-red-500 transition-colors h-5 w-5 mt-[3px]"
              onClick={() => {
                modalHandler(true);
              }}
            />
            {/* <div
              className="hover:cursor-pointer  text-lg"
              onClick={() => {
                modalHandler(true);
              }}
            >
              delete
            </div> */}
          </div>
        )}
      </div>
      <Image
        src={`${process.env.NEXT_PUBLIC_URL}${props.post}`}
        className="rounded-2xl mb-3 shadow-sm"
        width={500} // Set your desired width
        height={300} // Set your desired height
        objectFit="contain"
        alt="post"
      />
      <div className="flex flex-col mt-2">
        <div className="flex gap-x-4">
          <Heart
            className={`cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 h-7 w-7 ${hasLiked ? "fill-red-500 text-red-500" : "text-neutral-400 hover:text-white"}`}
            onClick={likeHandler}
          />
          <MessageCircle
            className="cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 h-7 w-7 text-neutral-400 hover:text-white"
            onClick={() => {
              setHeading("Comments");
              setMode("comment");
              slideupHandler(true);
            }}
          />
        </div>
        <span
          className="text-xs mt-1 font-normal hover:cursor-pointer"
          onClick={() => {
            setHeading("Likes");
            setMode("likes");
            slideupHandler(true);
          }}
        >
          {currentLikes} likes
        </span>
      </div>
      <span className="text-sm flex justify-between gap-x-2">
        <div className="w-full flex gap-x-2">
          <span
            className="font-semibold hover:cursor-pointer items-start"
            onClick={() => {
              router.push(`/profile/${props.username}`);
            }}
          >
            {props.username}
          </span>
          {isEditingCaption ? (
            <textarea
              id={`post-input-${props.id}`}
              defaultValue={caption}
              disabled={!isEditingCaption}
              // onBlur={() => {
              //   setIsEditingCaption(false);
              // }}
              className="ml-2 bg-transparent focus:outline-none w-full"
              onChange={(event) => {
                setCaption(event.target.value);
              }}
            />
          ) : (
            <p id={`post${props.id}`}>{caption}</p>
          )}
        </div>
        {isEditingCaption && (
          <button
            className="bg-black rounded-md w-fit p-2"
            onClick={() => {
              setIsEditingCaption(false);
              editPost(props.id, caption);
            }}
          >
            Save
          </button>
        )}
      </span>
      <span className="text-xs text-espresso-light font-medium mt-1">
        {props.time} ago
      </span>
      {isSlideupOpen && (
        <Slideup
          id={props.id}
          slideupHandler={slideupHandler}
          commentsList={Comments}
          heading={heading}
          mode={mode}
        />
      )}
      {isModalOpen && (
        <ConfirmationModal
          onCancel={() => {
            modalHandler(false);
          }}
          onContinue={() => {
            deletePost(props.id);
            modalHandler(false);
          }}
        />
      )}
    </div>
  );
};

export default PostDetail;
