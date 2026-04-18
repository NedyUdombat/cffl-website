import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import competition from "./competition";
import gameResult from "./gameResult";
import match from "./match";
import newsType from "./newsType"; // 👈 Add this line
import { postType } from "./postType";
import replay from "./replay"; // ✅ Import the new schema
import team from "./team";
import upcoming from "./upcoming";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    newsType,
    upcoming,
    replay,
    match,
    gameResult,
    team,
    competition,
  ], // 👈 And this one
};
