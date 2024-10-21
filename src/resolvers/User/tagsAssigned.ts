import { ActionItemCategory, OrganizationTagUser, TagUser } from "../../models";
import type {
  OrganizationResolvers,
  UserResolvers,
} from "../../types/generatedGraphQLTypes";

/**
 * Resolver function for the `actionItemCategories` field of an `Organization`.
 *
 * This function retrieves the action item categories related to a specific organization.
 *
 * @param parent - The parent object representing the organization. It contains information about the organization, including the ID of the organization.
 * @returns A promise that resolves to the action item category documents found in the database. These documents represent the action item categories related to the organization.
 *
 * @see ActionItemCategory - The ActionItemCategory model used to interact with the action item categories collection in the database.
 * @see OrganizationResolvers - The type definition for the resolvers of the Organization fields.
 *
 */
export const tagsAssigned: UserResolvers["tagsAssigned"] = async (parent) => {
  const tags = await TagUser.find({
    userId: parent._id,
  }).lean();

  const tagIds = tags.map((tag) => tag.tagId);

  return await OrganizationTagUser.find({
    _id: { $in: tagIds },
  })
    .sort({ _id: -1 })
    .lean();
};
