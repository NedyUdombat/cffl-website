import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import competition from "./competition";
import gameResult from "./gameResult";
import match from "./match";
import media from "./media";
import newsType from "./newsType";
import player from "./player";
import playerMatchStats from "./playerMatchStats";
import { postType } from "./postType";
import replay from "./replay";
import rosterEntry from "./rosterEntry";
import staff from "./staff";
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
    gameResult,
    competition,
    team,
    match,
    player,
    rosterEntry,
    staff,
    playerMatchStats,
    media,
  ], // 👈 And this one
};
