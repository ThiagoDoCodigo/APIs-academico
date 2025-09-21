import { UsersBusiness } from "../business/UsersBusiness";
import { PostBusiness } from "../business/PostBusiness";

const usersBusiness = new UsersBusiness();

const postBusiness = new PostBusiness(usersBusiness);

usersBusiness.postBusiness = postBusiness;

export { usersBusiness, postBusiness };
