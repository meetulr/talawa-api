import { Types } from "mongoose";
import type { GraphQLConnectionTraversalDirection } from "./index";

/**
 * This is the TypeScript type of the object returned from the function `getCommonGraphQLConnectionFilter`.
 */
export type CommonGraphQLConnectionFilter =
  | {
      _id: {
        $lt: Types.ObjectId;
      };
      name?: {
        $regex: RegExp;
      };
    }
  | {
      _id: {
        $gt: Types.ObjectId;
      };
      name?: {
        $regex: RegExp;
      };
    }
  | Record<string, never>;

/**
 * This function is used to get an object containing common mongoose filtering logic.
 *
 * @remarks
 * Here are a few assumptions this function makes which are common to most of the GraphQL connections.
 *
 * The entity that has the latest creation datetime must appear at the top of the connection.
 *
 * @example
 * const filter = getCommonGraphQLConnectionFilter({
 *  cursor: "65da3f8df35eb5bfd52c5368",
 *  direction: "BACKWARD"
 * });
 * const objectList = await User.find(filter).limit(10);
 */
export function getCommonGraphQLConnectionFilter({
  cursor,
  direction,
  where = {},
}: {
  cursor: string | null;
  direction: GraphQLConnectionTraversalDirection;
  where?: Record<string, any>; // Optional where parameter
}): CommonGraphQLConnectionFilter {
  const filter = {} as CommonGraphQLConnectionFilter; // Start with an empty filter

  // Check if there's a name in the where input and convert it to a regex
  if (where.name) {
    filter.name = {
      $regex: new RegExp(`^${where.name}`, "i"), // Create a case-insensitive regex for names starting with the input
    };
  }

  // Handle cursor-based filtering
  if (cursor !== null) {
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

  return filter; // Return the constructed filter
}
