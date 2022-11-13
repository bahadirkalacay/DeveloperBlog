import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { PencilAltIcon } from "@heroicons/react/outline";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";
import DateFormatter from "./../../utils/DateFormatter";

const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  const category = useSelector((state) => state?.category);

  const { categoryList, loading, appErr, serverErr } = category;

  return (
    <>
      {loading ? (
        <h2 className="font-Industry text-center text-3xl text-green-800 m-8">Loading...</h2>
      ) : appErr || serverErr ? (
        <h2 className="font-Industry text-center text-3xl text-red-600">
          {serverErr} {serverErr}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2 className="font-Industry text-center text-3xl text-green-800">
          No category Found
        </h2>
      ) : (
        <div className="font-Industry flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList?.map((category) => (
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {<DateFormatter date={category?.createdAt} />}
                        </td>
                        <Link to={`/update-category/${category?._id}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <PencilAltIcon className="h-5 text-indigo-500" />
                          </td>
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;
