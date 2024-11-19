
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  telefon: 'telefon'
};

exports.Prisma.WohnungScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  titel: 'titel',
  beschreibung: 'beschreibung',
  strasse: 'strasse',
  hausnummer: 'hausnummer',
  plz: 'plz',
  stadt: 'stadt',
  flaeche: 'flaeche',
  zimmer: 'zimmer',
  miete: 'miete',
  userId: 'userId',
  bilder: 'bilder',
  stellplatz: 'stellplatz'
};

exports.Prisma.LocationScalarFieldEnum = {
  coordinates: 'coordinates',
  wohnungId: 'wohnungId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  User: 'User',
  Wohnung: 'Wohnung',
  Location: 'Location'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/matthias/Dokumente/Code/wohnungstausch/prisma/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "/home/matthias/Dokumente/Code/wohnungstausch/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"./generated/client\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DIRECT_URL\")\n}\n\nmodel User {\n  id        String    @id @default(cuid())\n  name      String?\n  email     String?\n  telefon   String?\n  wohnungen Wohnung[]\n}\n\nmodel Wohnung {\n  id           Int       @id @default(autoincrement())\n  createdAt    DateTime  @default(now())\n  updatedAt    DateTime\n  titel        String\n  beschreibung String?\n  strasse      String\n  hausnummer   String\n  plz          String\n  stadt        String\n  flaeche      Float\n  zimmer       Int\n  miete        Float\n  userId       String\n  bilder       String[]\n  stellplatz   Boolean   @default(false)\n  location     Location?\n  user         User      @relation(fields: [userId], references: [id])\n\n  @@index([createdAt])\n  @@index([miete])\n  @@index([zimmer])\n  @@index([flaeche])\n  @@index([userId])\n  @@index([stellplatz])\n}\n\nmodel Location {\n  coordinates Json\n  wohnungId   Int     @unique\n  wohnung     Wohnung @relation(fields: [wohnungId], references: [id])\n}\n",
  "inlineSchemaHash": "70980aa4a545d34a00a6d1de036a47cf0d30c5c2b63fe285aecfac120b50fe09",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"telefon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"wohnungen\",\"kind\":\"object\",\"type\":\"Wohnung\",\"relationName\":\"UserToWohnung\"}],\"dbName\":null},\"Wohnung\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"titel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"beschreibung\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"strasse\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hausnummer\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"plz\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stadt\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"flaeche\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"zimmer\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"miete\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bilder\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stellplatz\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"location\",\"kind\":\"object\",\"type\":\"Location\",\"relationName\":\"LocationToWohnung\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToWohnung\"}],\"dbName\":null},\"Location\":{\"fields\":[{\"name\":\"coordinates\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"wohnungId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"wohnung\",\"kind\":\"object\",\"type\":\"Wohnung\",\"relationName\":\"LocationToWohnung\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

