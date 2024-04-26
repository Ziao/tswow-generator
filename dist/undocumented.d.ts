// Undocumented types live in this file.
// Hand typed, additions are welcome.
// Please keep this file sorted alphabetically and add links to documentation where possible.

/**
 * Represents a unit
 * @see https://wow.gamepedia.com/UnitId
 */
type UnitToken =
    | `arena${number}`
    | `boss${number}`
    | "focus"
    | "mouseover"
    | "none"
    | `party${number}`
    | `partyPet${number}`
    | "pet"
    | "player"
    | `raid${number}`
    | `raidPet${number}`
    | "target"
    | "vehicle"
    | `nameplate${number}`
    | `spectateda${number}`
    | `spectatedb${number}`
    | `spectatedpeta${number}`
    | `spectatedpetb${number}`;
