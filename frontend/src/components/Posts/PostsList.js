import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import {
  fetchPostsAction,
  fetchPostAction,
} from "../../redux/slices/posts/postSlices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DateFormatter from "./../../utils/DateFormatter";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";
import {
  toggleAddLikesToPost,
  toggleAddDisLikesToPost,
} from "./../../redux/slices/posts/postSlices";
import { baseUrl } from "../../utils/baseUrl";

export default function PostsList() {
  const post = useSelector((state) => state?.post);
  const { postLists, loading, appErr, serverErr, likes, dislikes } = post;
  console.log(postLists);
  const category = useSelector((state) => state?.category);
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAction(""));
  }, [dispatch, likes, dislikes]);
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className="font-Industry py-2 bg-white min-h-screen radius-for-skewed ">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-wrap items-center">
              <div className="w-full lg:w-5/6">
                <span className="text-black font-bold">
                  Latest Posts from our awesome authors
                </span>
                <h2 className="text-4xl text-black lg:text-5xl font-bold font-heading">
                  Latest Post
                </h2>
              </div>
              <div>
              <button
                onClick={() => dispatch(fetchPostsAction(""))}
                className="flex py-2 px-6 rounded-l-xl rounded-t-xl bg-black text-gray-50 font-bold leading-loose transition duration-200 mt-2"
              >
                View All Posts
              </button>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div className="py-4 px-6 bg-black shadow rounded">
                  <h4 className="mb-4 text-white font-bold uppercase">
                    Categories
                  </h4>
                  <ul key={post}>
                    {catLoading ? (
                       <h2 className="text-center text-3xl text-white m-8">Loading...</h2>
                    ) : catAppErr || catServerErr ? (
                      <h1 className="text-white">
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1 className="text-white text-lg text-center">
                        No Category Found
                      </h1>
                    ) : (
                      categoryList?.map((category) => (
                        <li>
                          <p
                            onClick={() =>
                              dispatch(fetchPostsAction(category?.title))
                            }
                            className="block cursor-pointer py-2  px-3 mb-4 rounded text-white font-bold bg-gray-500"
                          >
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div className="w-full  lg:w-3/4 px-3 overflow-y:auto">
                {/* Post goes here */}

                {appErr || serverErr ? (
                  <h1 className="text-white text-center text-lg ">
                    {serverErr} {appErr}
                  </h1>
                ) : postLists?.length <= 0 ? (
                  <h1 className="text-white text-lg text-center">
                    No Post Found
                  </h1>
                ) : (
                  postLists?.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-wrap bg-black -mx-3  lg:mb-6"
                    >
                      <div className="mb-10 w-full lg:w-1/4 ">
                        <Link>
                          {/* Post image */}
                          <img
                            className="w-full h-full object-cover rounded"
                            // src={post?.image}
                            src={`${baseUrl}/posts/${post?.image}`}
                            
                            alt=""
                          />
                        </Link>
                        {/* Likes, views dislikes */}
                        <div className="flex flex-row bg-black  justify-center w-full  items-center ">
                          {/* Likes */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            {/* Togle like  */}
                            <div className="">
                              <ThumbUpIcon
                                onClick={() =>
                                  dispatch(toggleAddLikesToPost(post?._id))
                                }
                                className="h-7 w-7 text-indigo-600 cursor-pointer"
                              />
                            </div>
                            <div className="pl-2 text-white">
                              {post?.likes?.length}
                            </div>
                          </div>
                          {/* Dislike */}
                          <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <ThumbDownIcon
                                onClick={() =>
                                  dispatch(toggleAddDisLikesToPost(post?._id))
                                }
                                className="h-7 w-7 cursor-pointer text-gray-600"
                              />
                            </div>
                            <div className="pl-2 text-white">
                              {post?.disLikes?.length}
                            </div>
                          </div>
                          {/* Views */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <EyeIcon className="h-7 w-7  text-gray-400" />
                            </div>
                            <div className="pl-2 text-white">
                              {post?.numViews}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-3/4 px-3 ">
                        <Link className="hover:underline">
                          <h3 className="mb-1 mt-2 text-2xl text-white font-bold font-heading">
                            {/* {capitalizeWord(post?.title)} */}
                            {post?.title}
                          </h3>
                        </Link>
                        <p className="text-gray-300 h-60 text-clip overflow-hidden ...">
                          {post?.description}
                        </p>

                        <Link
                          to={`/posts/${post?._id}`}
                          className="text-indigo-500  hover:underline"
                        >
                          Post Detail...
                        </Link>
                        {/* User Avatar */}
                        <div className="mt-2 mb-2 flex items-center">
                          <div className="flex-shrink-0">
                            <Link>
                              <img
                                className="h-10 w-10 rounded-full"
                               
                                src={`${baseUrl}/profile/${post?.user?.profilePhoto}`}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              <Link
                                to={`/profile/${post?.user?._id}`}
                                className="text-yellow-400 hover:underline "
                              >
                                {post?.user?.firstName} {post?.user?.lastName}
                              </Link>
                            </p>
                            <div className="flex space-x-1 text-sm text-white">
                              <time>
                                <DateFormatter date={post?.createdAt} />
                              </time>
                              <span aria-hidden="true">&middot;</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
