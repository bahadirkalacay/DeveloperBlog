import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlices";

import UsersListItem from "./UsersListItem";

const UsersList = () => {
 
  const dispatch = useDispatch();
  const users = useSelector(state => state?.users);
  const { usersList, appErr, serverErr, loading, block, unblock } = users;

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [block, unblock]);

  return (
    <>
      <section className="bg-white min-h-screen w-full" >
        {loading ? (
        <h2 className="text-center text-3xl text-green-800 m-8">Loading...</h2>
        ) : appErr || serverErr ? (
          <h3 className="text-yellow-600 text-center text-lg">
            {serverErr} {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map(user => (
            <>
              <UsersListItem user={user} />
            </>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
