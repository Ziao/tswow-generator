## @tswow/types-live and @tswow/types-classic
#### Tool to generate complete and strict typescript definitions World of Warcraft's Lua API for addon development.

Addon development for World of Warcraft is done in Lua and is notoriously difficult to debug. Official documentation has only recently been made available and is only accessible through the game client. This project aims to provide a complete and strict typescript definition of the Lua API, by analyzing Blizzard's embedded documentation and generating typescript definitions from it.

The types generated through this tool are meant to be used in conjunction with the TSWoW project.
If you are simply looking for the types as an NPM package, you can always install `@tswow/types` directly. Be sure to read the versioning section below.

We aim to keep these types in sync with the game at all types, but their accuracy depends on Blizzard keeping their in-game documentation up to date.

A lack of updates to this repository does not necessarily mean that the types are out of date. We will only update this repository when we have made changes to the generator itself. If you want to be sure that you have the latest types, you can always run the generator yourself.

### Versioning
While this project itself uses semver, the published definition packages do follow this system in a conventional manner. We follow the game's version, so that you know exactly which version of the game each package is compatible with. We then affix a build number to the end in the event of multiple releases for the same game version. Eg `10.5.1.1` would be the first build of the `10.5.1` version of the game documentation, while `10.5.1.2` would be the second build of the same version. Upon the game entering a new version, the build number is reset to 1. 

### Setup

Init submodules
```bash
$ git submodule update --init --recursive
```

Install dependencies
```bash
$ yarn
```

### Usage

Generate typescript definitions, based on the documentation within wow-ui-source.
Your definitions will be available in the `dist` directory.
```bash
$ yarn generate
```

### Contributing
Contributions are welcome. Please open an issue or a pull request.
If you have any crazy ideas, please open an issue first so no time is wasted.


### Todo
- [ ] Remove the dependency on the wow-ui-source submodule. Instead, store the path to the game files in a config file and extract the documentation from there.
- [ ] Clean up the code and make it more readable.
- [ ] Add more documentation to the code.
- [ ] Build / publish scripts
- [ ] CI
- [ ] Mechanism to add our own documentation for functions that are not documented by Blizzard.
- [ ] After the above, maybe we can scrape Wowpedia for the documentation of undocumented functions (with attribution), or at least add links to Wowpedia.
- [ ] Tests
- [ ] Set up husky and commitlint
- [ ] Should we use objects instead of enums? Enums have two way mapping, but within wow, they don't
- [ ] Figure out whether secure functions are simply not documented or if they have a flag.. or maybe they are documented without a flag. Maybe we can get this info from Wowpedia and mark those functions as @deprecated, not perfect but at least your IDE will warn you.
