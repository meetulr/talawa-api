import type { UserResolvers } from "../../types/generatedGraphQLTypes";
// import { tagsAssignedWith } from "./tagsAssignedWith";
import { posts } from "./posts";
import { tagsAssigned } from "./tagsAssigned";

export const User: UserResolvers = {
  // tagsAssignedWith,
  posts,
  tagsAssigned,
};
