import { Types } from "mongoose";
import type { GraphQLConnectionTraversalDirection } from ".";
import type {
  ParseSortedByResult,
  ParseUserTagUserWhereResult,
} from "../userTagsUtils";

/**
 * This is typescript type of the object returned from function `getGraphQLConnectionFilter`.
 */
type GraphQLConnectionFilter =
  | {
      _id: {
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
      _id: {
        $gt: Types.ObjectId;
      };
      firstName: {
        $regex: RegExp;
      };
      lastName: {
        $regex: RegExp;
      };
    }
  | Record<string, never>;

/**
 * This function is used to get an object containing filtering logic.
 */
export function getUserTagUserGraphQLConnectionFilter({
  cursor,
  direction,
  sortById,
  firstNameStartsWith,
  lastNameStartsWith,
}: ParseSortedByResult &
  ParseUserTagUserWhereResult & {
    cursor: string | null;
    direction: GraphQLConnectionTraversalDirection;
  }): GraphQLConnectionFilter {
  const filter = {} as GraphQLConnectionFilter;

  filter.firstName = {
    $regex: new RegExp(`^${firstNameStartsWith}`, "i"),
  };
  filter.lastName = {
    $regex: new RegExp(`^${lastNameStartsWith}`, "i"),
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
