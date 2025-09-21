import { UsersBusiness } from "../business/UsersBusiness";
import { PostBusiness } from "../business/PostBusiness";
import { UsersData } from "../data/UsersData";
import { PostData } from "../data/PostData";

const postData = new PostData();
const userData = new UsersData();

const usersBusiness = new UsersBusiness(userData);

const postBusiness = new PostBusiness(postData, usersBusiness);

usersBusiness.setPostBusiness(postBusiness);

export { usersBusiness, postBusiness };
