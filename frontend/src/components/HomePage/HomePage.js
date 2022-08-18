import React from "react";
import poster from "../../img/poster.jpg";

const HomePage = () => {
  return (
    <>
      <section className="h-screen-full bg-white ">
        <div className="relative container px-4 mt-4  mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-7xl text-black font-bold font-heading">
                Welcome to the meeting{" "}
                <span className="text-yellow-500">
                  point of software developers
                </span>
              </h2>

              <a
                className="inline-block mt-4 px-8 py-4 text-lg text-white font-bold bg-yellow-500 hover:bg-yellow-600 rounded-full transition duration-200"
                href="/create-post"
              >
                Create a Post
              </a>
            </div>
            <div className="w-full lg:w-1/2 px-4 mt-8">
              <img className="w-full rounded-lg" src={poster} alt={poster} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
