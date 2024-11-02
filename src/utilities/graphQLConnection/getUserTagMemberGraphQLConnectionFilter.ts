import { Types } from "mongoose";
import type { GraphQLConnectionTraversalDirection } from ".";
import type {
  ParseSortedByResult,
  ParseUserTagMemberWhereResult,
} from "../userTagsPaginationUtils";

/**
 * This is typescript type of the object returned from function `getUserTagMemberGraphQLConnectionFilter`.
 */
type UserTagMemberGraphQLConnectionFilter =
  | {
      _id?: {
        $lt: Types.ObjectId;
      };
      firstName: {
        $regex: RegExp;
      };
      lastName: {
        $regex: RegExp;
      };
    }
  | {
      _id?: {
        $gt: Types.ObjectId;
      };
      firstName: {
        $regex: RegExp;
      };
      lastName: {
        $regex: RegExp;
      };
    };

/**
 * This function is used to get an object containing filtering logic.
 */
export function getUserTagMemberGraphQLConnectionFilter({
  cursor,
  direction,
  sortById,
  firstNameStartsWith,
  lastNameStartsWith,
}: ParseSortedByResult &
  ParseUserTagMemberWhereResult & {
    cursor: string | null;
    direction: GraphQLConnectionTraversalDirection;
  }): UserTagMemberGraphQLConnectionFilter {
  const filter = {} as UserTagMemberGraphQLConnectionFilter;

  filter.firstName = {
    $regex: new RegExp(
      `^${firstNameStartsWith.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "i",
    ),
  };
  filter.lastName = {
    $regex: new RegExp(
      `^${lastNameStartsWith.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "i",
    ),
  };

  if (cursor !== null) {
    if (sortById === "ASCENDING") {
      if (direction === "BACKWARD") {
        filter._id = {
          $lt: new Types.ObjectId(cursor),
        };
      } else {
        filter._id = {
          $gt: new Types.ObjectId(cursor),
        };
      }
    } else {
      if (direction === "BACKWARD") {
        filter._id = {
          $gt: new Types.ObjectId(cursor),
        };
      } else {
        filter._id = {
          $lt: new Types.ObjectId(cursor),
        };
      }
    }
  }

  return filter;
}
