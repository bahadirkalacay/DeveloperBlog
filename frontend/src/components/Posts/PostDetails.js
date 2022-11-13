import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import {
  deletePostAction,
  fetchPostDetailsAction,
} from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";
import { baseUrl } from "../../utils/baseUrl"
const PostDetails = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();

  const post = useSelector((state) => state?.post);
  const { postDetails, loading, appErr, serverErr, isDeleted } = post;

  const comment = useSelector((state) => state.comment);
  const { commentCreated, commentDeleted } = comment;
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch, commentCreated, commentDeleted]);

  const user = useSelector((state) => state.users);
  const { userAuth } = user;

  const isCreatedBy = postDetails?.user?._id === userAuth?._id;
  console.log(isCreatedBy);

  if (isDeleted) return <Redirect to="/posts" />;
  return (
    <>
      {loading ? (
        <div className="h-screen">
          <h2 className="text-center text-3xl text-black m-8">
            Loading...
          </h2>
        </div>
      ) : appErr || serverErr ? (
        <h1 className="h-screen text-red-400 text-xl">
          {serverErr} {appErr}
        </h1>
      ) : (
        <section className="font-Industry py-12 bg-white overflow-hidden">
          <div className="container px-4  mx-auto object-center ">
            <div className=" mx-auto text-center">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-black font-bold font-heading">
                {postDetails?.title}
              </h2>

              {/* Post description */}
              <div className="max-w-6xl mx-auto">
                <p className="mb-6 text-left  text-xl text-black-200 indent-8">
                  {postDetails?.description}

                  {/* Show delete and update  if it was created by the user */}
                  {isCreatedBy ? (
                    <p className="flex justify-end">
                      <Link to={`/update-post/${postDetails?._id}`} class="p-3">
                        <PencilAltIcon class="h-8 mt-3 text-yellow-300" />
                      </Link>
                      <button
                        onClick={() =>
                          dispatch(deletePostAction(postDetails?._id))
                        }
                        className="ml-3"
                      >
                        <TrashIcon className="h-8 mt-3 text-red-600" />
                      </button>
                    </p>
                  ) : null}
                </p>
              </div>
              {/* User */}
              <div className="inline-flex pt-8 mb-8 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-20 h-20 lg:h-20 rounded-full"
                  src={`${baseUrl}/profile/${postDetails?.user?.profilePhoto}`}
                  alt=""
                />
                <div className="text-left">
                  <Link to={`/profile/${postDetails?.user?._id}`}>
                    <h4 className=" text-lg font-bold text-gray-50">
                      <span className="text-lg lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600 ">
                        {postDetails?.user?.firstName}{" "}
                        {postDetails?.user?.lastName}{" "}
                      </span>
                    </h4>
                  </Link>
                  <p className="text-black">
                    {<DateFormatter date={post?.createdAt} />}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          {userAuth ? <AddComment postId={id} /> : null}
          <div className="flex justify-center  items-center">
            {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
            <CommentsList comments={postDetails?.comments} />
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;
