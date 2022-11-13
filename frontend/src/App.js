import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoute/PrivateProtectRoute";
import AdminRoute from "./components/Navigation/ProtectedRoute/AdminRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import UsersList from "./components/Users/UsersList.js/UsersList";
import UpdatePassword from "./components/Users/PasswordManagement/UpdatePassword";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <AdminRoute exact path="/add-category" component={AddNewCategory} />
        <AdminRoute exact path="/category-list" component={CategoryList} />
        <AdminRoute
          exact
          path="/update-category/:id"
          component={UpdateCategory}
        />
        <PrivateProtectRoute exact path="/create-post" component={CreatePost} />
        <Route exact path="/posts" component={PostsList} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <PrivateProtectRoute
          exact
          path="/update-post/:id"
          component={UpdatePost}
        />
        <PrivateProtectRoute exact path="/profile/:id" component={Profile} />
        <PrivateProtectRoute
          exact
          path="/upload-profile-photo"
          component={UploadProfilePhoto}
        />
        <PrivateProtectRoute
          exact
          path="/update-profile/:id"
          component={UpdateProfileForm}
        />
        <AdminRoute exact path="/users" component={UsersList} />
        <PrivateProtectRoute
          exact
          path="/update-password"
          component={UpdatePassword}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
