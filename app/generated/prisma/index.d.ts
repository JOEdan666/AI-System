
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model LearningItem
 * 
 */
export type LearningItem = $Result.DefaultSelection<Prisma.$LearningItemPayload>
/**
 * Model KnowledgeBaseItem
 * 
 */
export type KnowledgeBaseItem = $Result.DefaultSelection<Prisma.$KnowledgeBaseItemPayload>
/**
 * Model LearningSession
 * 
 */
export type LearningSession = $Result.DefaultSelection<Prisma.$LearningSessionPayload>
/**
 * Model QuizQuestion
 * 
 */
export type QuizQuestion = $Result.DefaultSelection<Prisma.$QuizQuestionPayload>
/**
 * Model UserAnswer
 * 
 */
export type UserAnswer = $Result.DefaultSelection<Prisma.$UserAnswerPayload>
/**
 * Model LearningStats
 * 
 */
export type LearningStats = $Result.DefaultSelection<Prisma.$LearningStatsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more LearningItems
 * const learningItems = await prisma.learningItem.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more LearningItems
   * const learningItems = await prisma.learningItem.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.learningItem`: Exposes CRUD operations for the **LearningItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningItems
    * const learningItems = await prisma.learningItem.findMany()
    * ```
    */
  get learningItem(): Prisma.LearningItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.knowledgeBaseItem`: Exposes CRUD operations for the **KnowledgeBaseItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KnowledgeBaseItems
    * const knowledgeBaseItems = await prisma.knowledgeBaseItem.findMany()
    * ```
    */
  get knowledgeBaseItem(): Prisma.KnowledgeBaseItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningSession`: Exposes CRUD operations for the **LearningSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningSessions
    * const learningSessions = await prisma.learningSession.findMany()
    * ```
    */
  get learningSession(): Prisma.LearningSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizQuestion`: Exposes CRUD operations for the **QuizQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizQuestions
    * const quizQuestions = await prisma.quizQuestion.findMany()
    * ```
    */
  get quizQuestion(): Prisma.QuizQuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAnswer`: Exposes CRUD operations for the **UserAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAnswers
    * const userAnswers = await prisma.userAnswer.findMany()
    * ```
    */
  get userAnswer(): Prisma.UserAnswerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningStats`: Exposes CRUD operations for the **LearningStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningStats
    * const learningStats = await prisma.learningStats.findMany()
    * ```
    */
  get learningStats(): Prisma.LearningStatsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    LearningItem: 'LearningItem',
    KnowledgeBaseItem: 'KnowledgeBaseItem',
    LearningSession: 'LearningSession',
    QuizQuestion: 'QuizQuestion',
    UserAnswer: 'UserAnswer',
    LearningStats: 'LearningStats'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "learningItem" | "knowledgeBaseItem" | "learningSession" | "quizQuestion" | "userAnswer" | "learningStats"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      LearningItem: {
        payload: Prisma.$LearningItemPayload<ExtArgs>
        fields: Prisma.LearningItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload>
          }
          findFirst: {
            args: Prisma.LearningItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload>
          }
          findMany: {
            args: Prisma.LearningItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload>[]
          }
          create: {
            args: Prisma.LearningItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload>
          }
          createMany: {
            args: Prisma.LearningItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload>[]
          }
          delete: {
            args: Prisma.LearningItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload>
          }
          update: {
            args: Prisma.LearningItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload>
          }
          deleteMany: {
            args: Prisma.LearningItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload>[]
          }
          upsert: {
            args: Prisma.LearningItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningItemPayload>
          }
          aggregate: {
            args: Prisma.LearningItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningItem>
          }
          groupBy: {
            args: Prisma.LearningItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningItemCountArgs<ExtArgs>
            result: $Utils.Optional<LearningItemCountAggregateOutputType> | number
          }
        }
      }
      KnowledgeBaseItem: {
        payload: Prisma.$KnowledgeBaseItemPayload<ExtArgs>
        fields: Prisma.KnowledgeBaseItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KnowledgeBaseItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KnowledgeBaseItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload>
          }
          findFirst: {
            args: Prisma.KnowledgeBaseItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KnowledgeBaseItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload>
          }
          findMany: {
            args: Prisma.KnowledgeBaseItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload>[]
          }
          create: {
            args: Prisma.KnowledgeBaseItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload>
          }
          createMany: {
            args: Prisma.KnowledgeBaseItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KnowledgeBaseItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload>[]
          }
          delete: {
            args: Prisma.KnowledgeBaseItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload>
          }
          update: {
            args: Prisma.KnowledgeBaseItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload>
          }
          deleteMany: {
            args: Prisma.KnowledgeBaseItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KnowledgeBaseItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KnowledgeBaseItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload>[]
          }
          upsert: {
            args: Prisma.KnowledgeBaseItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBaseItemPayload>
          }
          aggregate: {
            args: Prisma.KnowledgeBaseItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKnowledgeBaseItem>
          }
          groupBy: {
            args: Prisma.KnowledgeBaseItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeBaseItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.KnowledgeBaseItemCountArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeBaseItemCountAggregateOutputType> | number
          }
        }
      }
      LearningSession: {
        payload: Prisma.$LearningSessionPayload<ExtArgs>
        fields: Prisma.LearningSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload>
          }
          findFirst: {
            args: Prisma.LearningSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload>
          }
          findMany: {
            args: Prisma.LearningSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload>[]
          }
          create: {
            args: Prisma.LearningSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload>
          }
          createMany: {
            args: Prisma.LearningSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload>[]
          }
          delete: {
            args: Prisma.LearningSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload>
          }
          update: {
            args: Prisma.LearningSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload>
          }
          deleteMany: {
            args: Prisma.LearningSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload>[]
          }
          upsert: {
            args: Prisma.LearningSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionPayload>
          }
          aggregate: {
            args: Prisma.LearningSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningSession>
          }
          groupBy: {
            args: Prisma.LearningSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningSessionCountArgs<ExtArgs>
            result: $Utils.Optional<LearningSessionCountAggregateOutputType> | number
          }
        }
      }
      QuizQuestion: {
        payload: Prisma.$QuizQuestionPayload<ExtArgs>
        fields: Prisma.QuizQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          findFirst: {
            args: Prisma.QuizQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          findMany: {
            args: Prisma.QuizQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          create: {
            args: Prisma.QuizQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          createMany: {
            args: Prisma.QuizQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          delete: {
            args: Prisma.QuizQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          update: {
            args: Prisma.QuizQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuizQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuizQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          aggregate: {
            args: Prisma.QuizQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizQuestion>
          }
          groupBy: {
            args: Prisma.QuizQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuizQuestionCountAggregateOutputType> | number
          }
        }
      }
      UserAnswer: {
        payload: Prisma.$UserAnswerPayload<ExtArgs>
        fields: Prisma.UserAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          findFirst: {
            args: Prisma.UserAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          findMany: {
            args: Prisma.UserAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>[]
          }
          create: {
            args: Prisma.UserAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          createMany: {
            args: Prisma.UserAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>[]
          }
          delete: {
            args: Prisma.UserAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          update: {
            args: Prisma.UserAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          deleteMany: {
            args: Prisma.UserAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserAnswerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>[]
          }
          upsert: {
            args: Prisma.UserAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          aggregate: {
            args: Prisma.UserAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAnswer>
          }
          groupBy: {
            args: Prisma.UserAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<UserAnswerCountAggregateOutputType> | number
          }
        }
      }
      LearningStats: {
        payload: Prisma.$LearningStatsPayload<ExtArgs>
        fields: Prisma.LearningStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          findFirst: {
            args: Prisma.LearningStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          findMany: {
            args: Prisma.LearningStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>[]
          }
          create: {
            args: Prisma.LearningStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          createMany: {
            args: Prisma.LearningStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>[]
          }
          delete: {
            args: Prisma.LearningStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          update: {
            args: Prisma.LearningStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          deleteMany: {
            args: Prisma.LearningStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>[]
          }
          upsert: {
            args: Prisma.LearningStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          aggregate: {
            args: Prisma.LearningStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningStats>
          }
          groupBy: {
            args: Prisma.LearningStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningStatsCountArgs<ExtArgs>
            result: $Utils.Optional<LearningStatsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    learningItem?: LearningItemOmit
    knowledgeBaseItem?: KnowledgeBaseItemOmit
    learningSession?: LearningSessionOmit
    quizQuestion?: QuizQuestionOmit
    userAnswer?: UserAnswerOmit
    learningStats?: LearningStatsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LearningSessionCountOutputType
   */

  export type LearningSessionCountOutputType = {
    quizQuestions: number
    userAnswers: number
  }

  export type LearningSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quizQuestions?: boolean | LearningSessionCountOutputTypeCountQuizQuestionsArgs
    userAnswers?: boolean | LearningSessionCountOutputTypeCountUserAnswersArgs
  }

  // Custom InputTypes
  /**
   * LearningSessionCountOutputType without action
   */
  export type LearningSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionCountOutputType
     */
    select?: LearningSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LearningSessionCountOutputType without action
   */
  export type LearningSessionCountOutputTypeCountQuizQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizQuestionWhereInput
  }

  /**
   * LearningSessionCountOutputType without action
   */
  export type LearningSessionCountOutputTypeCountUserAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
  }


  /**
   * Count Type QuizQuestionCountOutputType
   */

  export type QuizQuestionCountOutputType = {
    userAnswers: number
  }

  export type QuizQuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAnswers?: boolean | QuizQuestionCountOutputTypeCountUserAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuizQuestionCountOutputType without action
   */
  export type QuizQuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestionCountOutputType
     */
    select?: QuizQuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizQuestionCountOutputType without action
   */
  export type QuizQuestionCountOutputTypeCountUserAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model LearningItem
   */

  export type AggregateLearningItem = {
    _count: LearningItemCountAggregateOutputType | null
    _min: LearningItemMinAggregateOutputType | null
    _max: LearningItemMaxAggregateOutputType | null
  }

  export type LearningItemMinAggregateOutputType = {
    id: string | null
    text: string | null
    subject: string | null
    createdAt: Date | null
  }

  export type LearningItemMaxAggregateOutputType = {
    id: string | null
    text: string | null
    subject: string | null
    createdAt: Date | null
  }

  export type LearningItemCountAggregateOutputType = {
    id: number
    text: number
    subject: number
    createdAt: number
    _all: number
  }


  export type LearningItemMinAggregateInputType = {
    id?: true
    text?: true
    subject?: true
    createdAt?: true
  }

  export type LearningItemMaxAggregateInputType = {
    id?: true
    text?: true
    subject?: true
    createdAt?: true
  }

  export type LearningItemCountAggregateInputType = {
    id?: true
    text?: true
    subject?: true
    createdAt?: true
    _all?: true
  }

  export type LearningItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningItem to aggregate.
     */
    where?: LearningItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningItems to fetch.
     */
    orderBy?: LearningItemOrderByWithRelationInput | LearningItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningItems
    **/
    _count?: true | LearningItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningItemMaxAggregateInputType
  }

  export type GetLearningItemAggregateType<T extends LearningItemAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningItem[P]>
      : GetScalarType<T[P], AggregateLearningItem[P]>
  }




  export type LearningItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningItemWhereInput
    orderBy?: LearningItemOrderByWithAggregationInput | LearningItemOrderByWithAggregationInput[]
    by: LearningItemScalarFieldEnum[] | LearningItemScalarFieldEnum
    having?: LearningItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningItemCountAggregateInputType | true
    _min?: LearningItemMinAggregateInputType
    _max?: LearningItemMaxAggregateInputType
  }

  export type LearningItemGroupByOutputType = {
    id: string
    text: string
    subject: string
    createdAt: Date
    _count: LearningItemCountAggregateOutputType | null
    _min: LearningItemMinAggregateOutputType | null
    _max: LearningItemMaxAggregateOutputType | null
  }

  type GetLearningItemGroupByPayload<T extends LearningItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningItemGroupByOutputType[P]>
            : GetScalarType<T[P], LearningItemGroupByOutputType[P]>
        }
      >
    >


  export type LearningItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    subject?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["learningItem"]>

  export type LearningItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    subject?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["learningItem"]>

  export type LearningItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    subject?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["learningItem"]>

  export type LearningItemSelectScalar = {
    id?: boolean
    text?: boolean
    subject?: boolean
    createdAt?: boolean
  }

  export type LearningItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "subject" | "createdAt", ExtArgs["result"]["learningItem"]>

  export type $LearningItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      subject: string
      createdAt: Date
    }, ExtArgs["result"]["learningItem"]>
    composites: {}
  }

  type LearningItemGetPayload<S extends boolean | null | undefined | LearningItemDefaultArgs> = $Result.GetResult<Prisma.$LearningItemPayload, S>

  type LearningItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningItemCountAggregateInputType | true
    }

  export interface LearningItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningItem'], meta: { name: 'LearningItem' } }
    /**
     * Find zero or one LearningItem that matches the filter.
     * @param {LearningItemFindUniqueArgs} args - Arguments to find a LearningItem
     * @example
     * // Get one LearningItem
     * const learningItem = await prisma.learningItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningItemFindUniqueArgs>(args: SelectSubset<T, LearningItemFindUniqueArgs<ExtArgs>>): Prisma__LearningItemClient<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningItemFindUniqueOrThrowArgs} args - Arguments to find a LearningItem
     * @example
     * // Get one LearningItem
     * const learningItem = await prisma.learningItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningItemFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningItemClient<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningItemFindFirstArgs} args - Arguments to find a LearningItem
     * @example
     * // Get one LearningItem
     * const learningItem = await prisma.learningItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningItemFindFirstArgs>(args?: SelectSubset<T, LearningItemFindFirstArgs<ExtArgs>>): Prisma__LearningItemClient<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningItemFindFirstOrThrowArgs} args - Arguments to find a LearningItem
     * @example
     * // Get one LearningItem
     * const learningItem = await prisma.learningItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningItemFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningItemClient<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningItems
     * const learningItems = await prisma.learningItem.findMany()
     * 
     * // Get first 10 LearningItems
     * const learningItems = await prisma.learningItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningItemWithIdOnly = await prisma.learningItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningItemFindManyArgs>(args?: SelectSubset<T, LearningItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningItem.
     * @param {LearningItemCreateArgs} args - Arguments to create a LearningItem.
     * @example
     * // Create one LearningItem
     * const LearningItem = await prisma.learningItem.create({
     *   data: {
     *     // ... data to create a LearningItem
     *   }
     * })
     * 
     */
    create<T extends LearningItemCreateArgs>(args: SelectSubset<T, LearningItemCreateArgs<ExtArgs>>): Prisma__LearningItemClient<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningItems.
     * @param {LearningItemCreateManyArgs} args - Arguments to create many LearningItems.
     * @example
     * // Create many LearningItems
     * const learningItem = await prisma.learningItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningItemCreateManyArgs>(args?: SelectSubset<T, LearningItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningItems and returns the data saved in the database.
     * @param {LearningItemCreateManyAndReturnArgs} args - Arguments to create many LearningItems.
     * @example
     * // Create many LearningItems
     * const learningItem = await prisma.learningItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningItems and only return the `id`
     * const learningItemWithIdOnly = await prisma.learningItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningItemCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningItem.
     * @param {LearningItemDeleteArgs} args - Arguments to delete one LearningItem.
     * @example
     * // Delete one LearningItem
     * const LearningItem = await prisma.learningItem.delete({
     *   where: {
     *     // ... filter to delete one LearningItem
     *   }
     * })
     * 
     */
    delete<T extends LearningItemDeleteArgs>(args: SelectSubset<T, LearningItemDeleteArgs<ExtArgs>>): Prisma__LearningItemClient<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningItem.
     * @param {LearningItemUpdateArgs} args - Arguments to update one LearningItem.
     * @example
     * // Update one LearningItem
     * const learningItem = await prisma.learningItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningItemUpdateArgs>(args: SelectSubset<T, LearningItemUpdateArgs<ExtArgs>>): Prisma__LearningItemClient<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningItems.
     * @param {LearningItemDeleteManyArgs} args - Arguments to filter LearningItems to delete.
     * @example
     * // Delete a few LearningItems
     * const { count } = await prisma.learningItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningItemDeleteManyArgs>(args?: SelectSubset<T, LearningItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningItems
     * const learningItem = await prisma.learningItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningItemUpdateManyArgs>(args: SelectSubset<T, LearningItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningItems and returns the data updated in the database.
     * @param {LearningItemUpdateManyAndReturnArgs} args - Arguments to update many LearningItems.
     * @example
     * // Update many LearningItems
     * const learningItem = await prisma.learningItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningItems and only return the `id`
     * const learningItemWithIdOnly = await prisma.learningItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningItemUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningItem.
     * @param {LearningItemUpsertArgs} args - Arguments to update or create a LearningItem.
     * @example
     * // Update or create a LearningItem
     * const learningItem = await prisma.learningItem.upsert({
     *   create: {
     *     // ... data to create a LearningItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningItem we want to update
     *   }
     * })
     */
    upsert<T extends LearningItemUpsertArgs>(args: SelectSubset<T, LearningItemUpsertArgs<ExtArgs>>): Prisma__LearningItemClient<$Result.GetResult<Prisma.$LearningItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningItemCountArgs} args - Arguments to filter LearningItems to count.
     * @example
     * // Count the number of LearningItems
     * const count = await prisma.learningItem.count({
     *   where: {
     *     // ... the filter for the LearningItems we want to count
     *   }
     * })
    **/
    count<T extends LearningItemCountArgs>(
      args?: Subset<T, LearningItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningItemAggregateArgs>(args: Subset<T, LearningItemAggregateArgs>): Prisma.PrismaPromise<GetLearningItemAggregateType<T>>

    /**
     * Group by LearningItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningItemGroupByArgs['orderBy'] }
        : { orderBy?: LearningItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningItem model
   */
  readonly fields: LearningItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningItem model
   */
  interface LearningItemFieldRefs {
    readonly id: FieldRef<"LearningItem", 'String'>
    readonly text: FieldRef<"LearningItem", 'String'>
    readonly subject: FieldRef<"LearningItem", 'String'>
    readonly createdAt: FieldRef<"LearningItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningItem findUnique
   */
  export type LearningItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * Filter, which LearningItem to fetch.
     */
    where: LearningItemWhereUniqueInput
  }

  /**
   * LearningItem findUniqueOrThrow
   */
  export type LearningItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * Filter, which LearningItem to fetch.
     */
    where: LearningItemWhereUniqueInput
  }

  /**
   * LearningItem findFirst
   */
  export type LearningItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * Filter, which LearningItem to fetch.
     */
    where?: LearningItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningItems to fetch.
     */
    orderBy?: LearningItemOrderByWithRelationInput | LearningItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningItems.
     */
    cursor?: LearningItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningItems.
     */
    distinct?: LearningItemScalarFieldEnum | LearningItemScalarFieldEnum[]
  }

  /**
   * LearningItem findFirstOrThrow
   */
  export type LearningItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * Filter, which LearningItem to fetch.
     */
    where?: LearningItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningItems to fetch.
     */
    orderBy?: LearningItemOrderByWithRelationInput | LearningItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningItems.
     */
    cursor?: LearningItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningItems.
     */
    distinct?: LearningItemScalarFieldEnum | LearningItemScalarFieldEnum[]
  }

  /**
   * LearningItem findMany
   */
  export type LearningItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * Filter, which LearningItems to fetch.
     */
    where?: LearningItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningItems to fetch.
     */
    orderBy?: LearningItemOrderByWithRelationInput | LearningItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningItems.
     */
    cursor?: LearningItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningItems.
     */
    skip?: number
    distinct?: LearningItemScalarFieldEnum | LearningItemScalarFieldEnum[]
  }

  /**
   * LearningItem create
   */
  export type LearningItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * The data needed to create a LearningItem.
     */
    data: XOR<LearningItemCreateInput, LearningItemUncheckedCreateInput>
  }

  /**
   * LearningItem createMany
   */
  export type LearningItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningItems.
     */
    data: LearningItemCreateManyInput | LearningItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningItem createManyAndReturn
   */
  export type LearningItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * The data used to create many LearningItems.
     */
    data: LearningItemCreateManyInput | LearningItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningItem update
   */
  export type LearningItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * The data needed to update a LearningItem.
     */
    data: XOR<LearningItemUpdateInput, LearningItemUncheckedUpdateInput>
    /**
     * Choose, which LearningItem to update.
     */
    where: LearningItemWhereUniqueInput
  }

  /**
   * LearningItem updateMany
   */
  export type LearningItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningItems.
     */
    data: XOR<LearningItemUpdateManyMutationInput, LearningItemUncheckedUpdateManyInput>
    /**
     * Filter which LearningItems to update
     */
    where?: LearningItemWhereInput
    /**
     * Limit how many LearningItems to update.
     */
    limit?: number
  }

  /**
   * LearningItem updateManyAndReturn
   */
  export type LearningItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * The data used to update LearningItems.
     */
    data: XOR<LearningItemUpdateManyMutationInput, LearningItemUncheckedUpdateManyInput>
    /**
     * Filter which LearningItems to update
     */
    where?: LearningItemWhereInput
    /**
     * Limit how many LearningItems to update.
     */
    limit?: number
  }

  /**
   * LearningItem upsert
   */
  export type LearningItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * The filter to search for the LearningItem to update in case it exists.
     */
    where: LearningItemWhereUniqueInput
    /**
     * In case the LearningItem found by the `where` argument doesn't exist, create a new LearningItem with this data.
     */
    create: XOR<LearningItemCreateInput, LearningItemUncheckedCreateInput>
    /**
     * In case the LearningItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningItemUpdateInput, LearningItemUncheckedUpdateInput>
  }

  /**
   * LearningItem delete
   */
  export type LearningItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
    /**
     * Filter which LearningItem to delete.
     */
    where: LearningItemWhereUniqueInput
  }

  /**
   * LearningItem deleteMany
   */
  export type LearningItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningItems to delete
     */
    where?: LearningItemWhereInput
    /**
     * Limit how many LearningItems to delete.
     */
    limit?: number
  }

  /**
   * LearningItem without action
   */
  export type LearningItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningItem
     */
    select?: LearningItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningItem
     */
    omit?: LearningItemOmit<ExtArgs> | null
  }


  /**
   * Model KnowledgeBaseItem
   */

  export type AggregateKnowledgeBaseItem = {
    _count: KnowledgeBaseItemCountAggregateOutputType | null
    _avg: KnowledgeBaseItemAvgAggregateOutputType | null
    _sum: KnowledgeBaseItemSumAggregateOutputType | null
    _min: KnowledgeBaseItemMinAggregateOutputType | null
    _max: KnowledgeBaseItemMaxAggregateOutputType | null
  }

  export type KnowledgeBaseItemAvgAggregateOutputType = {
    size: number | null
    lastModified: number | null
  }

  export type KnowledgeBaseItemSumAggregateOutputType = {
    size: number | null
    lastModified: bigint | null
  }

  export type KnowledgeBaseItemMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    size: number | null
    lastModified: bigint | null
    text: string | null
    ocrText: string | null
    notes: string | null
    dataUrl: string | null
    include: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KnowledgeBaseItemMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    size: number | null
    lastModified: bigint | null
    text: string | null
    ocrText: string | null
    notes: string | null
    dataUrl: string | null
    include: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KnowledgeBaseItemCountAggregateOutputType = {
    id: number
    name: number
    type: number
    size: number
    lastModified: number
    text: number
    ocrText: number
    notes: number
    dataUrl: number
    include: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KnowledgeBaseItemAvgAggregateInputType = {
    size?: true
    lastModified?: true
  }

  export type KnowledgeBaseItemSumAggregateInputType = {
    size?: true
    lastModified?: true
  }

  export type KnowledgeBaseItemMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    size?: true
    lastModified?: true
    text?: true
    ocrText?: true
    notes?: true
    dataUrl?: true
    include?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KnowledgeBaseItemMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    size?: true
    lastModified?: true
    text?: true
    ocrText?: true
    notes?: true
    dataUrl?: true
    include?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KnowledgeBaseItemCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    size?: true
    lastModified?: true
    text?: true
    ocrText?: true
    notes?: true
    dataUrl?: true
    include?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KnowledgeBaseItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeBaseItem to aggregate.
     */
    where?: KnowledgeBaseItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBaseItems to fetch.
     */
    orderBy?: KnowledgeBaseItemOrderByWithRelationInput | KnowledgeBaseItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KnowledgeBaseItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBaseItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBaseItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KnowledgeBaseItems
    **/
    _count?: true | KnowledgeBaseItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KnowledgeBaseItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KnowledgeBaseItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KnowledgeBaseItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KnowledgeBaseItemMaxAggregateInputType
  }

  export type GetKnowledgeBaseItemAggregateType<T extends KnowledgeBaseItemAggregateArgs> = {
        [P in keyof T & keyof AggregateKnowledgeBaseItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKnowledgeBaseItem[P]>
      : GetScalarType<T[P], AggregateKnowledgeBaseItem[P]>
  }




  export type KnowledgeBaseItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KnowledgeBaseItemWhereInput
    orderBy?: KnowledgeBaseItemOrderByWithAggregationInput | KnowledgeBaseItemOrderByWithAggregationInput[]
    by: KnowledgeBaseItemScalarFieldEnum[] | KnowledgeBaseItemScalarFieldEnum
    having?: KnowledgeBaseItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KnowledgeBaseItemCountAggregateInputType | true
    _avg?: KnowledgeBaseItemAvgAggregateInputType
    _sum?: KnowledgeBaseItemSumAggregateInputType
    _min?: KnowledgeBaseItemMinAggregateInputType
    _max?: KnowledgeBaseItemMaxAggregateInputType
  }

  export type KnowledgeBaseItemGroupByOutputType = {
    id: string
    name: string
    type: string
    size: number
    lastModified: bigint
    text: string | null
    ocrText: string | null
    notes: string | null
    dataUrl: string | null
    include: boolean
    createdAt: Date
    updatedAt: Date
    _count: KnowledgeBaseItemCountAggregateOutputType | null
    _avg: KnowledgeBaseItemAvgAggregateOutputType | null
    _sum: KnowledgeBaseItemSumAggregateOutputType | null
    _min: KnowledgeBaseItemMinAggregateOutputType | null
    _max: KnowledgeBaseItemMaxAggregateOutputType | null
  }

  type GetKnowledgeBaseItemGroupByPayload<T extends KnowledgeBaseItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KnowledgeBaseItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KnowledgeBaseItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KnowledgeBaseItemGroupByOutputType[P]>
            : GetScalarType<T[P], KnowledgeBaseItemGroupByOutputType[P]>
        }
      >
    >


  export type KnowledgeBaseItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    size?: boolean
    lastModified?: boolean
    text?: boolean
    ocrText?: boolean
    notes?: boolean
    dataUrl?: boolean
    include?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["knowledgeBaseItem"]>

  export type KnowledgeBaseItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    size?: boolean
    lastModified?: boolean
    text?: boolean
    ocrText?: boolean
    notes?: boolean
    dataUrl?: boolean
    include?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["knowledgeBaseItem"]>

  export type KnowledgeBaseItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    size?: boolean
    lastModified?: boolean
    text?: boolean
    ocrText?: boolean
    notes?: boolean
    dataUrl?: boolean
    include?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["knowledgeBaseItem"]>

  export type KnowledgeBaseItemSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    size?: boolean
    lastModified?: boolean
    text?: boolean
    ocrText?: boolean
    notes?: boolean
    dataUrl?: boolean
    include?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KnowledgeBaseItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "size" | "lastModified" | "text" | "ocrText" | "notes" | "dataUrl" | "include" | "createdAt" | "updatedAt", ExtArgs["result"]["knowledgeBaseItem"]>

  export type $KnowledgeBaseItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KnowledgeBaseItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: string
      size: number
      lastModified: bigint
      text: string | null
      ocrText: string | null
      notes: string | null
      dataUrl: string | null
      include: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["knowledgeBaseItem"]>
    composites: {}
  }

  type KnowledgeBaseItemGetPayload<S extends boolean | null | undefined | KnowledgeBaseItemDefaultArgs> = $Result.GetResult<Prisma.$KnowledgeBaseItemPayload, S>

  type KnowledgeBaseItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KnowledgeBaseItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KnowledgeBaseItemCountAggregateInputType | true
    }

  export interface KnowledgeBaseItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KnowledgeBaseItem'], meta: { name: 'KnowledgeBaseItem' } }
    /**
     * Find zero or one KnowledgeBaseItem that matches the filter.
     * @param {KnowledgeBaseItemFindUniqueArgs} args - Arguments to find a KnowledgeBaseItem
     * @example
     * // Get one KnowledgeBaseItem
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KnowledgeBaseItemFindUniqueArgs>(args: SelectSubset<T, KnowledgeBaseItemFindUniqueArgs<ExtArgs>>): Prisma__KnowledgeBaseItemClient<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KnowledgeBaseItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KnowledgeBaseItemFindUniqueOrThrowArgs} args - Arguments to find a KnowledgeBaseItem
     * @example
     * // Get one KnowledgeBaseItem
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KnowledgeBaseItemFindUniqueOrThrowArgs>(args: SelectSubset<T, KnowledgeBaseItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KnowledgeBaseItemClient<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeBaseItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseItemFindFirstArgs} args - Arguments to find a KnowledgeBaseItem
     * @example
     * // Get one KnowledgeBaseItem
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KnowledgeBaseItemFindFirstArgs>(args?: SelectSubset<T, KnowledgeBaseItemFindFirstArgs<ExtArgs>>): Prisma__KnowledgeBaseItemClient<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeBaseItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseItemFindFirstOrThrowArgs} args - Arguments to find a KnowledgeBaseItem
     * @example
     * // Get one KnowledgeBaseItem
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KnowledgeBaseItemFindFirstOrThrowArgs>(args?: SelectSubset<T, KnowledgeBaseItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__KnowledgeBaseItemClient<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KnowledgeBaseItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KnowledgeBaseItems
     * const knowledgeBaseItems = await prisma.knowledgeBaseItem.findMany()
     * 
     * // Get first 10 KnowledgeBaseItems
     * const knowledgeBaseItems = await prisma.knowledgeBaseItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const knowledgeBaseItemWithIdOnly = await prisma.knowledgeBaseItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KnowledgeBaseItemFindManyArgs>(args?: SelectSubset<T, KnowledgeBaseItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KnowledgeBaseItem.
     * @param {KnowledgeBaseItemCreateArgs} args - Arguments to create a KnowledgeBaseItem.
     * @example
     * // Create one KnowledgeBaseItem
     * const KnowledgeBaseItem = await prisma.knowledgeBaseItem.create({
     *   data: {
     *     // ... data to create a KnowledgeBaseItem
     *   }
     * })
     * 
     */
    create<T extends KnowledgeBaseItemCreateArgs>(args: SelectSubset<T, KnowledgeBaseItemCreateArgs<ExtArgs>>): Prisma__KnowledgeBaseItemClient<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KnowledgeBaseItems.
     * @param {KnowledgeBaseItemCreateManyArgs} args - Arguments to create many KnowledgeBaseItems.
     * @example
     * // Create many KnowledgeBaseItems
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KnowledgeBaseItemCreateManyArgs>(args?: SelectSubset<T, KnowledgeBaseItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KnowledgeBaseItems and returns the data saved in the database.
     * @param {KnowledgeBaseItemCreateManyAndReturnArgs} args - Arguments to create many KnowledgeBaseItems.
     * @example
     * // Create many KnowledgeBaseItems
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KnowledgeBaseItems and only return the `id`
     * const knowledgeBaseItemWithIdOnly = await prisma.knowledgeBaseItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KnowledgeBaseItemCreateManyAndReturnArgs>(args?: SelectSubset<T, KnowledgeBaseItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KnowledgeBaseItem.
     * @param {KnowledgeBaseItemDeleteArgs} args - Arguments to delete one KnowledgeBaseItem.
     * @example
     * // Delete one KnowledgeBaseItem
     * const KnowledgeBaseItem = await prisma.knowledgeBaseItem.delete({
     *   where: {
     *     // ... filter to delete one KnowledgeBaseItem
     *   }
     * })
     * 
     */
    delete<T extends KnowledgeBaseItemDeleteArgs>(args: SelectSubset<T, KnowledgeBaseItemDeleteArgs<ExtArgs>>): Prisma__KnowledgeBaseItemClient<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KnowledgeBaseItem.
     * @param {KnowledgeBaseItemUpdateArgs} args - Arguments to update one KnowledgeBaseItem.
     * @example
     * // Update one KnowledgeBaseItem
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KnowledgeBaseItemUpdateArgs>(args: SelectSubset<T, KnowledgeBaseItemUpdateArgs<ExtArgs>>): Prisma__KnowledgeBaseItemClient<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KnowledgeBaseItems.
     * @param {KnowledgeBaseItemDeleteManyArgs} args - Arguments to filter KnowledgeBaseItems to delete.
     * @example
     * // Delete a few KnowledgeBaseItems
     * const { count } = await prisma.knowledgeBaseItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KnowledgeBaseItemDeleteManyArgs>(args?: SelectSubset<T, KnowledgeBaseItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeBaseItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KnowledgeBaseItems
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KnowledgeBaseItemUpdateManyArgs>(args: SelectSubset<T, KnowledgeBaseItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeBaseItems and returns the data updated in the database.
     * @param {KnowledgeBaseItemUpdateManyAndReturnArgs} args - Arguments to update many KnowledgeBaseItems.
     * @example
     * // Update many KnowledgeBaseItems
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KnowledgeBaseItems and only return the `id`
     * const knowledgeBaseItemWithIdOnly = await prisma.knowledgeBaseItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KnowledgeBaseItemUpdateManyAndReturnArgs>(args: SelectSubset<T, KnowledgeBaseItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KnowledgeBaseItem.
     * @param {KnowledgeBaseItemUpsertArgs} args - Arguments to update or create a KnowledgeBaseItem.
     * @example
     * // Update or create a KnowledgeBaseItem
     * const knowledgeBaseItem = await prisma.knowledgeBaseItem.upsert({
     *   create: {
     *     // ... data to create a KnowledgeBaseItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KnowledgeBaseItem we want to update
     *   }
     * })
     */
    upsert<T extends KnowledgeBaseItemUpsertArgs>(args: SelectSubset<T, KnowledgeBaseItemUpsertArgs<ExtArgs>>): Prisma__KnowledgeBaseItemClient<$Result.GetResult<Prisma.$KnowledgeBaseItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KnowledgeBaseItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseItemCountArgs} args - Arguments to filter KnowledgeBaseItems to count.
     * @example
     * // Count the number of KnowledgeBaseItems
     * const count = await prisma.knowledgeBaseItem.count({
     *   where: {
     *     // ... the filter for the KnowledgeBaseItems we want to count
     *   }
     * })
    **/
    count<T extends KnowledgeBaseItemCountArgs>(
      args?: Subset<T, KnowledgeBaseItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KnowledgeBaseItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KnowledgeBaseItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KnowledgeBaseItemAggregateArgs>(args: Subset<T, KnowledgeBaseItemAggregateArgs>): Prisma.PrismaPromise<GetKnowledgeBaseItemAggregateType<T>>

    /**
     * Group by KnowledgeBaseItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KnowledgeBaseItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KnowledgeBaseItemGroupByArgs['orderBy'] }
        : { orderBy?: KnowledgeBaseItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KnowledgeBaseItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnowledgeBaseItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KnowledgeBaseItem model
   */
  readonly fields: KnowledgeBaseItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KnowledgeBaseItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KnowledgeBaseItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KnowledgeBaseItem model
   */
  interface KnowledgeBaseItemFieldRefs {
    readonly id: FieldRef<"KnowledgeBaseItem", 'String'>
    readonly name: FieldRef<"KnowledgeBaseItem", 'String'>
    readonly type: FieldRef<"KnowledgeBaseItem", 'String'>
    readonly size: FieldRef<"KnowledgeBaseItem", 'Int'>
    readonly lastModified: FieldRef<"KnowledgeBaseItem", 'BigInt'>
    readonly text: FieldRef<"KnowledgeBaseItem", 'String'>
    readonly ocrText: FieldRef<"KnowledgeBaseItem", 'String'>
    readonly notes: FieldRef<"KnowledgeBaseItem", 'String'>
    readonly dataUrl: FieldRef<"KnowledgeBaseItem", 'String'>
    readonly include: FieldRef<"KnowledgeBaseItem", 'Boolean'>
    readonly createdAt: FieldRef<"KnowledgeBaseItem", 'DateTime'>
    readonly updatedAt: FieldRef<"KnowledgeBaseItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KnowledgeBaseItem findUnique
   */
  export type KnowledgeBaseItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBaseItem to fetch.
     */
    where: KnowledgeBaseItemWhereUniqueInput
  }

  /**
   * KnowledgeBaseItem findUniqueOrThrow
   */
  export type KnowledgeBaseItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBaseItem to fetch.
     */
    where: KnowledgeBaseItemWhereUniqueInput
  }

  /**
   * KnowledgeBaseItem findFirst
   */
  export type KnowledgeBaseItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBaseItem to fetch.
     */
    where?: KnowledgeBaseItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBaseItems to fetch.
     */
    orderBy?: KnowledgeBaseItemOrderByWithRelationInput | KnowledgeBaseItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeBaseItems.
     */
    cursor?: KnowledgeBaseItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBaseItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBaseItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeBaseItems.
     */
    distinct?: KnowledgeBaseItemScalarFieldEnum | KnowledgeBaseItemScalarFieldEnum[]
  }

  /**
   * KnowledgeBaseItem findFirstOrThrow
   */
  export type KnowledgeBaseItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBaseItem to fetch.
     */
    where?: KnowledgeBaseItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBaseItems to fetch.
     */
    orderBy?: KnowledgeBaseItemOrderByWithRelationInput | KnowledgeBaseItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeBaseItems.
     */
    cursor?: KnowledgeBaseItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBaseItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBaseItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeBaseItems.
     */
    distinct?: KnowledgeBaseItemScalarFieldEnum | KnowledgeBaseItemScalarFieldEnum[]
  }

  /**
   * KnowledgeBaseItem findMany
   */
  export type KnowledgeBaseItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBaseItems to fetch.
     */
    where?: KnowledgeBaseItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBaseItems to fetch.
     */
    orderBy?: KnowledgeBaseItemOrderByWithRelationInput | KnowledgeBaseItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KnowledgeBaseItems.
     */
    cursor?: KnowledgeBaseItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBaseItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBaseItems.
     */
    skip?: number
    distinct?: KnowledgeBaseItemScalarFieldEnum | KnowledgeBaseItemScalarFieldEnum[]
  }

  /**
   * KnowledgeBaseItem create
   */
  export type KnowledgeBaseItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * The data needed to create a KnowledgeBaseItem.
     */
    data: XOR<KnowledgeBaseItemCreateInput, KnowledgeBaseItemUncheckedCreateInput>
  }

  /**
   * KnowledgeBaseItem createMany
   */
  export type KnowledgeBaseItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KnowledgeBaseItems.
     */
    data: KnowledgeBaseItemCreateManyInput | KnowledgeBaseItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KnowledgeBaseItem createManyAndReturn
   */
  export type KnowledgeBaseItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * The data used to create many KnowledgeBaseItems.
     */
    data: KnowledgeBaseItemCreateManyInput | KnowledgeBaseItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KnowledgeBaseItem update
   */
  export type KnowledgeBaseItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * The data needed to update a KnowledgeBaseItem.
     */
    data: XOR<KnowledgeBaseItemUpdateInput, KnowledgeBaseItemUncheckedUpdateInput>
    /**
     * Choose, which KnowledgeBaseItem to update.
     */
    where: KnowledgeBaseItemWhereUniqueInput
  }

  /**
   * KnowledgeBaseItem updateMany
   */
  export type KnowledgeBaseItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KnowledgeBaseItems.
     */
    data: XOR<KnowledgeBaseItemUpdateManyMutationInput, KnowledgeBaseItemUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeBaseItems to update
     */
    where?: KnowledgeBaseItemWhereInput
    /**
     * Limit how many KnowledgeBaseItems to update.
     */
    limit?: number
  }

  /**
   * KnowledgeBaseItem updateManyAndReturn
   */
  export type KnowledgeBaseItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * The data used to update KnowledgeBaseItems.
     */
    data: XOR<KnowledgeBaseItemUpdateManyMutationInput, KnowledgeBaseItemUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeBaseItems to update
     */
    where?: KnowledgeBaseItemWhereInput
    /**
     * Limit how many KnowledgeBaseItems to update.
     */
    limit?: number
  }

  /**
   * KnowledgeBaseItem upsert
   */
  export type KnowledgeBaseItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * The filter to search for the KnowledgeBaseItem to update in case it exists.
     */
    where: KnowledgeBaseItemWhereUniqueInput
    /**
     * In case the KnowledgeBaseItem found by the `where` argument doesn't exist, create a new KnowledgeBaseItem with this data.
     */
    create: XOR<KnowledgeBaseItemCreateInput, KnowledgeBaseItemUncheckedCreateInput>
    /**
     * In case the KnowledgeBaseItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KnowledgeBaseItemUpdateInput, KnowledgeBaseItemUncheckedUpdateInput>
  }

  /**
   * KnowledgeBaseItem delete
   */
  export type KnowledgeBaseItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
    /**
     * Filter which KnowledgeBaseItem to delete.
     */
    where: KnowledgeBaseItemWhereUniqueInput
  }

  /**
   * KnowledgeBaseItem deleteMany
   */
  export type KnowledgeBaseItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeBaseItems to delete
     */
    where?: KnowledgeBaseItemWhereInput
    /**
     * Limit how many KnowledgeBaseItems to delete.
     */
    limit?: number
  }

  /**
   * KnowledgeBaseItem without action
   */
  export type KnowledgeBaseItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBaseItem
     */
    select?: KnowledgeBaseItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBaseItem
     */
    omit?: KnowledgeBaseItemOmit<ExtArgs> | null
  }


  /**
   * Model LearningSession
   */

  export type AggregateLearningSession = {
    _count: LearningSessionCountAggregateOutputType | null
    _avg: LearningSessionAvgAggregateOutputType | null
    _sum: LearningSessionSumAggregateOutputType | null
    _min: LearningSessionMinAggregateOutputType | null
    _max: LearningSessionMaxAggregateOutputType | null
  }

  export type LearningSessionAvgAggregateOutputType = {
    finalScore: number | null
  }

  export type LearningSessionSumAggregateOutputType = {
    finalScore: number | null
  }

  export type LearningSessionMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    subject: string | null
    topic: string | null
    aiExplanation: string | null
    currentStep: string | null
    isCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    feedback: string | null
    finalScore: number | null
    grade: string | null
    region: string | null
    reviewNotes: string | null
    aiSummary: string | null
  }

  export type LearningSessionMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    subject: string | null
    topic: string | null
    aiExplanation: string | null
    currentStep: string | null
    isCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    feedback: string | null
    finalScore: number | null
    grade: string | null
    region: string | null
    reviewNotes: string | null
    aiSummary: string | null
  }

  export type LearningSessionCountAggregateOutputType = {
    id: number
    conversationId: number
    subject: number
    topic: number
    aiExplanation: number
    socraticDialogue: number
    currentStep: number
    isCompleted: number
    createdAt: number
    updatedAt: number
    coachingHistory: number
    feedback: number
    finalScore: number
    grade: number
    region: number
    reviewNotes: number
    aiSummary: number
    _all: number
  }


  export type LearningSessionAvgAggregateInputType = {
    finalScore?: true
  }

  export type LearningSessionSumAggregateInputType = {
    finalScore?: true
  }

  export type LearningSessionMinAggregateInputType = {
    id?: true
    conversationId?: true
    subject?: true
    topic?: true
    aiExplanation?: true
    currentStep?: true
    isCompleted?: true
    createdAt?: true
    updatedAt?: true
    feedback?: true
    finalScore?: true
    grade?: true
    region?: true
    reviewNotes?: true
    aiSummary?: true
  }

  export type LearningSessionMaxAggregateInputType = {
    id?: true
    conversationId?: true
    subject?: true
    topic?: true
    aiExplanation?: true
    currentStep?: true
    isCompleted?: true
    createdAt?: true
    updatedAt?: true
    feedback?: true
    finalScore?: true
    grade?: true
    region?: true
    reviewNotes?: true
    aiSummary?: true
  }

  export type LearningSessionCountAggregateInputType = {
    id?: true
    conversationId?: true
    subject?: true
    topic?: true
    aiExplanation?: true
    socraticDialogue?: true
    currentStep?: true
    isCompleted?: true
    createdAt?: true
    updatedAt?: true
    coachingHistory?: true
    feedback?: true
    finalScore?: true
    grade?: true
    region?: true
    reviewNotes?: true
    aiSummary?: true
    _all?: true
  }

  export type LearningSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningSession to aggregate.
     */
    where?: LearningSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessions to fetch.
     */
    orderBy?: LearningSessionOrderByWithRelationInput | LearningSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningSessions
    **/
    _count?: true | LearningSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningSessionMaxAggregateInputType
  }

  export type GetLearningSessionAggregateType<T extends LearningSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningSession[P]>
      : GetScalarType<T[P], AggregateLearningSession[P]>
  }




  export type LearningSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningSessionWhereInput
    orderBy?: LearningSessionOrderByWithAggregationInput | LearningSessionOrderByWithAggregationInput[]
    by: LearningSessionScalarFieldEnum[] | LearningSessionScalarFieldEnum
    having?: LearningSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningSessionCountAggregateInputType | true
    _avg?: LearningSessionAvgAggregateInputType
    _sum?: LearningSessionSumAggregateInputType
    _min?: LearningSessionMinAggregateInputType
    _max?: LearningSessionMaxAggregateInputType
  }

  export type LearningSessionGroupByOutputType = {
    id: string
    conversationId: string
    subject: string
    topic: string
    aiExplanation: string | null
    socraticDialogue: JsonValue | null
    currentStep: string
    isCompleted: boolean
    createdAt: Date
    updatedAt: Date
    coachingHistory: JsonValue | null
    feedback: string | null
    finalScore: number | null
    grade: string | null
    region: string | null
    reviewNotes: string | null
    aiSummary: string | null
    _count: LearningSessionCountAggregateOutputType | null
    _avg: LearningSessionAvgAggregateOutputType | null
    _sum: LearningSessionSumAggregateOutputType | null
    _min: LearningSessionMinAggregateOutputType | null
    _max: LearningSessionMaxAggregateOutputType | null
  }

  type GetLearningSessionGroupByPayload<T extends LearningSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningSessionGroupByOutputType[P]>
            : GetScalarType<T[P], LearningSessionGroupByOutputType[P]>
        }
      >
    >


  export type LearningSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    subject?: boolean
    topic?: boolean
    aiExplanation?: boolean
    socraticDialogue?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coachingHistory?: boolean
    feedback?: boolean
    finalScore?: boolean
    grade?: boolean
    region?: boolean
    reviewNotes?: boolean
    aiSummary?: boolean
    quizQuestions?: boolean | LearningSession$quizQuestionsArgs<ExtArgs>
    userAnswers?: boolean | LearningSession$userAnswersArgs<ExtArgs>
    _count?: boolean | LearningSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningSession"]>

  export type LearningSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    subject?: boolean
    topic?: boolean
    aiExplanation?: boolean
    socraticDialogue?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coachingHistory?: boolean
    feedback?: boolean
    finalScore?: boolean
    grade?: boolean
    region?: boolean
    reviewNotes?: boolean
    aiSummary?: boolean
  }, ExtArgs["result"]["learningSession"]>

  export type LearningSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    subject?: boolean
    topic?: boolean
    aiExplanation?: boolean
    socraticDialogue?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coachingHistory?: boolean
    feedback?: boolean
    finalScore?: boolean
    grade?: boolean
    region?: boolean
    reviewNotes?: boolean
    aiSummary?: boolean
  }, ExtArgs["result"]["learningSession"]>

  export type LearningSessionSelectScalar = {
    id?: boolean
    conversationId?: boolean
    subject?: boolean
    topic?: boolean
    aiExplanation?: boolean
    socraticDialogue?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coachingHistory?: boolean
    feedback?: boolean
    finalScore?: boolean
    grade?: boolean
    region?: boolean
    reviewNotes?: boolean
    aiSummary?: boolean
  }

  export type LearningSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "subject" | "topic" | "aiExplanation" | "socraticDialogue" | "currentStep" | "isCompleted" | "createdAt" | "updatedAt" | "coachingHistory" | "feedback" | "finalScore" | "grade" | "region" | "reviewNotes" | "aiSummary", ExtArgs["result"]["learningSession"]>
  export type LearningSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quizQuestions?: boolean | LearningSession$quizQuestionsArgs<ExtArgs>
    userAnswers?: boolean | LearningSession$userAnswersArgs<ExtArgs>
    _count?: boolean | LearningSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LearningSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LearningSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LearningSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningSession"
    objects: {
      quizQuestions: Prisma.$QuizQuestionPayload<ExtArgs>[]
      userAnswers: Prisma.$UserAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      subject: string
      topic: string
      aiExplanation: string | null
      socraticDialogue: Prisma.JsonValue | null
      currentStep: string
      isCompleted: boolean
      createdAt: Date
      updatedAt: Date
      coachingHistory: Prisma.JsonValue | null
      feedback: string | null
      finalScore: number | null
      grade: string | null
      region: string | null
      reviewNotes: string | null
      aiSummary: string | null
    }, ExtArgs["result"]["learningSession"]>
    composites: {}
  }

  type LearningSessionGetPayload<S extends boolean | null | undefined | LearningSessionDefaultArgs> = $Result.GetResult<Prisma.$LearningSessionPayload, S>

  type LearningSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningSessionCountAggregateInputType | true
    }

  export interface LearningSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningSession'], meta: { name: 'LearningSession' } }
    /**
     * Find zero or one LearningSession that matches the filter.
     * @param {LearningSessionFindUniqueArgs} args - Arguments to find a LearningSession
     * @example
     * // Get one LearningSession
     * const learningSession = await prisma.learningSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningSessionFindUniqueArgs>(args: SelectSubset<T, LearningSessionFindUniqueArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningSessionFindUniqueOrThrowArgs} args - Arguments to find a LearningSession
     * @example
     * // Get one LearningSession
     * const learningSession = await prisma.learningSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionFindFirstArgs} args - Arguments to find a LearningSession
     * @example
     * // Get one LearningSession
     * const learningSession = await prisma.learningSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningSessionFindFirstArgs>(args?: SelectSubset<T, LearningSessionFindFirstArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionFindFirstOrThrowArgs} args - Arguments to find a LearningSession
     * @example
     * // Get one LearningSession
     * const learningSession = await prisma.learningSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningSessions
     * const learningSessions = await prisma.learningSession.findMany()
     * 
     * // Get first 10 LearningSessions
     * const learningSessions = await prisma.learningSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningSessionWithIdOnly = await prisma.learningSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningSessionFindManyArgs>(args?: SelectSubset<T, LearningSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningSession.
     * @param {LearningSessionCreateArgs} args - Arguments to create a LearningSession.
     * @example
     * // Create one LearningSession
     * const LearningSession = await prisma.learningSession.create({
     *   data: {
     *     // ... data to create a LearningSession
     *   }
     * })
     * 
     */
    create<T extends LearningSessionCreateArgs>(args: SelectSubset<T, LearningSessionCreateArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningSessions.
     * @param {LearningSessionCreateManyArgs} args - Arguments to create many LearningSessions.
     * @example
     * // Create many LearningSessions
     * const learningSession = await prisma.learningSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningSessionCreateManyArgs>(args?: SelectSubset<T, LearningSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningSessions and returns the data saved in the database.
     * @param {LearningSessionCreateManyAndReturnArgs} args - Arguments to create many LearningSessions.
     * @example
     * // Create many LearningSessions
     * const learningSession = await prisma.learningSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningSessions and only return the `id`
     * const learningSessionWithIdOnly = await prisma.learningSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningSession.
     * @param {LearningSessionDeleteArgs} args - Arguments to delete one LearningSession.
     * @example
     * // Delete one LearningSession
     * const LearningSession = await prisma.learningSession.delete({
     *   where: {
     *     // ... filter to delete one LearningSession
     *   }
     * })
     * 
     */
    delete<T extends LearningSessionDeleteArgs>(args: SelectSubset<T, LearningSessionDeleteArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningSession.
     * @param {LearningSessionUpdateArgs} args - Arguments to update one LearningSession.
     * @example
     * // Update one LearningSession
     * const learningSession = await prisma.learningSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningSessionUpdateArgs>(args: SelectSubset<T, LearningSessionUpdateArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningSessions.
     * @param {LearningSessionDeleteManyArgs} args - Arguments to filter LearningSessions to delete.
     * @example
     * // Delete a few LearningSessions
     * const { count } = await prisma.learningSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningSessionDeleteManyArgs>(args?: SelectSubset<T, LearningSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningSessions
     * const learningSession = await prisma.learningSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningSessionUpdateManyArgs>(args: SelectSubset<T, LearningSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningSessions and returns the data updated in the database.
     * @param {LearningSessionUpdateManyAndReturnArgs} args - Arguments to update many LearningSessions.
     * @example
     * // Update many LearningSessions
     * const learningSession = await prisma.learningSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningSessions and only return the `id`
     * const learningSessionWithIdOnly = await prisma.learningSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningSession.
     * @param {LearningSessionUpsertArgs} args - Arguments to update or create a LearningSession.
     * @example
     * // Update or create a LearningSession
     * const learningSession = await prisma.learningSession.upsert({
     *   create: {
     *     // ... data to create a LearningSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningSession we want to update
     *   }
     * })
     */
    upsert<T extends LearningSessionUpsertArgs>(args: SelectSubset<T, LearningSessionUpsertArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionCountArgs} args - Arguments to filter LearningSessions to count.
     * @example
     * // Count the number of LearningSessions
     * const count = await prisma.learningSession.count({
     *   where: {
     *     // ... the filter for the LearningSessions we want to count
     *   }
     * })
    **/
    count<T extends LearningSessionCountArgs>(
      args?: Subset<T, LearningSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningSessionAggregateArgs>(args: Subset<T, LearningSessionAggregateArgs>): Prisma.PrismaPromise<GetLearningSessionAggregateType<T>>

    /**
     * Group by LearningSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningSessionGroupByArgs['orderBy'] }
        : { orderBy?: LearningSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningSession model
   */
  readonly fields: LearningSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quizQuestions<T extends LearningSession$quizQuestionsArgs<ExtArgs> = {}>(args?: Subset<T, LearningSession$quizQuestionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userAnswers<T extends LearningSession$userAnswersArgs<ExtArgs> = {}>(args?: Subset<T, LearningSession$userAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningSession model
   */
  interface LearningSessionFieldRefs {
    readonly id: FieldRef<"LearningSession", 'String'>
    readonly conversationId: FieldRef<"LearningSession", 'String'>
    readonly subject: FieldRef<"LearningSession", 'String'>
    readonly topic: FieldRef<"LearningSession", 'String'>
    readonly aiExplanation: FieldRef<"LearningSession", 'String'>
    readonly socraticDialogue: FieldRef<"LearningSession", 'Json'>
    readonly currentStep: FieldRef<"LearningSession", 'String'>
    readonly isCompleted: FieldRef<"LearningSession", 'Boolean'>
    readonly createdAt: FieldRef<"LearningSession", 'DateTime'>
    readonly updatedAt: FieldRef<"LearningSession", 'DateTime'>
    readonly coachingHistory: FieldRef<"LearningSession", 'Json'>
    readonly feedback: FieldRef<"LearningSession", 'String'>
    readonly finalScore: FieldRef<"LearningSession", 'Int'>
    readonly grade: FieldRef<"LearningSession", 'String'>
    readonly region: FieldRef<"LearningSession", 'String'>
    readonly reviewNotes: FieldRef<"LearningSession", 'String'>
    readonly aiSummary: FieldRef<"LearningSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LearningSession findUnique
   */
  export type LearningSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
    /**
     * Filter, which LearningSession to fetch.
     */
    where: LearningSessionWhereUniqueInput
  }

  /**
   * LearningSession findUniqueOrThrow
   */
  export type LearningSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
    /**
     * Filter, which LearningSession to fetch.
     */
    where: LearningSessionWhereUniqueInput
  }

  /**
   * LearningSession findFirst
   */
  export type LearningSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
    /**
     * Filter, which LearningSession to fetch.
     */
    where?: LearningSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessions to fetch.
     */
    orderBy?: LearningSessionOrderByWithRelationInput | LearningSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningSessions.
     */
    cursor?: LearningSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningSessions.
     */
    distinct?: LearningSessionScalarFieldEnum | LearningSessionScalarFieldEnum[]
  }

  /**
   * LearningSession findFirstOrThrow
   */
  export type LearningSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
    /**
     * Filter, which LearningSession to fetch.
     */
    where?: LearningSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessions to fetch.
     */
    orderBy?: LearningSessionOrderByWithRelationInput | LearningSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningSessions.
     */
    cursor?: LearningSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningSessions.
     */
    distinct?: LearningSessionScalarFieldEnum | LearningSessionScalarFieldEnum[]
  }

  /**
   * LearningSession findMany
   */
  export type LearningSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessions to fetch.
     */
    where?: LearningSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessions to fetch.
     */
    orderBy?: LearningSessionOrderByWithRelationInput | LearningSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningSessions.
     */
    cursor?: LearningSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessions.
     */
    skip?: number
    distinct?: LearningSessionScalarFieldEnum | LearningSessionScalarFieldEnum[]
  }

  /**
   * LearningSession create
   */
  export type LearningSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningSession.
     */
    data: XOR<LearningSessionCreateInput, LearningSessionUncheckedCreateInput>
  }

  /**
   * LearningSession createMany
   */
  export type LearningSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningSessions.
     */
    data: LearningSessionCreateManyInput | LearningSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningSession createManyAndReturn
   */
  export type LearningSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * The data used to create many LearningSessions.
     */
    data: LearningSessionCreateManyInput | LearningSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningSession update
   */
  export type LearningSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningSession.
     */
    data: XOR<LearningSessionUpdateInput, LearningSessionUncheckedUpdateInput>
    /**
     * Choose, which LearningSession to update.
     */
    where: LearningSessionWhereUniqueInput
  }

  /**
   * LearningSession updateMany
   */
  export type LearningSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningSessions.
     */
    data: XOR<LearningSessionUpdateManyMutationInput, LearningSessionUncheckedUpdateManyInput>
    /**
     * Filter which LearningSessions to update
     */
    where?: LearningSessionWhereInput
    /**
     * Limit how many LearningSessions to update.
     */
    limit?: number
  }

  /**
   * LearningSession updateManyAndReturn
   */
  export type LearningSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * The data used to update LearningSessions.
     */
    data: XOR<LearningSessionUpdateManyMutationInput, LearningSessionUncheckedUpdateManyInput>
    /**
     * Filter which LearningSessions to update
     */
    where?: LearningSessionWhereInput
    /**
     * Limit how many LearningSessions to update.
     */
    limit?: number
  }

  /**
   * LearningSession upsert
   */
  export type LearningSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningSession to update in case it exists.
     */
    where: LearningSessionWhereUniqueInput
    /**
     * In case the LearningSession found by the `where` argument doesn't exist, create a new LearningSession with this data.
     */
    create: XOR<LearningSessionCreateInput, LearningSessionUncheckedCreateInput>
    /**
     * In case the LearningSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningSessionUpdateInput, LearningSessionUncheckedUpdateInput>
  }

  /**
   * LearningSession delete
   */
  export type LearningSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
    /**
     * Filter which LearningSession to delete.
     */
    where: LearningSessionWhereUniqueInput
  }

  /**
   * LearningSession deleteMany
   */
  export type LearningSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningSessions to delete
     */
    where?: LearningSessionWhereInput
    /**
     * Limit how many LearningSessions to delete.
     */
    limit?: number
  }

  /**
   * LearningSession.quizQuestions
   */
  export type LearningSession$quizQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    where?: QuizQuestionWhereInput
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    cursor?: QuizQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * LearningSession.userAnswers
   */
  export type LearningSession$userAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    cursor?: UserAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * LearningSession without action
   */
  export type LearningSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSession
     */
    select?: LearningSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSession
     */
    omit?: LearningSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionInclude<ExtArgs> | null
  }


  /**
   * Model QuizQuestion
   */

  export type AggregateQuizQuestion = {
    _count: QuizQuestionCountAggregateOutputType | null
    _avg: QuizQuestionAvgAggregateOutputType | null
    _sum: QuizQuestionSumAggregateOutputType | null
    _min: QuizQuestionMinAggregateOutputType | null
    _max: QuizQuestionMaxAggregateOutputType | null
  }

  export type QuizQuestionAvgAggregateOutputType = {
    points: number | null
    order: number | null
  }

  export type QuizQuestionSumAggregateOutputType = {
    points: number | null
    order: number | null
  }

  export type QuizQuestionMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    question: string | null
    type: string | null
    correctAnswer: string | null
    explanation: string | null
    difficulty: string | null
    points: number | null
    order: number | null
    createdAt: Date | null
  }

  export type QuizQuestionMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    question: string | null
    type: string | null
    correctAnswer: string | null
    explanation: string | null
    difficulty: string | null
    points: number | null
    order: number | null
    createdAt: Date | null
  }

  export type QuizQuestionCountAggregateOutputType = {
    id: number
    sessionId: number
    question: number
    type: number
    options: number
    correctAnswer: number
    explanation: number
    difficulty: number
    points: number
    order: number
    createdAt: number
    _all: number
  }


  export type QuizQuestionAvgAggregateInputType = {
    points?: true
    order?: true
  }

  export type QuizQuestionSumAggregateInputType = {
    points?: true
    order?: true
  }

  export type QuizQuestionMinAggregateInputType = {
    id?: true
    sessionId?: true
    question?: true
    type?: true
    correctAnswer?: true
    explanation?: true
    difficulty?: true
    points?: true
    order?: true
    createdAt?: true
  }

  export type QuizQuestionMaxAggregateInputType = {
    id?: true
    sessionId?: true
    question?: true
    type?: true
    correctAnswer?: true
    explanation?: true
    difficulty?: true
    points?: true
    order?: true
    createdAt?: true
  }

  export type QuizQuestionCountAggregateInputType = {
    id?: true
    sessionId?: true
    question?: true
    type?: true
    options?: true
    correctAnswer?: true
    explanation?: true
    difficulty?: true
    points?: true
    order?: true
    createdAt?: true
    _all?: true
  }

  export type QuizQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizQuestion to aggregate.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizQuestions
    **/
    _count?: true | QuizQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizQuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizQuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizQuestionMaxAggregateInputType
  }

  export type GetQuizQuestionAggregateType<T extends QuizQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizQuestion[P]>
      : GetScalarType<T[P], AggregateQuizQuestion[P]>
  }




  export type QuizQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizQuestionWhereInput
    orderBy?: QuizQuestionOrderByWithAggregationInput | QuizQuestionOrderByWithAggregationInput[]
    by: QuizQuestionScalarFieldEnum[] | QuizQuestionScalarFieldEnum
    having?: QuizQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizQuestionCountAggregateInputType | true
    _avg?: QuizQuestionAvgAggregateInputType
    _sum?: QuizQuestionSumAggregateInputType
    _min?: QuizQuestionMinAggregateInputType
    _max?: QuizQuestionMaxAggregateInputType
  }

  export type QuizQuestionGroupByOutputType = {
    id: string
    sessionId: string
    question: string
    type: string
    options: JsonValue | null
    correctAnswer: string
    explanation: string | null
    difficulty: string
    points: number
    order: number
    createdAt: Date
    _count: QuizQuestionCountAggregateOutputType | null
    _avg: QuizQuestionAvgAggregateOutputType | null
    _sum: QuizQuestionSumAggregateOutputType | null
    _min: QuizQuestionMinAggregateOutputType | null
    _max: QuizQuestionMaxAggregateOutputType | null
  }

  type GetQuizQuestionGroupByPayload<T extends QuizQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuizQuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuizQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    question?: boolean
    type?: boolean
    options?: boolean
    correctAnswer?: boolean
    explanation?: boolean
    difficulty?: boolean
    points?: boolean
    order?: boolean
    createdAt?: boolean
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
    userAnswers?: boolean | QuizQuestion$userAnswersArgs<ExtArgs>
    _count?: boolean | QuizQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    question?: boolean
    type?: boolean
    options?: boolean
    correctAnswer?: boolean
    explanation?: boolean
    difficulty?: boolean
    points?: boolean
    order?: boolean
    createdAt?: boolean
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    question?: boolean
    type?: boolean
    options?: boolean
    correctAnswer?: boolean
    explanation?: boolean
    difficulty?: boolean
    points?: boolean
    order?: boolean
    createdAt?: boolean
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectScalar = {
    id?: boolean
    sessionId?: boolean
    question?: boolean
    type?: boolean
    options?: boolean
    correctAnswer?: boolean
    explanation?: boolean
    difficulty?: boolean
    points?: boolean
    order?: boolean
    createdAt?: boolean
  }

  export type QuizQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "question" | "type" | "options" | "correctAnswer" | "explanation" | "difficulty" | "points" | "order" | "createdAt", ExtArgs["result"]["quizQuestion"]>
  export type QuizQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
    userAnswers?: boolean | QuizQuestion$userAnswersArgs<ExtArgs>
    _count?: boolean | QuizQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuizQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }
  export type QuizQuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }

  export type $QuizQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizQuestion"
    objects: {
      session: Prisma.$LearningSessionPayload<ExtArgs>
      userAnswers: Prisma.$UserAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      question: string
      type: string
      options: Prisma.JsonValue | null
      correctAnswer: string
      explanation: string | null
      difficulty: string
      points: number
      order: number
      createdAt: Date
    }, ExtArgs["result"]["quizQuestion"]>
    composites: {}
  }

  type QuizQuestionGetPayload<S extends boolean | null | undefined | QuizQuestionDefaultArgs> = $Result.GetResult<Prisma.$QuizQuestionPayload, S>

  type QuizQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizQuestionCountAggregateInputType | true
    }

  export interface QuizQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizQuestion'], meta: { name: 'QuizQuestion' } }
    /**
     * Find zero or one QuizQuestion that matches the filter.
     * @param {QuizQuestionFindUniqueArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizQuestionFindUniqueArgs>(args: SelectSubset<T, QuizQuestionFindUniqueArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizQuestionFindUniqueOrThrowArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindFirstArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizQuestionFindFirstArgs>(args?: SelectSubset<T, QuizQuestionFindFirstArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindFirstOrThrowArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizQuestions
     * const quizQuestions = await prisma.quizQuestion.findMany()
     * 
     * // Get first 10 QuizQuestions
     * const quizQuestions = await prisma.quizQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizQuestionFindManyArgs>(args?: SelectSubset<T, QuizQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizQuestion.
     * @param {QuizQuestionCreateArgs} args - Arguments to create a QuizQuestion.
     * @example
     * // Create one QuizQuestion
     * const QuizQuestion = await prisma.quizQuestion.create({
     *   data: {
     *     // ... data to create a QuizQuestion
     *   }
     * })
     * 
     */
    create<T extends QuizQuestionCreateArgs>(args: SelectSubset<T, QuizQuestionCreateArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizQuestions.
     * @param {QuizQuestionCreateManyArgs} args - Arguments to create many QuizQuestions.
     * @example
     * // Create many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizQuestionCreateManyArgs>(args?: SelectSubset<T, QuizQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizQuestions and returns the data saved in the database.
     * @param {QuizQuestionCreateManyAndReturnArgs} args - Arguments to create many QuizQuestions.
     * @example
     * // Create many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizQuestions and only return the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizQuestion.
     * @param {QuizQuestionDeleteArgs} args - Arguments to delete one QuizQuestion.
     * @example
     * // Delete one QuizQuestion
     * const QuizQuestion = await prisma.quizQuestion.delete({
     *   where: {
     *     // ... filter to delete one QuizQuestion
     *   }
     * })
     * 
     */
    delete<T extends QuizQuestionDeleteArgs>(args: SelectSubset<T, QuizQuestionDeleteArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizQuestion.
     * @param {QuizQuestionUpdateArgs} args - Arguments to update one QuizQuestion.
     * @example
     * // Update one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizQuestionUpdateArgs>(args: SelectSubset<T, QuizQuestionUpdateArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizQuestions.
     * @param {QuizQuestionDeleteManyArgs} args - Arguments to filter QuizQuestions to delete.
     * @example
     * // Delete a few QuizQuestions
     * const { count } = await prisma.quizQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizQuestionDeleteManyArgs>(args?: SelectSubset<T, QuizQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizQuestionUpdateManyArgs>(args: SelectSubset<T, QuizQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizQuestions and returns the data updated in the database.
     * @param {QuizQuestionUpdateManyAndReturnArgs} args - Arguments to update many QuizQuestions.
     * @example
     * // Update many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizQuestions and only return the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuizQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizQuestion.
     * @param {QuizQuestionUpsertArgs} args - Arguments to update or create a QuizQuestion.
     * @example
     * // Update or create a QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.upsert({
     *   create: {
     *     // ... data to create a QuizQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizQuestion we want to update
     *   }
     * })
     */
    upsert<T extends QuizQuestionUpsertArgs>(args: SelectSubset<T, QuizQuestionUpsertArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionCountArgs} args - Arguments to filter QuizQuestions to count.
     * @example
     * // Count the number of QuizQuestions
     * const count = await prisma.quizQuestion.count({
     *   where: {
     *     // ... the filter for the QuizQuestions we want to count
     *   }
     * })
    **/
    count<T extends QuizQuestionCountArgs>(
      args?: Subset<T, QuizQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizQuestionAggregateArgs>(args: Subset<T, QuizQuestionAggregateArgs>): Prisma.PrismaPromise<GetQuizQuestionAggregateType<T>>

    /**
     * Group by QuizQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizQuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuizQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizQuestion model
   */
  readonly fields: QuizQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends LearningSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionDefaultArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userAnswers<T extends QuizQuestion$userAnswersArgs<ExtArgs> = {}>(args?: Subset<T, QuizQuestion$userAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuizQuestion model
   */
  interface QuizQuestionFieldRefs {
    readonly id: FieldRef<"QuizQuestion", 'String'>
    readonly sessionId: FieldRef<"QuizQuestion", 'String'>
    readonly question: FieldRef<"QuizQuestion", 'String'>
    readonly type: FieldRef<"QuizQuestion", 'String'>
    readonly options: FieldRef<"QuizQuestion", 'Json'>
    readonly correctAnswer: FieldRef<"QuizQuestion", 'String'>
    readonly explanation: FieldRef<"QuizQuestion", 'String'>
    readonly difficulty: FieldRef<"QuizQuestion", 'String'>
    readonly points: FieldRef<"QuizQuestion", 'Int'>
    readonly order: FieldRef<"QuizQuestion", 'Int'>
    readonly createdAt: FieldRef<"QuizQuestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuizQuestion findUnique
   */
  export type QuizQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion findUniqueOrThrow
   */
  export type QuizQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion findFirst
   */
  export type QuizQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizQuestions.
     */
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion findFirstOrThrow
   */
  export type QuizQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizQuestions.
     */
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion findMany
   */
  export type QuizQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestions to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion create
   */
  export type QuizQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizQuestion.
     */
    data: XOR<QuizQuestionCreateInput, QuizQuestionUncheckedCreateInput>
  }

  /**
   * QuizQuestion createMany
   */
  export type QuizQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizQuestions.
     */
    data: QuizQuestionCreateManyInput | QuizQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizQuestion createManyAndReturn
   */
  export type QuizQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many QuizQuestions.
     */
    data: QuizQuestionCreateManyInput | QuizQuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizQuestion update
   */
  export type QuizQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizQuestion.
     */
    data: XOR<QuizQuestionUpdateInput, QuizQuestionUncheckedUpdateInput>
    /**
     * Choose, which QuizQuestion to update.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion updateMany
   */
  export type QuizQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizQuestions.
     */
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyInput>
    /**
     * Filter which QuizQuestions to update
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to update.
     */
    limit?: number
  }

  /**
   * QuizQuestion updateManyAndReturn
   */
  export type QuizQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * The data used to update QuizQuestions.
     */
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyInput>
    /**
     * Filter which QuizQuestions to update
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizQuestion upsert
   */
  export type QuizQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizQuestion to update in case it exists.
     */
    where: QuizQuestionWhereUniqueInput
    /**
     * In case the QuizQuestion found by the `where` argument doesn't exist, create a new QuizQuestion with this data.
     */
    create: XOR<QuizQuestionCreateInput, QuizQuestionUncheckedCreateInput>
    /**
     * In case the QuizQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizQuestionUpdateInput, QuizQuestionUncheckedUpdateInput>
  }

  /**
   * QuizQuestion delete
   */
  export type QuizQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter which QuizQuestion to delete.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion deleteMany
   */
  export type QuizQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizQuestions to delete
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to delete.
     */
    limit?: number
  }

  /**
   * QuizQuestion.userAnswers
   */
  export type QuizQuestion$userAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    cursor?: UserAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * QuizQuestion without action
   */
  export type QuizQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
  }


  /**
   * Model UserAnswer
   */

  export type AggregateUserAnswer = {
    _count: UserAnswerCountAggregateOutputType | null
    _avg: UserAnswerAvgAggregateOutputType | null
    _sum: UserAnswerSumAggregateOutputType | null
    _min: UserAnswerMinAggregateOutputType | null
    _max: UserAnswerMaxAggregateOutputType | null
  }

  export type UserAnswerAvgAggregateOutputType = {
    score: number | null
    timeSpent: number | null
  }

  export type UserAnswerSumAggregateOutputType = {
    score: number | null
    timeSpent: number | null
  }

  export type UserAnswerMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    questionId: string | null
    userAnswer: string | null
    isCorrect: boolean | null
    score: number | null
    timeSpent: number | null
    answeredAt: Date | null
  }

  export type UserAnswerMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    questionId: string | null
    userAnswer: string | null
    isCorrect: boolean | null
    score: number | null
    timeSpent: number | null
    answeredAt: Date | null
  }

  export type UserAnswerCountAggregateOutputType = {
    id: number
    sessionId: number
    questionId: number
    userAnswer: number
    isCorrect: number
    score: number
    timeSpent: number
    answeredAt: number
    _all: number
  }


  export type UserAnswerAvgAggregateInputType = {
    score?: true
    timeSpent?: true
  }

  export type UserAnswerSumAggregateInputType = {
    score?: true
    timeSpent?: true
  }

  export type UserAnswerMinAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    userAnswer?: true
    isCorrect?: true
    score?: true
    timeSpent?: true
    answeredAt?: true
  }

  export type UserAnswerMaxAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    userAnswer?: true
    isCorrect?: true
    score?: true
    timeSpent?: true
    answeredAt?: true
  }

  export type UserAnswerCountAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    userAnswer?: true
    isCorrect?: true
    score?: true
    timeSpent?: true
    answeredAt?: true
    _all?: true
  }

  export type UserAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAnswer to aggregate.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAnswers
    **/
    _count?: true | UserAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAnswerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserAnswerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAnswerMaxAggregateInputType
  }

  export type GetUserAnswerAggregateType<T extends UserAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAnswer[P]>
      : GetScalarType<T[P], AggregateUserAnswer[P]>
  }




  export type UserAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithAggregationInput | UserAnswerOrderByWithAggregationInput[]
    by: UserAnswerScalarFieldEnum[] | UserAnswerScalarFieldEnum
    having?: UserAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAnswerCountAggregateInputType | true
    _avg?: UserAnswerAvgAggregateInputType
    _sum?: UserAnswerSumAggregateInputType
    _min?: UserAnswerMinAggregateInputType
    _max?: UserAnswerMaxAggregateInputType
  }

  export type UserAnswerGroupByOutputType = {
    id: string
    sessionId: string
    questionId: string
    userAnswer: string
    isCorrect: boolean
    score: number
    timeSpent: number | null
    answeredAt: Date
    _count: UserAnswerCountAggregateOutputType | null
    _avg: UserAnswerAvgAggregateOutputType | null
    _sum: UserAnswerSumAggregateOutputType | null
    _min: UserAnswerMinAggregateOutputType | null
    _max: UserAnswerMaxAggregateOutputType | null
  }

  type GetUserAnswerGroupByPayload<T extends UserAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], UserAnswerGroupByOutputType[P]>
        }
      >
    >


  export type UserAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    userAnswer?: boolean
    isCorrect?: boolean
    score?: boolean
    timeSpent?: boolean
    answeredAt?: boolean
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAnswer"]>

  export type UserAnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    userAnswer?: boolean
    isCorrect?: boolean
    score?: boolean
    timeSpent?: boolean
    answeredAt?: boolean
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAnswer"]>

  export type UserAnswerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    userAnswer?: boolean
    isCorrect?: boolean
    score?: boolean
    timeSpent?: boolean
    answeredAt?: boolean
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAnswer"]>

  export type UserAnswerSelectScalar = {
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    userAnswer?: boolean
    isCorrect?: boolean
    score?: boolean
    timeSpent?: boolean
    answeredAt?: boolean
  }

  export type UserAnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "questionId" | "userAnswer" | "isCorrect" | "score" | "timeSpent" | "answeredAt", ExtArgs["result"]["userAnswer"]>
  export type UserAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }
  export type UserAnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }
  export type UserAnswerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
    session?: boolean | LearningSessionDefaultArgs<ExtArgs>
  }

  export type $UserAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAnswer"
    objects: {
      question: Prisma.$QuizQuestionPayload<ExtArgs>
      session: Prisma.$LearningSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      questionId: string
      userAnswer: string
      isCorrect: boolean
      score: number
      timeSpent: number | null
      answeredAt: Date
    }, ExtArgs["result"]["userAnswer"]>
    composites: {}
  }

  type UserAnswerGetPayload<S extends boolean | null | undefined | UserAnswerDefaultArgs> = $Result.GetResult<Prisma.$UserAnswerPayload, S>

  type UserAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAnswerCountAggregateInputType | true
    }

  export interface UserAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAnswer'], meta: { name: 'UserAnswer' } }
    /**
     * Find zero or one UserAnswer that matches the filter.
     * @param {UserAnswerFindUniqueArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAnswerFindUniqueArgs>(args: SelectSubset<T, UserAnswerFindUniqueArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAnswer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAnswerFindUniqueOrThrowArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerFindFirstArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAnswerFindFirstArgs>(args?: SelectSubset<T, UserAnswerFindFirstArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerFindFirstOrThrowArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAnswers
     * const userAnswers = await prisma.userAnswer.findMany()
     * 
     * // Get first 10 UserAnswers
     * const userAnswers = await prisma.userAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAnswerWithIdOnly = await prisma.userAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAnswerFindManyArgs>(args?: SelectSubset<T, UserAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAnswer.
     * @param {UserAnswerCreateArgs} args - Arguments to create a UserAnswer.
     * @example
     * // Create one UserAnswer
     * const UserAnswer = await prisma.userAnswer.create({
     *   data: {
     *     // ... data to create a UserAnswer
     *   }
     * })
     * 
     */
    create<T extends UserAnswerCreateArgs>(args: SelectSubset<T, UserAnswerCreateArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserAnswers.
     * @param {UserAnswerCreateManyArgs} args - Arguments to create many UserAnswers.
     * @example
     * // Create many UserAnswers
     * const userAnswer = await prisma.userAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAnswerCreateManyArgs>(args?: SelectSubset<T, UserAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAnswers and returns the data saved in the database.
     * @param {UserAnswerCreateManyAndReturnArgs} args - Arguments to create many UserAnswers.
     * @example
     * // Create many UserAnswers
     * const userAnswer = await prisma.userAnswer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAnswers and only return the `id`
     * const userAnswerWithIdOnly = await prisma.userAnswer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserAnswer.
     * @param {UserAnswerDeleteArgs} args - Arguments to delete one UserAnswer.
     * @example
     * // Delete one UserAnswer
     * const UserAnswer = await prisma.userAnswer.delete({
     *   where: {
     *     // ... filter to delete one UserAnswer
     *   }
     * })
     * 
     */
    delete<T extends UserAnswerDeleteArgs>(args: SelectSubset<T, UserAnswerDeleteArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAnswer.
     * @param {UserAnswerUpdateArgs} args - Arguments to update one UserAnswer.
     * @example
     * // Update one UserAnswer
     * const userAnswer = await prisma.userAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAnswerUpdateArgs>(args: SelectSubset<T, UserAnswerUpdateArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserAnswers.
     * @param {UserAnswerDeleteManyArgs} args - Arguments to filter UserAnswers to delete.
     * @example
     * // Delete a few UserAnswers
     * const { count } = await prisma.userAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAnswerDeleteManyArgs>(args?: SelectSubset<T, UserAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAnswers
     * const userAnswer = await prisma.userAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAnswerUpdateManyArgs>(args: SelectSubset<T, UserAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAnswers and returns the data updated in the database.
     * @param {UserAnswerUpdateManyAndReturnArgs} args - Arguments to update many UserAnswers.
     * @example
     * // Update many UserAnswers
     * const userAnswer = await prisma.userAnswer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserAnswers and only return the `id`
     * const userAnswerWithIdOnly = await prisma.userAnswer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserAnswerUpdateManyAndReturnArgs>(args: SelectSubset<T, UserAnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserAnswer.
     * @param {UserAnswerUpsertArgs} args - Arguments to update or create a UserAnswer.
     * @example
     * // Update or create a UserAnswer
     * const userAnswer = await prisma.userAnswer.upsert({
     *   create: {
     *     // ... data to create a UserAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAnswer we want to update
     *   }
     * })
     */
    upsert<T extends UserAnswerUpsertArgs>(args: SelectSubset<T, UserAnswerUpsertArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerCountArgs} args - Arguments to filter UserAnswers to count.
     * @example
     * // Count the number of UserAnswers
     * const count = await prisma.userAnswer.count({
     *   where: {
     *     // ... the filter for the UserAnswers we want to count
     *   }
     * })
    **/
    count<T extends UserAnswerCountArgs>(
      args?: Subset<T, UserAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAnswerAggregateArgs>(args: Subset<T, UserAnswerAggregateArgs>): Prisma.PrismaPromise<GetUserAnswerAggregateType<T>>

    /**
     * Group by UserAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAnswerGroupByArgs['orderBy'] }
        : { orderBy?: UserAnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAnswer model
   */
  readonly fields: UserAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question<T extends QuizQuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizQuestionDefaultArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    session<T extends LearningSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionDefaultArgs<ExtArgs>>): Prisma__LearningSessionClient<$Result.GetResult<Prisma.$LearningSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserAnswer model
   */
  interface UserAnswerFieldRefs {
    readonly id: FieldRef<"UserAnswer", 'String'>
    readonly sessionId: FieldRef<"UserAnswer", 'String'>
    readonly questionId: FieldRef<"UserAnswer", 'String'>
    readonly userAnswer: FieldRef<"UserAnswer", 'String'>
    readonly isCorrect: FieldRef<"UserAnswer", 'Boolean'>
    readonly score: FieldRef<"UserAnswer", 'Int'>
    readonly timeSpent: FieldRef<"UserAnswer", 'Int'>
    readonly answeredAt: FieldRef<"UserAnswer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserAnswer findUnique
   */
  export type UserAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer findUniqueOrThrow
   */
  export type UserAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer findFirst
   */
  export type UserAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAnswers.
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAnswers.
     */
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * UserAnswer findFirstOrThrow
   */
  export type UserAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAnswers.
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAnswers.
     */
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * UserAnswer findMany
   */
  export type UserAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswers to fetch.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAnswers.
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * UserAnswer create
   */
  export type UserAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAnswer.
     */
    data: XOR<UserAnswerCreateInput, UserAnswerUncheckedCreateInput>
  }

  /**
   * UserAnswer createMany
   */
  export type UserAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAnswers.
     */
    data: UserAnswerCreateManyInput | UserAnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAnswer createManyAndReturn
   */
  export type UserAnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * The data used to create many UserAnswers.
     */
    data: UserAnswerCreateManyInput | UserAnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAnswer update
   */
  export type UserAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAnswer.
     */
    data: XOR<UserAnswerUpdateInput, UserAnswerUncheckedUpdateInput>
    /**
     * Choose, which UserAnswer to update.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer updateMany
   */
  export type UserAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAnswers.
     */
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyInput>
    /**
     * Filter which UserAnswers to update
     */
    where?: UserAnswerWhereInput
    /**
     * Limit how many UserAnswers to update.
     */
    limit?: number
  }

  /**
   * UserAnswer updateManyAndReturn
   */
  export type UserAnswerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * The data used to update UserAnswers.
     */
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyInput>
    /**
     * Filter which UserAnswers to update
     */
    where?: UserAnswerWhereInput
    /**
     * Limit how many UserAnswers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAnswer upsert
   */
  export type UserAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAnswer to update in case it exists.
     */
    where: UserAnswerWhereUniqueInput
    /**
     * In case the UserAnswer found by the `where` argument doesn't exist, create a new UserAnswer with this data.
     */
    create: XOR<UserAnswerCreateInput, UserAnswerUncheckedCreateInput>
    /**
     * In case the UserAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAnswerUpdateInput, UserAnswerUncheckedUpdateInput>
  }

  /**
   * UserAnswer delete
   */
  export type UserAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter which UserAnswer to delete.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer deleteMany
   */
  export type UserAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAnswers to delete
     */
    where?: UserAnswerWhereInput
    /**
     * Limit how many UserAnswers to delete.
     */
    limit?: number
  }

  /**
   * UserAnswer without action
   */
  export type UserAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
  }


  /**
   * Model LearningStats
   */

  export type AggregateLearningStats = {
    _count: LearningStatsCountAggregateOutputType | null
    _avg: LearningStatsAvgAggregateOutputType | null
    _sum: LearningStatsSumAggregateOutputType | null
    _min: LearningStatsMinAggregateOutputType | null
    _max: LearningStatsMaxAggregateOutputType | null
  }

  export type LearningStatsAvgAggregateOutputType = {
    totalQuestions: number | null
    correctAnswers: number | null
    totalScore: number | null
    maxScore: number | null
    accuracy: number | null
    totalTimeSpent: number | null
    explanationTime: number | null
    coachingTime: number | null
    quizTime: number | null
  }

  export type LearningStatsSumAggregateOutputType = {
    totalQuestions: number | null
    correctAnswers: number | null
    totalScore: number | null
    maxScore: number | null
    accuracy: number | null
    totalTimeSpent: number | null
    explanationTime: number | null
    coachingTime: number | null
    quizTime: number | null
  }

  export type LearningStatsMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    totalQuestions: number | null
    correctAnswers: number | null
    totalScore: number | null
    maxScore: number | null
    accuracy: number | null
    totalTimeSpent: number | null
    explanationTime: number | null
    coachingTime: number | null
    quizTime: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningStatsMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    totalQuestions: number | null
    correctAnswers: number | null
    totalScore: number | null
    maxScore: number | null
    accuracy: number | null
    totalTimeSpent: number | null
    explanationTime: number | null
    coachingTime: number | null
    quizTime: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningStatsCountAggregateOutputType = {
    id: number
    conversationId: number
    totalQuestions: number
    correctAnswers: number
    totalScore: number
    maxScore: number
    accuracy: number
    totalTimeSpent: number
    explanationTime: number
    coachingTime: number
    quizTime: number
    weaknesses: number
    suggestions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LearningStatsAvgAggregateInputType = {
    totalQuestions?: true
    correctAnswers?: true
    totalScore?: true
    maxScore?: true
    accuracy?: true
    totalTimeSpent?: true
    explanationTime?: true
    coachingTime?: true
    quizTime?: true
  }

  export type LearningStatsSumAggregateInputType = {
    totalQuestions?: true
    correctAnswers?: true
    totalScore?: true
    maxScore?: true
    accuracy?: true
    totalTimeSpent?: true
    explanationTime?: true
    coachingTime?: true
    quizTime?: true
  }

  export type LearningStatsMinAggregateInputType = {
    id?: true
    conversationId?: true
    totalQuestions?: true
    correctAnswers?: true
    totalScore?: true
    maxScore?: true
    accuracy?: true
    totalTimeSpent?: true
    explanationTime?: true
    coachingTime?: true
    quizTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningStatsMaxAggregateInputType = {
    id?: true
    conversationId?: true
    totalQuestions?: true
    correctAnswers?: true
    totalScore?: true
    maxScore?: true
    accuracy?: true
    totalTimeSpent?: true
    explanationTime?: true
    coachingTime?: true
    quizTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningStatsCountAggregateInputType = {
    id?: true
    conversationId?: true
    totalQuestions?: true
    correctAnswers?: true
    totalScore?: true
    maxScore?: true
    accuracy?: true
    totalTimeSpent?: true
    explanationTime?: true
    coachingTime?: true
    quizTime?: true
    weaknesses?: true
    suggestions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LearningStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningStats to aggregate.
     */
    where?: LearningStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningStats to fetch.
     */
    orderBy?: LearningStatsOrderByWithRelationInput | LearningStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningStats
    **/
    _count?: true | LearningStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningStatsMaxAggregateInputType
  }

  export type GetLearningStatsAggregateType<T extends LearningStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningStats[P]>
      : GetScalarType<T[P], AggregateLearningStats[P]>
  }




  export type LearningStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningStatsWhereInput
    orderBy?: LearningStatsOrderByWithAggregationInput | LearningStatsOrderByWithAggregationInput[]
    by: LearningStatsScalarFieldEnum[] | LearningStatsScalarFieldEnum
    having?: LearningStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningStatsCountAggregateInputType | true
    _avg?: LearningStatsAvgAggregateInputType
    _sum?: LearningStatsSumAggregateInputType
    _min?: LearningStatsMinAggregateInputType
    _max?: LearningStatsMaxAggregateInputType
  }

  export type LearningStatsGroupByOutputType = {
    id: string
    conversationId: string
    totalQuestions: number
    correctAnswers: number
    totalScore: number
    maxScore: number
    accuracy: number
    totalTimeSpent: number
    explanationTime: number
    coachingTime: number
    quizTime: number
    weaknesses: JsonValue | null
    suggestions: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: LearningStatsCountAggregateOutputType | null
    _avg: LearningStatsAvgAggregateOutputType | null
    _sum: LearningStatsSumAggregateOutputType | null
    _min: LearningStatsMinAggregateOutputType | null
    _max: LearningStatsMaxAggregateOutputType | null
  }

  type GetLearningStatsGroupByPayload<T extends LearningStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningStatsGroupByOutputType[P]>
            : GetScalarType<T[P], LearningStatsGroupByOutputType[P]>
        }
      >
    >


  export type LearningStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    totalQuestions?: boolean
    correctAnswers?: boolean
    totalScore?: boolean
    maxScore?: boolean
    accuracy?: boolean
    totalTimeSpent?: boolean
    explanationTime?: boolean
    coachingTime?: boolean
    quizTime?: boolean
    weaknesses?: boolean
    suggestions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["learningStats"]>

  export type LearningStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    totalQuestions?: boolean
    correctAnswers?: boolean
    totalScore?: boolean
    maxScore?: boolean
    accuracy?: boolean
    totalTimeSpent?: boolean
    explanationTime?: boolean
    coachingTime?: boolean
    quizTime?: boolean
    weaknesses?: boolean
    suggestions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["learningStats"]>

  export type LearningStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    totalQuestions?: boolean
    correctAnswers?: boolean
    totalScore?: boolean
    maxScore?: boolean
    accuracy?: boolean
    totalTimeSpent?: boolean
    explanationTime?: boolean
    coachingTime?: boolean
    quizTime?: boolean
    weaknesses?: boolean
    suggestions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["learningStats"]>

  export type LearningStatsSelectScalar = {
    id?: boolean
    conversationId?: boolean
    totalQuestions?: boolean
    correctAnswers?: boolean
    totalScore?: boolean
    maxScore?: boolean
    accuracy?: boolean
    totalTimeSpent?: boolean
    explanationTime?: boolean
    coachingTime?: boolean
    quizTime?: boolean
    weaknesses?: boolean
    suggestions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LearningStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "totalQuestions" | "correctAnswers" | "totalScore" | "maxScore" | "accuracy" | "totalTimeSpent" | "explanationTime" | "coachingTime" | "quizTime" | "weaknesses" | "suggestions" | "createdAt" | "updatedAt", ExtArgs["result"]["learningStats"]>

  export type $LearningStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningStats"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      totalQuestions: number
      correctAnswers: number
      totalScore: number
      maxScore: number
      accuracy: number
      totalTimeSpent: number
      explanationTime: number
      coachingTime: number
      quizTime: number
      weaknesses: Prisma.JsonValue | null
      suggestions: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["learningStats"]>
    composites: {}
  }

  type LearningStatsGetPayload<S extends boolean | null | undefined | LearningStatsDefaultArgs> = $Result.GetResult<Prisma.$LearningStatsPayload, S>

  type LearningStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningStatsCountAggregateInputType | true
    }

  export interface LearningStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningStats'], meta: { name: 'LearningStats' } }
    /**
     * Find zero or one LearningStats that matches the filter.
     * @param {LearningStatsFindUniqueArgs} args - Arguments to find a LearningStats
     * @example
     * // Get one LearningStats
     * const learningStats = await prisma.learningStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningStatsFindUniqueArgs>(args: SelectSubset<T, LearningStatsFindUniqueArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningStatsFindUniqueOrThrowArgs} args - Arguments to find a LearningStats
     * @example
     * // Get one LearningStats
     * const learningStats = await prisma.learningStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsFindFirstArgs} args - Arguments to find a LearningStats
     * @example
     * // Get one LearningStats
     * const learningStats = await prisma.learningStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningStatsFindFirstArgs>(args?: SelectSubset<T, LearningStatsFindFirstArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsFindFirstOrThrowArgs} args - Arguments to find a LearningStats
     * @example
     * // Get one LearningStats
     * const learningStats = await prisma.learningStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningStats
     * const learningStats = await prisma.learningStats.findMany()
     * 
     * // Get first 10 LearningStats
     * const learningStats = await prisma.learningStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningStatsWithIdOnly = await prisma.learningStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningStatsFindManyArgs>(args?: SelectSubset<T, LearningStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningStats.
     * @param {LearningStatsCreateArgs} args - Arguments to create a LearningStats.
     * @example
     * // Create one LearningStats
     * const LearningStats = await prisma.learningStats.create({
     *   data: {
     *     // ... data to create a LearningStats
     *   }
     * })
     * 
     */
    create<T extends LearningStatsCreateArgs>(args: SelectSubset<T, LearningStatsCreateArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningStats.
     * @param {LearningStatsCreateManyArgs} args - Arguments to create many LearningStats.
     * @example
     * // Create many LearningStats
     * const learningStats = await prisma.learningStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningStatsCreateManyArgs>(args?: SelectSubset<T, LearningStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningStats and returns the data saved in the database.
     * @param {LearningStatsCreateManyAndReturnArgs} args - Arguments to create many LearningStats.
     * @example
     * // Create many LearningStats
     * const learningStats = await prisma.learningStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningStats and only return the `id`
     * const learningStatsWithIdOnly = await prisma.learningStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningStats.
     * @param {LearningStatsDeleteArgs} args - Arguments to delete one LearningStats.
     * @example
     * // Delete one LearningStats
     * const LearningStats = await prisma.learningStats.delete({
     *   where: {
     *     // ... filter to delete one LearningStats
     *   }
     * })
     * 
     */
    delete<T extends LearningStatsDeleteArgs>(args: SelectSubset<T, LearningStatsDeleteArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningStats.
     * @param {LearningStatsUpdateArgs} args - Arguments to update one LearningStats.
     * @example
     * // Update one LearningStats
     * const learningStats = await prisma.learningStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningStatsUpdateArgs>(args: SelectSubset<T, LearningStatsUpdateArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningStats.
     * @param {LearningStatsDeleteManyArgs} args - Arguments to filter LearningStats to delete.
     * @example
     * // Delete a few LearningStats
     * const { count } = await prisma.learningStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningStatsDeleteManyArgs>(args?: SelectSubset<T, LearningStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningStats
     * const learningStats = await prisma.learningStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningStatsUpdateManyArgs>(args: SelectSubset<T, LearningStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningStats and returns the data updated in the database.
     * @param {LearningStatsUpdateManyAndReturnArgs} args - Arguments to update many LearningStats.
     * @example
     * // Update many LearningStats
     * const learningStats = await prisma.learningStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningStats and only return the `id`
     * const learningStatsWithIdOnly = await prisma.learningStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningStats.
     * @param {LearningStatsUpsertArgs} args - Arguments to update or create a LearningStats.
     * @example
     * // Update or create a LearningStats
     * const learningStats = await prisma.learningStats.upsert({
     *   create: {
     *     // ... data to create a LearningStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningStats we want to update
     *   }
     * })
     */
    upsert<T extends LearningStatsUpsertArgs>(args: SelectSubset<T, LearningStatsUpsertArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsCountArgs} args - Arguments to filter LearningStats to count.
     * @example
     * // Count the number of LearningStats
     * const count = await prisma.learningStats.count({
     *   where: {
     *     // ... the filter for the LearningStats we want to count
     *   }
     * })
    **/
    count<T extends LearningStatsCountArgs>(
      args?: Subset<T, LearningStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningStatsAggregateArgs>(args: Subset<T, LearningStatsAggregateArgs>): Prisma.PrismaPromise<GetLearningStatsAggregateType<T>>

    /**
     * Group by LearningStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningStatsGroupByArgs['orderBy'] }
        : { orderBy?: LearningStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningStats model
   */
  readonly fields: LearningStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningStats model
   */
  interface LearningStatsFieldRefs {
    readonly id: FieldRef<"LearningStats", 'String'>
    readonly conversationId: FieldRef<"LearningStats", 'String'>
    readonly totalQuestions: FieldRef<"LearningStats", 'Int'>
    readonly correctAnswers: FieldRef<"LearningStats", 'Int'>
    readonly totalScore: FieldRef<"LearningStats", 'Int'>
    readonly maxScore: FieldRef<"LearningStats", 'Int'>
    readonly accuracy: FieldRef<"LearningStats", 'Float'>
    readonly totalTimeSpent: FieldRef<"LearningStats", 'Int'>
    readonly explanationTime: FieldRef<"LearningStats", 'Int'>
    readonly coachingTime: FieldRef<"LearningStats", 'Int'>
    readonly quizTime: FieldRef<"LearningStats", 'Int'>
    readonly weaknesses: FieldRef<"LearningStats", 'Json'>
    readonly suggestions: FieldRef<"LearningStats", 'Json'>
    readonly createdAt: FieldRef<"LearningStats", 'DateTime'>
    readonly updatedAt: FieldRef<"LearningStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningStats findUnique
   */
  export type LearningStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where: LearningStatsWhereUniqueInput
  }

  /**
   * LearningStats findUniqueOrThrow
   */
  export type LearningStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where: LearningStatsWhereUniqueInput
  }

  /**
   * LearningStats findFirst
   */
  export type LearningStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where?: LearningStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningStats to fetch.
     */
    orderBy?: LearningStatsOrderByWithRelationInput | LearningStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningStats.
     */
    cursor?: LearningStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningStats.
     */
    distinct?: LearningStatsScalarFieldEnum | LearningStatsScalarFieldEnum[]
  }

  /**
   * LearningStats findFirstOrThrow
   */
  export type LearningStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where?: LearningStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningStats to fetch.
     */
    orderBy?: LearningStatsOrderByWithRelationInput | LearningStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningStats.
     */
    cursor?: LearningStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningStats.
     */
    distinct?: LearningStatsScalarFieldEnum | LearningStatsScalarFieldEnum[]
  }

  /**
   * LearningStats findMany
   */
  export type LearningStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where?: LearningStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningStats to fetch.
     */
    orderBy?: LearningStatsOrderByWithRelationInput | LearningStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningStats.
     */
    cursor?: LearningStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningStats.
     */
    skip?: number
    distinct?: LearningStatsScalarFieldEnum | LearningStatsScalarFieldEnum[]
  }

  /**
   * LearningStats create
   */
  export type LearningStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * The data needed to create a LearningStats.
     */
    data: XOR<LearningStatsCreateInput, LearningStatsUncheckedCreateInput>
  }

  /**
   * LearningStats createMany
   */
  export type LearningStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningStats.
     */
    data: LearningStatsCreateManyInput | LearningStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningStats createManyAndReturn
   */
  export type LearningStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * The data used to create many LearningStats.
     */
    data: LearningStatsCreateManyInput | LearningStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningStats update
   */
  export type LearningStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * The data needed to update a LearningStats.
     */
    data: XOR<LearningStatsUpdateInput, LearningStatsUncheckedUpdateInput>
    /**
     * Choose, which LearningStats to update.
     */
    where: LearningStatsWhereUniqueInput
  }

  /**
   * LearningStats updateMany
   */
  export type LearningStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningStats.
     */
    data: XOR<LearningStatsUpdateManyMutationInput, LearningStatsUncheckedUpdateManyInput>
    /**
     * Filter which LearningStats to update
     */
    where?: LearningStatsWhereInput
    /**
     * Limit how many LearningStats to update.
     */
    limit?: number
  }

  /**
   * LearningStats updateManyAndReturn
   */
  export type LearningStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * The data used to update LearningStats.
     */
    data: XOR<LearningStatsUpdateManyMutationInput, LearningStatsUncheckedUpdateManyInput>
    /**
     * Filter which LearningStats to update
     */
    where?: LearningStatsWhereInput
    /**
     * Limit how many LearningStats to update.
     */
    limit?: number
  }

  /**
   * LearningStats upsert
   */
  export type LearningStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * The filter to search for the LearningStats to update in case it exists.
     */
    where: LearningStatsWhereUniqueInput
    /**
     * In case the LearningStats found by the `where` argument doesn't exist, create a new LearningStats with this data.
     */
    create: XOR<LearningStatsCreateInput, LearningStatsUncheckedCreateInput>
    /**
     * In case the LearningStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningStatsUpdateInput, LearningStatsUncheckedUpdateInput>
  }

  /**
   * LearningStats delete
   */
  export type LearningStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Filter which LearningStats to delete.
     */
    where: LearningStatsWhereUniqueInput
  }

  /**
   * LearningStats deleteMany
   */
  export type LearningStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningStats to delete
     */
    where?: LearningStatsWhereInput
    /**
     * Limit how many LearningStats to delete.
     */
    limit?: number
  }

  /**
   * LearningStats without action
   */
  export type LearningStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LearningItemScalarFieldEnum: {
    id: 'id',
    text: 'text',
    subject: 'subject',
    createdAt: 'createdAt'
  };

  export type LearningItemScalarFieldEnum = (typeof LearningItemScalarFieldEnum)[keyof typeof LearningItemScalarFieldEnum]


  export const KnowledgeBaseItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    size: 'size',
    lastModified: 'lastModified',
    text: 'text',
    ocrText: 'ocrText',
    notes: 'notes',
    dataUrl: 'dataUrl',
    include: 'include',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KnowledgeBaseItemScalarFieldEnum = (typeof KnowledgeBaseItemScalarFieldEnum)[keyof typeof KnowledgeBaseItemScalarFieldEnum]


  export const LearningSessionScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    subject: 'subject',
    topic: 'topic',
    aiExplanation: 'aiExplanation',
    socraticDialogue: 'socraticDialogue',
    currentStep: 'currentStep',
    isCompleted: 'isCompleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    coachingHistory: 'coachingHistory',
    feedback: 'feedback',
    finalScore: 'finalScore',
    grade: 'grade',
    region: 'region',
    reviewNotes: 'reviewNotes',
    aiSummary: 'aiSummary'
  };

  export type LearningSessionScalarFieldEnum = (typeof LearningSessionScalarFieldEnum)[keyof typeof LearningSessionScalarFieldEnum]


  export const QuizQuestionScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    question: 'question',
    type: 'type',
    options: 'options',
    correctAnswer: 'correctAnswer',
    explanation: 'explanation',
    difficulty: 'difficulty',
    points: 'points',
    order: 'order',
    createdAt: 'createdAt'
  };

  export type QuizQuestionScalarFieldEnum = (typeof QuizQuestionScalarFieldEnum)[keyof typeof QuizQuestionScalarFieldEnum]


  export const UserAnswerScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    questionId: 'questionId',
    userAnswer: 'userAnswer',
    isCorrect: 'isCorrect',
    score: 'score',
    timeSpent: 'timeSpent',
    answeredAt: 'answeredAt'
  };

  export type UserAnswerScalarFieldEnum = (typeof UserAnswerScalarFieldEnum)[keyof typeof UserAnswerScalarFieldEnum]


  export const LearningStatsScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    totalQuestions: 'totalQuestions',
    correctAnswers: 'correctAnswers',
    totalScore: 'totalScore',
    maxScore: 'maxScore',
    accuracy: 'accuracy',
    totalTimeSpent: 'totalTimeSpent',
    explanationTime: 'explanationTime',
    coachingTime: 'coachingTime',
    quizTime: 'quizTime',
    weaknesses: 'weaknesses',
    suggestions: 'suggestions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LearningStatsScalarFieldEnum = (typeof LearningStatsScalarFieldEnum)[keyof typeof LearningStatsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type LearningItemWhereInput = {
    AND?: LearningItemWhereInput | LearningItemWhereInput[]
    OR?: LearningItemWhereInput[]
    NOT?: LearningItemWhereInput | LearningItemWhereInput[]
    id?: StringFilter<"LearningItem"> | string
    text?: StringFilter<"LearningItem"> | string
    subject?: StringFilter<"LearningItem"> | string
    createdAt?: DateTimeFilter<"LearningItem"> | Date | string
  }

  export type LearningItemOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    subject?: SortOrder
    createdAt?: SortOrder
  }

  export type LearningItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LearningItemWhereInput | LearningItemWhereInput[]
    OR?: LearningItemWhereInput[]
    NOT?: LearningItemWhereInput | LearningItemWhereInput[]
    text?: StringFilter<"LearningItem"> | string
    subject?: StringFilter<"LearningItem"> | string
    createdAt?: DateTimeFilter<"LearningItem"> | Date | string
  }, "id">

  export type LearningItemOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    subject?: SortOrder
    createdAt?: SortOrder
    _count?: LearningItemCountOrderByAggregateInput
    _max?: LearningItemMaxOrderByAggregateInput
    _min?: LearningItemMinOrderByAggregateInput
  }

  export type LearningItemScalarWhereWithAggregatesInput = {
    AND?: LearningItemScalarWhereWithAggregatesInput | LearningItemScalarWhereWithAggregatesInput[]
    OR?: LearningItemScalarWhereWithAggregatesInput[]
    NOT?: LearningItemScalarWhereWithAggregatesInput | LearningItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LearningItem"> | string
    text?: StringWithAggregatesFilter<"LearningItem"> | string
    subject?: StringWithAggregatesFilter<"LearningItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LearningItem"> | Date | string
  }

  export type KnowledgeBaseItemWhereInput = {
    AND?: KnowledgeBaseItemWhereInput | KnowledgeBaseItemWhereInput[]
    OR?: KnowledgeBaseItemWhereInput[]
    NOT?: KnowledgeBaseItemWhereInput | KnowledgeBaseItemWhereInput[]
    id?: StringFilter<"KnowledgeBaseItem"> | string
    name?: StringFilter<"KnowledgeBaseItem"> | string
    type?: StringFilter<"KnowledgeBaseItem"> | string
    size?: IntFilter<"KnowledgeBaseItem"> | number
    lastModified?: BigIntFilter<"KnowledgeBaseItem"> | bigint | number
    text?: StringNullableFilter<"KnowledgeBaseItem"> | string | null
    ocrText?: StringNullableFilter<"KnowledgeBaseItem"> | string | null
    notes?: StringNullableFilter<"KnowledgeBaseItem"> | string | null
    dataUrl?: StringNullableFilter<"KnowledgeBaseItem"> | string | null
    include?: BoolFilter<"KnowledgeBaseItem"> | boolean
    createdAt?: DateTimeFilter<"KnowledgeBaseItem"> | Date | string
    updatedAt?: DateTimeFilter<"KnowledgeBaseItem"> | Date | string
  }

  export type KnowledgeBaseItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    size?: SortOrder
    lastModified?: SortOrder
    text?: SortOrderInput | SortOrder
    ocrText?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    dataUrl?: SortOrderInput | SortOrder
    include?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: KnowledgeBaseItemWhereInput | KnowledgeBaseItemWhereInput[]
    OR?: KnowledgeBaseItemWhereInput[]
    NOT?: KnowledgeBaseItemWhereInput | KnowledgeBaseItemWhereInput[]
    name?: StringFilter<"KnowledgeBaseItem"> | string
    type?: StringFilter<"KnowledgeBaseItem"> | string
    size?: IntFilter<"KnowledgeBaseItem"> | number
    lastModified?: BigIntFilter<"KnowledgeBaseItem"> | bigint | number
    text?: StringNullableFilter<"KnowledgeBaseItem"> | string | null
    ocrText?: StringNullableFilter<"KnowledgeBaseItem"> | string | null
    notes?: StringNullableFilter<"KnowledgeBaseItem"> | string | null
    dataUrl?: StringNullableFilter<"KnowledgeBaseItem"> | string | null
    include?: BoolFilter<"KnowledgeBaseItem"> | boolean
    createdAt?: DateTimeFilter<"KnowledgeBaseItem"> | Date | string
    updatedAt?: DateTimeFilter<"KnowledgeBaseItem"> | Date | string
  }, "id">

  export type KnowledgeBaseItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    size?: SortOrder
    lastModified?: SortOrder
    text?: SortOrderInput | SortOrder
    ocrText?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    dataUrl?: SortOrderInput | SortOrder
    include?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KnowledgeBaseItemCountOrderByAggregateInput
    _avg?: KnowledgeBaseItemAvgOrderByAggregateInput
    _max?: KnowledgeBaseItemMaxOrderByAggregateInput
    _min?: KnowledgeBaseItemMinOrderByAggregateInput
    _sum?: KnowledgeBaseItemSumOrderByAggregateInput
  }

  export type KnowledgeBaseItemScalarWhereWithAggregatesInput = {
    AND?: KnowledgeBaseItemScalarWhereWithAggregatesInput | KnowledgeBaseItemScalarWhereWithAggregatesInput[]
    OR?: KnowledgeBaseItemScalarWhereWithAggregatesInput[]
    NOT?: KnowledgeBaseItemScalarWhereWithAggregatesInput | KnowledgeBaseItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KnowledgeBaseItem"> | string
    name?: StringWithAggregatesFilter<"KnowledgeBaseItem"> | string
    type?: StringWithAggregatesFilter<"KnowledgeBaseItem"> | string
    size?: IntWithAggregatesFilter<"KnowledgeBaseItem"> | number
    lastModified?: BigIntWithAggregatesFilter<"KnowledgeBaseItem"> | bigint | number
    text?: StringNullableWithAggregatesFilter<"KnowledgeBaseItem"> | string | null
    ocrText?: StringNullableWithAggregatesFilter<"KnowledgeBaseItem"> | string | null
    notes?: StringNullableWithAggregatesFilter<"KnowledgeBaseItem"> | string | null
    dataUrl?: StringNullableWithAggregatesFilter<"KnowledgeBaseItem"> | string | null
    include?: BoolWithAggregatesFilter<"KnowledgeBaseItem"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"KnowledgeBaseItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KnowledgeBaseItem"> | Date | string
  }

  export type LearningSessionWhereInput = {
    AND?: LearningSessionWhereInput | LearningSessionWhereInput[]
    OR?: LearningSessionWhereInput[]
    NOT?: LearningSessionWhereInput | LearningSessionWhereInput[]
    id?: StringFilter<"LearningSession"> | string
    conversationId?: StringFilter<"LearningSession"> | string
    subject?: StringFilter<"LearningSession"> | string
    topic?: StringFilter<"LearningSession"> | string
    aiExplanation?: StringNullableFilter<"LearningSession"> | string | null
    socraticDialogue?: JsonNullableFilter<"LearningSession">
    currentStep?: StringFilter<"LearningSession"> | string
    isCompleted?: BoolFilter<"LearningSession"> | boolean
    createdAt?: DateTimeFilter<"LearningSession"> | Date | string
    updatedAt?: DateTimeFilter<"LearningSession"> | Date | string
    coachingHistory?: JsonNullableFilter<"LearningSession">
    feedback?: StringNullableFilter<"LearningSession"> | string | null
    finalScore?: IntNullableFilter<"LearningSession"> | number | null
    grade?: StringNullableFilter<"LearningSession"> | string | null
    region?: StringNullableFilter<"LearningSession"> | string | null
    reviewNotes?: StringNullableFilter<"LearningSession"> | string | null
    aiSummary?: StringNullableFilter<"LearningSession"> | string | null
    quizQuestions?: QuizQuestionListRelationFilter
    userAnswers?: UserAnswerListRelationFilter
  }

  export type LearningSessionOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    subject?: SortOrder
    topic?: SortOrder
    aiExplanation?: SortOrderInput | SortOrder
    socraticDialogue?: SortOrderInput | SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coachingHistory?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    finalScore?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    reviewNotes?: SortOrderInput | SortOrder
    aiSummary?: SortOrderInput | SortOrder
    quizQuestions?: QuizQuestionOrderByRelationAggregateInput
    userAnswers?: UserAnswerOrderByRelationAggregateInput
  }

  export type LearningSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    conversationId?: string
    AND?: LearningSessionWhereInput | LearningSessionWhereInput[]
    OR?: LearningSessionWhereInput[]
    NOT?: LearningSessionWhereInput | LearningSessionWhereInput[]
    subject?: StringFilter<"LearningSession"> | string
    topic?: StringFilter<"LearningSession"> | string
    aiExplanation?: StringNullableFilter<"LearningSession"> | string | null
    socraticDialogue?: JsonNullableFilter<"LearningSession">
    currentStep?: StringFilter<"LearningSession"> | string
    isCompleted?: BoolFilter<"LearningSession"> | boolean
    createdAt?: DateTimeFilter<"LearningSession"> | Date | string
    updatedAt?: DateTimeFilter<"LearningSession"> | Date | string
    coachingHistory?: JsonNullableFilter<"LearningSession">
    feedback?: StringNullableFilter<"LearningSession"> | string | null
    finalScore?: IntNullableFilter<"LearningSession"> | number | null
    grade?: StringNullableFilter<"LearningSession"> | string | null
    region?: StringNullableFilter<"LearningSession"> | string | null
    reviewNotes?: StringNullableFilter<"LearningSession"> | string | null
    aiSummary?: StringNullableFilter<"LearningSession"> | string | null
    quizQuestions?: QuizQuestionListRelationFilter
    userAnswers?: UserAnswerListRelationFilter
  }, "id" | "conversationId">

  export type LearningSessionOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    subject?: SortOrder
    topic?: SortOrder
    aiExplanation?: SortOrderInput | SortOrder
    socraticDialogue?: SortOrderInput | SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coachingHistory?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    finalScore?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    reviewNotes?: SortOrderInput | SortOrder
    aiSummary?: SortOrderInput | SortOrder
    _count?: LearningSessionCountOrderByAggregateInput
    _avg?: LearningSessionAvgOrderByAggregateInput
    _max?: LearningSessionMaxOrderByAggregateInput
    _min?: LearningSessionMinOrderByAggregateInput
    _sum?: LearningSessionSumOrderByAggregateInput
  }

  export type LearningSessionScalarWhereWithAggregatesInput = {
    AND?: LearningSessionScalarWhereWithAggregatesInput | LearningSessionScalarWhereWithAggregatesInput[]
    OR?: LearningSessionScalarWhereWithAggregatesInput[]
    NOT?: LearningSessionScalarWhereWithAggregatesInput | LearningSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LearningSession"> | string
    conversationId?: StringWithAggregatesFilter<"LearningSession"> | string
    subject?: StringWithAggregatesFilter<"LearningSession"> | string
    topic?: StringWithAggregatesFilter<"LearningSession"> | string
    aiExplanation?: StringNullableWithAggregatesFilter<"LearningSession"> | string | null
    socraticDialogue?: JsonNullableWithAggregatesFilter<"LearningSession">
    currentStep?: StringWithAggregatesFilter<"LearningSession"> | string
    isCompleted?: BoolWithAggregatesFilter<"LearningSession"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"LearningSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LearningSession"> | Date | string
    coachingHistory?: JsonNullableWithAggregatesFilter<"LearningSession">
    feedback?: StringNullableWithAggregatesFilter<"LearningSession"> | string | null
    finalScore?: IntNullableWithAggregatesFilter<"LearningSession"> | number | null
    grade?: StringNullableWithAggregatesFilter<"LearningSession"> | string | null
    region?: StringNullableWithAggregatesFilter<"LearningSession"> | string | null
    reviewNotes?: StringNullableWithAggregatesFilter<"LearningSession"> | string | null
    aiSummary?: StringNullableWithAggregatesFilter<"LearningSession"> | string | null
  }

  export type QuizQuestionWhereInput = {
    AND?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    OR?: QuizQuestionWhereInput[]
    NOT?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    id?: StringFilter<"QuizQuestion"> | string
    sessionId?: StringFilter<"QuizQuestion"> | string
    question?: StringFilter<"QuizQuestion"> | string
    type?: StringFilter<"QuizQuestion"> | string
    options?: JsonNullableFilter<"QuizQuestion">
    correctAnswer?: StringFilter<"QuizQuestion"> | string
    explanation?: StringNullableFilter<"QuizQuestion"> | string | null
    difficulty?: StringFilter<"QuizQuestion"> | string
    points?: IntFilter<"QuizQuestion"> | number
    order?: IntFilter<"QuizQuestion"> | number
    createdAt?: DateTimeFilter<"QuizQuestion"> | Date | string
    session?: XOR<LearningSessionScalarRelationFilter, LearningSessionWhereInput>
    userAnswers?: UserAnswerListRelationFilter
  }

  export type QuizQuestionOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    type?: SortOrder
    options?: SortOrderInput | SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    points?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    session?: LearningSessionOrderByWithRelationInput
    userAnswers?: UserAnswerOrderByRelationAggregateInput
  }

  export type QuizQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    OR?: QuizQuestionWhereInput[]
    NOT?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    sessionId?: StringFilter<"QuizQuestion"> | string
    question?: StringFilter<"QuizQuestion"> | string
    type?: StringFilter<"QuizQuestion"> | string
    options?: JsonNullableFilter<"QuizQuestion">
    correctAnswer?: StringFilter<"QuizQuestion"> | string
    explanation?: StringNullableFilter<"QuizQuestion"> | string | null
    difficulty?: StringFilter<"QuizQuestion"> | string
    points?: IntFilter<"QuizQuestion"> | number
    order?: IntFilter<"QuizQuestion"> | number
    createdAt?: DateTimeFilter<"QuizQuestion"> | Date | string
    session?: XOR<LearningSessionScalarRelationFilter, LearningSessionWhereInput>
    userAnswers?: UserAnswerListRelationFilter
  }, "id">

  export type QuizQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    type?: SortOrder
    options?: SortOrderInput | SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    points?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    _count?: QuizQuestionCountOrderByAggregateInput
    _avg?: QuizQuestionAvgOrderByAggregateInput
    _max?: QuizQuestionMaxOrderByAggregateInput
    _min?: QuizQuestionMinOrderByAggregateInput
    _sum?: QuizQuestionSumOrderByAggregateInput
  }

  export type QuizQuestionScalarWhereWithAggregatesInput = {
    AND?: QuizQuestionScalarWhereWithAggregatesInput | QuizQuestionScalarWhereWithAggregatesInput[]
    OR?: QuizQuestionScalarWhereWithAggregatesInput[]
    NOT?: QuizQuestionScalarWhereWithAggregatesInput | QuizQuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuizQuestion"> | string
    sessionId?: StringWithAggregatesFilter<"QuizQuestion"> | string
    question?: StringWithAggregatesFilter<"QuizQuestion"> | string
    type?: StringWithAggregatesFilter<"QuizQuestion"> | string
    options?: JsonNullableWithAggregatesFilter<"QuizQuestion">
    correctAnswer?: StringWithAggregatesFilter<"QuizQuestion"> | string
    explanation?: StringNullableWithAggregatesFilter<"QuizQuestion"> | string | null
    difficulty?: StringWithAggregatesFilter<"QuizQuestion"> | string
    points?: IntWithAggregatesFilter<"QuizQuestion"> | number
    order?: IntWithAggregatesFilter<"QuizQuestion"> | number
    createdAt?: DateTimeWithAggregatesFilter<"QuizQuestion"> | Date | string
  }

  export type UserAnswerWhereInput = {
    AND?: UserAnswerWhereInput | UserAnswerWhereInput[]
    OR?: UserAnswerWhereInput[]
    NOT?: UserAnswerWhereInput | UserAnswerWhereInput[]
    id?: StringFilter<"UserAnswer"> | string
    sessionId?: StringFilter<"UserAnswer"> | string
    questionId?: StringFilter<"UserAnswer"> | string
    userAnswer?: StringFilter<"UserAnswer"> | string
    isCorrect?: BoolFilter<"UserAnswer"> | boolean
    score?: IntFilter<"UserAnswer"> | number
    timeSpent?: IntNullableFilter<"UserAnswer"> | number | null
    answeredAt?: DateTimeFilter<"UserAnswer"> | Date | string
    question?: XOR<QuizQuestionScalarRelationFilter, QuizQuestionWhereInput>
    session?: XOR<LearningSessionScalarRelationFilter, LearningSessionWhereInput>
  }

  export type UserAnswerOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    userAnswer?: SortOrder
    isCorrect?: SortOrder
    score?: SortOrder
    timeSpent?: SortOrderInput | SortOrder
    answeredAt?: SortOrder
    question?: QuizQuestionOrderByWithRelationInput
    session?: LearningSessionOrderByWithRelationInput
  }

  export type UserAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserAnswerWhereInput | UserAnswerWhereInput[]
    OR?: UserAnswerWhereInput[]
    NOT?: UserAnswerWhereInput | UserAnswerWhereInput[]
    sessionId?: StringFilter<"UserAnswer"> | string
    questionId?: StringFilter<"UserAnswer"> | string
    userAnswer?: StringFilter<"UserAnswer"> | string
    isCorrect?: BoolFilter<"UserAnswer"> | boolean
    score?: IntFilter<"UserAnswer"> | number
    timeSpent?: IntNullableFilter<"UserAnswer"> | number | null
    answeredAt?: DateTimeFilter<"UserAnswer"> | Date | string
    question?: XOR<QuizQuestionScalarRelationFilter, QuizQuestionWhereInput>
    session?: XOR<LearningSessionScalarRelationFilter, LearningSessionWhereInput>
  }, "id">

  export type UserAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    userAnswer?: SortOrder
    isCorrect?: SortOrder
    score?: SortOrder
    timeSpent?: SortOrderInput | SortOrder
    answeredAt?: SortOrder
    _count?: UserAnswerCountOrderByAggregateInput
    _avg?: UserAnswerAvgOrderByAggregateInput
    _max?: UserAnswerMaxOrderByAggregateInput
    _min?: UserAnswerMinOrderByAggregateInput
    _sum?: UserAnswerSumOrderByAggregateInput
  }

  export type UserAnswerScalarWhereWithAggregatesInput = {
    AND?: UserAnswerScalarWhereWithAggregatesInput | UserAnswerScalarWhereWithAggregatesInput[]
    OR?: UserAnswerScalarWhereWithAggregatesInput[]
    NOT?: UserAnswerScalarWhereWithAggregatesInput | UserAnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAnswer"> | string
    sessionId?: StringWithAggregatesFilter<"UserAnswer"> | string
    questionId?: StringWithAggregatesFilter<"UserAnswer"> | string
    userAnswer?: StringWithAggregatesFilter<"UserAnswer"> | string
    isCorrect?: BoolWithAggregatesFilter<"UserAnswer"> | boolean
    score?: IntWithAggregatesFilter<"UserAnswer"> | number
    timeSpent?: IntNullableWithAggregatesFilter<"UserAnswer"> | number | null
    answeredAt?: DateTimeWithAggregatesFilter<"UserAnswer"> | Date | string
  }

  export type LearningStatsWhereInput = {
    AND?: LearningStatsWhereInput | LearningStatsWhereInput[]
    OR?: LearningStatsWhereInput[]
    NOT?: LearningStatsWhereInput | LearningStatsWhereInput[]
    id?: StringFilter<"LearningStats"> | string
    conversationId?: StringFilter<"LearningStats"> | string
    totalQuestions?: IntFilter<"LearningStats"> | number
    correctAnswers?: IntFilter<"LearningStats"> | number
    totalScore?: IntFilter<"LearningStats"> | number
    maxScore?: IntFilter<"LearningStats"> | number
    accuracy?: FloatFilter<"LearningStats"> | number
    totalTimeSpent?: IntFilter<"LearningStats"> | number
    explanationTime?: IntFilter<"LearningStats"> | number
    coachingTime?: IntFilter<"LearningStats"> | number
    quizTime?: IntFilter<"LearningStats"> | number
    weaknesses?: JsonNullableFilter<"LearningStats">
    suggestions?: JsonNullableFilter<"LearningStats">
    createdAt?: DateTimeFilter<"LearningStats"> | Date | string
    updatedAt?: DateTimeFilter<"LearningStats"> | Date | string
  }

  export type LearningStatsOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    accuracy?: SortOrder
    totalTimeSpent?: SortOrder
    explanationTime?: SortOrder
    coachingTime?: SortOrder
    quizTime?: SortOrder
    weaknesses?: SortOrderInput | SortOrder
    suggestions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    conversationId?: string
    AND?: LearningStatsWhereInput | LearningStatsWhereInput[]
    OR?: LearningStatsWhereInput[]
    NOT?: LearningStatsWhereInput | LearningStatsWhereInput[]
    totalQuestions?: IntFilter<"LearningStats"> | number
    correctAnswers?: IntFilter<"LearningStats"> | number
    totalScore?: IntFilter<"LearningStats"> | number
    maxScore?: IntFilter<"LearningStats"> | number
    accuracy?: FloatFilter<"LearningStats"> | number
    totalTimeSpent?: IntFilter<"LearningStats"> | number
    explanationTime?: IntFilter<"LearningStats"> | number
    coachingTime?: IntFilter<"LearningStats"> | number
    quizTime?: IntFilter<"LearningStats"> | number
    weaknesses?: JsonNullableFilter<"LearningStats">
    suggestions?: JsonNullableFilter<"LearningStats">
    createdAt?: DateTimeFilter<"LearningStats"> | Date | string
    updatedAt?: DateTimeFilter<"LearningStats"> | Date | string
  }, "id" | "conversationId">

  export type LearningStatsOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    accuracy?: SortOrder
    totalTimeSpent?: SortOrder
    explanationTime?: SortOrder
    coachingTime?: SortOrder
    quizTime?: SortOrder
    weaknesses?: SortOrderInput | SortOrder
    suggestions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LearningStatsCountOrderByAggregateInput
    _avg?: LearningStatsAvgOrderByAggregateInput
    _max?: LearningStatsMaxOrderByAggregateInput
    _min?: LearningStatsMinOrderByAggregateInput
    _sum?: LearningStatsSumOrderByAggregateInput
  }

  export type LearningStatsScalarWhereWithAggregatesInput = {
    AND?: LearningStatsScalarWhereWithAggregatesInput | LearningStatsScalarWhereWithAggregatesInput[]
    OR?: LearningStatsScalarWhereWithAggregatesInput[]
    NOT?: LearningStatsScalarWhereWithAggregatesInput | LearningStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LearningStats"> | string
    conversationId?: StringWithAggregatesFilter<"LearningStats"> | string
    totalQuestions?: IntWithAggregatesFilter<"LearningStats"> | number
    correctAnswers?: IntWithAggregatesFilter<"LearningStats"> | number
    totalScore?: IntWithAggregatesFilter<"LearningStats"> | number
    maxScore?: IntWithAggregatesFilter<"LearningStats"> | number
    accuracy?: FloatWithAggregatesFilter<"LearningStats"> | number
    totalTimeSpent?: IntWithAggregatesFilter<"LearningStats"> | number
    explanationTime?: IntWithAggregatesFilter<"LearningStats"> | number
    coachingTime?: IntWithAggregatesFilter<"LearningStats"> | number
    quizTime?: IntWithAggregatesFilter<"LearningStats"> | number
    weaknesses?: JsonNullableWithAggregatesFilter<"LearningStats">
    suggestions?: JsonNullableWithAggregatesFilter<"LearningStats">
    createdAt?: DateTimeWithAggregatesFilter<"LearningStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LearningStats"> | Date | string
  }

  export type LearningItemCreateInput = {
    id?: string
    text: string
    subject: string
    createdAt?: Date | string
  }

  export type LearningItemUncheckedCreateInput = {
    id?: string
    text: string
    subject: string
    createdAt?: Date | string
  }

  export type LearningItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningItemCreateManyInput = {
    id?: string
    text: string
    subject: string
    createdAt?: Date | string
  }

  export type LearningItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseItemCreateInput = {
    id?: string
    name: string
    type: string
    size: number
    lastModified: bigint | number
    text?: string | null
    ocrText?: string | null
    notes?: string | null
    dataUrl?: string | null
    include?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeBaseItemUncheckedCreateInput = {
    id?: string
    name: string
    type: string
    size: number
    lastModified: bigint | number
    text?: string | null
    ocrText?: string | null
    notes?: string | null
    dataUrl?: string | null
    include?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeBaseItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    lastModified?: BigIntFieldUpdateOperationsInput | bigint | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    ocrText?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    include?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    lastModified?: BigIntFieldUpdateOperationsInput | bigint | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    ocrText?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    include?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseItemCreateManyInput = {
    id?: string
    name: string
    type: string
    size: number
    lastModified: bigint | number
    text?: string | null
    ocrText?: string | null
    notes?: string | null
    dataUrl?: string | null
    include?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeBaseItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    lastModified?: BigIntFieldUpdateOperationsInput | bigint | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    ocrText?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    include?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    lastModified?: BigIntFieldUpdateOperationsInput | bigint | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    ocrText?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    dataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    include?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningSessionCreateInput = {
    id?: string
    conversationId: string
    subject: string
    topic: string
    aiExplanation?: string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: string
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: string | null
    finalScore?: number | null
    grade?: string | null
    region?: string | null
    reviewNotes?: string | null
    aiSummary?: string | null
    quizQuestions?: QuizQuestionCreateNestedManyWithoutSessionInput
    userAnswers?: UserAnswerCreateNestedManyWithoutSessionInput
  }

  export type LearningSessionUncheckedCreateInput = {
    id?: string
    conversationId: string
    subject: string
    topic: string
    aiExplanation?: string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: string
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: string | null
    finalScore?: number | null
    grade?: string | null
    region?: string | null
    reviewNotes?: string | null
    aiSummary?: string | null
    quizQuestions?: QuizQuestionUncheckedCreateNestedManyWithoutSessionInput
    userAnswers?: UserAnswerUncheckedCreateNestedManyWithoutSessionInput
  }

  export type LearningSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    aiExplanation?: NullableStringFieldUpdateOperationsInput | string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quizQuestions?: QuizQuestionUpdateManyWithoutSessionNestedInput
    userAnswers?: UserAnswerUpdateManyWithoutSessionNestedInput
  }

  export type LearningSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    aiExplanation?: NullableStringFieldUpdateOperationsInput | string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quizQuestions?: QuizQuestionUncheckedUpdateManyWithoutSessionNestedInput
    userAnswers?: UserAnswerUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type LearningSessionCreateManyInput = {
    id?: string
    conversationId: string
    subject: string
    topic: string
    aiExplanation?: string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: string
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: string | null
    finalScore?: number | null
    grade?: string | null
    region?: string | null
    reviewNotes?: string | null
    aiSummary?: string | null
  }

  export type LearningSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    aiExplanation?: NullableStringFieldUpdateOperationsInput | string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LearningSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    aiExplanation?: NullableStringFieldUpdateOperationsInput | string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuizQuestionCreateInput = {
    id?: string
    question: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer: string
    explanation?: string | null
    difficulty?: string
    points?: number
    order: number
    createdAt?: Date | string
    session: LearningSessionCreateNestedOneWithoutQuizQuestionsInput
    userAnswers?: UserAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuizQuestionUncheckedCreateInput = {
    id?: string
    sessionId: string
    question: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer: string
    explanation?: string | null
    difficulty?: string
    points?: number
    order: number
    createdAt?: Date | string
    userAnswers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuizQuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: LearningSessionUpdateOneRequiredWithoutQuizQuestionsNestedInput
    userAnswers?: UserAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuizQuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAnswers?: UserAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuizQuestionCreateManyInput = {
    id?: string
    sessionId: string
    question: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer: string
    explanation?: string | null
    difficulty?: string
    points?: number
    order: number
    createdAt?: Date | string
  }

  export type QuizQuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizQuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerCreateInput = {
    id?: string
    userAnswer: string
    isCorrect: boolean
    score?: number
    timeSpent?: number | null
    answeredAt?: Date | string
    question: QuizQuestionCreateNestedOneWithoutUserAnswersInput
    session: LearningSessionCreateNestedOneWithoutUserAnswersInput
  }

  export type UserAnswerUncheckedCreateInput = {
    id?: string
    sessionId: string
    questionId: string
    userAnswer: string
    isCorrect: boolean
    score?: number
    timeSpent?: number | null
    answeredAt?: Date | string
  }

  export type UserAnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuizQuestionUpdateOneRequiredWithoutUserAnswersNestedInput
    session?: LearningSessionUpdateOneRequiredWithoutUserAnswersNestedInput
  }

  export type UserAnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerCreateManyInput = {
    id?: string
    sessionId: string
    questionId: string
    userAnswer: string
    isCorrect: boolean
    score?: number
    timeSpent?: number | null
    answeredAt?: Date | string
  }

  export type UserAnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningStatsCreateInput = {
    id?: string
    conversationId: string
    totalQuestions?: number
    correctAnswers?: number
    totalScore?: number
    maxScore?: number
    accuracy?: number
    totalTimeSpent?: number
    explanationTime?: number
    coachingTime?: number
    quizTime?: number
    weaknesses?: NullableJsonNullValueInput | InputJsonValue
    suggestions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningStatsUncheckedCreateInput = {
    id?: string
    conversationId: string
    totalQuestions?: number
    correctAnswers?: number
    totalScore?: number
    maxScore?: number
    accuracy?: number
    totalTimeSpent?: number
    explanationTime?: number
    coachingTime?: number
    quizTime?: number
    weaknesses?: NullableJsonNullValueInput | InputJsonValue
    suggestions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    totalTimeSpent?: IntFieldUpdateOperationsInput | number
    explanationTime?: IntFieldUpdateOperationsInput | number
    coachingTime?: IntFieldUpdateOperationsInput | number
    quizTime?: IntFieldUpdateOperationsInput | number
    weaknesses?: NullableJsonNullValueInput | InputJsonValue
    suggestions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    totalTimeSpent?: IntFieldUpdateOperationsInput | number
    explanationTime?: IntFieldUpdateOperationsInput | number
    coachingTime?: IntFieldUpdateOperationsInput | number
    quizTime?: IntFieldUpdateOperationsInput | number
    weaknesses?: NullableJsonNullValueInput | InputJsonValue
    suggestions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningStatsCreateManyInput = {
    id?: string
    conversationId: string
    totalQuestions?: number
    correctAnswers?: number
    totalScore?: number
    maxScore?: number
    accuracy?: number
    totalTimeSpent?: number
    explanationTime?: number
    coachingTime?: number
    quizTime?: number
    weaknesses?: NullableJsonNullValueInput | InputJsonValue
    suggestions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    totalTimeSpent?: IntFieldUpdateOperationsInput | number
    explanationTime?: IntFieldUpdateOperationsInput | number
    coachingTime?: IntFieldUpdateOperationsInput | number
    quizTime?: IntFieldUpdateOperationsInput | number
    weaknesses?: NullableJsonNullValueInput | InputJsonValue
    suggestions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    totalQuestions?: IntFieldUpdateOperationsInput | number
    correctAnswers?: IntFieldUpdateOperationsInput | number
    totalScore?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    totalTimeSpent?: IntFieldUpdateOperationsInput | number
    explanationTime?: IntFieldUpdateOperationsInput | number
    coachingTime?: IntFieldUpdateOperationsInput | number
    quizTime?: IntFieldUpdateOperationsInput | number
    weaknesses?: NullableJsonNullValueInput | InputJsonValue
    suggestions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LearningItemCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    subject?: SortOrder
    createdAt?: SortOrder
  }

  export type LearningItemMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    subject?: SortOrder
    createdAt?: SortOrder
  }

  export type LearningItemMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    subject?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type KnowledgeBaseItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    size?: SortOrder
    lastModified?: SortOrder
    text?: SortOrder
    ocrText?: SortOrder
    notes?: SortOrder
    dataUrl?: SortOrder
    include?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseItemAvgOrderByAggregateInput = {
    size?: SortOrder
    lastModified?: SortOrder
  }

  export type KnowledgeBaseItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    size?: SortOrder
    lastModified?: SortOrder
    text?: SortOrder
    ocrText?: SortOrder
    notes?: SortOrder
    dataUrl?: SortOrder
    include?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    size?: SortOrder
    lastModified?: SortOrder
    text?: SortOrder
    ocrText?: SortOrder
    notes?: SortOrder
    dataUrl?: SortOrder
    include?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseItemSumOrderByAggregateInput = {
    size?: SortOrder
    lastModified?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type QuizQuestionListRelationFilter = {
    every?: QuizQuestionWhereInput
    some?: QuizQuestionWhereInput
    none?: QuizQuestionWhereInput
  }

  export type UserAnswerListRelationFilter = {
    every?: UserAnswerWhereInput
    some?: UserAnswerWhereInput
    none?: UserAnswerWhereInput
  }

  export type QuizQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LearningSessionCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    subject?: SortOrder
    topic?: SortOrder
    aiExplanation?: SortOrder
    socraticDialogue?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coachingHistory?: SortOrder
    feedback?: SortOrder
    finalScore?: SortOrder
    grade?: SortOrder
    region?: SortOrder
    reviewNotes?: SortOrder
    aiSummary?: SortOrder
  }

  export type LearningSessionAvgOrderByAggregateInput = {
    finalScore?: SortOrder
  }

  export type LearningSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    subject?: SortOrder
    topic?: SortOrder
    aiExplanation?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    feedback?: SortOrder
    finalScore?: SortOrder
    grade?: SortOrder
    region?: SortOrder
    reviewNotes?: SortOrder
    aiSummary?: SortOrder
  }

  export type LearningSessionMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    subject?: SortOrder
    topic?: SortOrder
    aiExplanation?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    feedback?: SortOrder
    finalScore?: SortOrder
    grade?: SortOrder
    region?: SortOrder
    reviewNotes?: SortOrder
    aiSummary?: SortOrder
  }

  export type LearningSessionSumOrderByAggregateInput = {
    finalScore?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type LearningSessionScalarRelationFilter = {
    is?: LearningSessionWhereInput
    isNot?: LearningSessionWhereInput
  }

  export type QuizQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    type?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrder
    difficulty?: SortOrder
    points?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type QuizQuestionAvgOrderByAggregateInput = {
    points?: SortOrder
    order?: SortOrder
  }

  export type QuizQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    type?: SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrder
    difficulty?: SortOrder
    points?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type QuizQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    question?: SortOrder
    type?: SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrder
    difficulty?: SortOrder
    points?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type QuizQuestionSumOrderByAggregateInput = {
    points?: SortOrder
    order?: SortOrder
  }

  export type QuizQuestionScalarRelationFilter = {
    is?: QuizQuestionWhereInput
    isNot?: QuizQuestionWhereInput
  }

  export type UserAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    userAnswer?: SortOrder
    isCorrect?: SortOrder
    score?: SortOrder
    timeSpent?: SortOrder
    answeredAt?: SortOrder
  }

  export type UserAnswerAvgOrderByAggregateInput = {
    score?: SortOrder
    timeSpent?: SortOrder
  }

  export type UserAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    userAnswer?: SortOrder
    isCorrect?: SortOrder
    score?: SortOrder
    timeSpent?: SortOrder
    answeredAt?: SortOrder
  }

  export type UserAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    userAnswer?: SortOrder
    isCorrect?: SortOrder
    score?: SortOrder
    timeSpent?: SortOrder
    answeredAt?: SortOrder
  }

  export type UserAnswerSumOrderByAggregateInput = {
    score?: SortOrder
    timeSpent?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type LearningStatsCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    accuracy?: SortOrder
    totalTimeSpent?: SortOrder
    explanationTime?: SortOrder
    coachingTime?: SortOrder
    quizTime?: SortOrder
    weaknesses?: SortOrder
    suggestions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningStatsAvgOrderByAggregateInput = {
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    accuracy?: SortOrder
    totalTimeSpent?: SortOrder
    explanationTime?: SortOrder
    coachingTime?: SortOrder
    quizTime?: SortOrder
  }

  export type LearningStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    accuracy?: SortOrder
    totalTimeSpent?: SortOrder
    explanationTime?: SortOrder
    coachingTime?: SortOrder
    quizTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningStatsMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    accuracy?: SortOrder
    totalTimeSpent?: SortOrder
    explanationTime?: SortOrder
    coachingTime?: SortOrder
    quizTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningStatsSumOrderByAggregateInput = {
    totalQuestions?: SortOrder
    correctAnswers?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    accuracy?: SortOrder
    totalTimeSpent?: SortOrder
    explanationTime?: SortOrder
    coachingTime?: SortOrder
    quizTime?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type QuizQuestionCreateNestedManyWithoutSessionInput = {
    create?: XOR<QuizQuestionCreateWithoutSessionInput, QuizQuestionUncheckedCreateWithoutSessionInput> | QuizQuestionCreateWithoutSessionInput[] | QuizQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutSessionInput | QuizQuestionCreateOrConnectWithoutSessionInput[]
    createMany?: QuizQuestionCreateManySessionInputEnvelope
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
  }

  export type UserAnswerCreateNestedManyWithoutSessionInput = {
    create?: XOR<UserAnswerCreateWithoutSessionInput, UserAnswerUncheckedCreateWithoutSessionInput> | UserAnswerCreateWithoutSessionInput[] | UserAnswerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutSessionInput | UserAnswerCreateOrConnectWithoutSessionInput[]
    createMany?: UserAnswerCreateManySessionInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type QuizQuestionUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<QuizQuestionCreateWithoutSessionInput, QuizQuestionUncheckedCreateWithoutSessionInput> | QuizQuestionCreateWithoutSessionInput[] | QuizQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutSessionInput | QuizQuestionCreateOrConnectWithoutSessionInput[]
    createMany?: QuizQuestionCreateManySessionInputEnvelope
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
  }

  export type UserAnswerUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<UserAnswerCreateWithoutSessionInput, UserAnswerUncheckedCreateWithoutSessionInput> | UserAnswerCreateWithoutSessionInput[] | UserAnswerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutSessionInput | UserAnswerCreateOrConnectWithoutSessionInput[]
    createMany?: UserAnswerCreateManySessionInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type QuizQuestionUpdateManyWithoutSessionNestedInput = {
    create?: XOR<QuizQuestionCreateWithoutSessionInput, QuizQuestionUncheckedCreateWithoutSessionInput> | QuizQuestionCreateWithoutSessionInput[] | QuizQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutSessionInput | QuizQuestionCreateOrConnectWithoutSessionInput[]
    upsert?: QuizQuestionUpsertWithWhereUniqueWithoutSessionInput | QuizQuestionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: QuizQuestionCreateManySessionInputEnvelope
    set?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    disconnect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    delete?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    update?: QuizQuestionUpdateWithWhereUniqueWithoutSessionInput | QuizQuestionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: QuizQuestionUpdateManyWithWhereWithoutSessionInput | QuizQuestionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
  }

  export type UserAnswerUpdateManyWithoutSessionNestedInput = {
    create?: XOR<UserAnswerCreateWithoutSessionInput, UserAnswerUncheckedCreateWithoutSessionInput> | UserAnswerCreateWithoutSessionInput[] | UserAnswerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutSessionInput | UserAnswerCreateOrConnectWithoutSessionInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutSessionInput | UserAnswerUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: UserAnswerCreateManySessionInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutSessionInput | UserAnswerUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutSessionInput | UserAnswerUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type QuizQuestionUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<QuizQuestionCreateWithoutSessionInput, QuizQuestionUncheckedCreateWithoutSessionInput> | QuizQuestionCreateWithoutSessionInput[] | QuizQuestionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutSessionInput | QuizQuestionCreateOrConnectWithoutSessionInput[]
    upsert?: QuizQuestionUpsertWithWhereUniqueWithoutSessionInput | QuizQuestionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: QuizQuestionCreateManySessionInputEnvelope
    set?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    disconnect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    delete?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    update?: QuizQuestionUpdateWithWhereUniqueWithoutSessionInput | QuizQuestionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: QuizQuestionUpdateManyWithWhereWithoutSessionInput | QuizQuestionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
  }

  export type UserAnswerUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<UserAnswerCreateWithoutSessionInput, UserAnswerUncheckedCreateWithoutSessionInput> | UserAnswerCreateWithoutSessionInput[] | UserAnswerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutSessionInput | UserAnswerCreateOrConnectWithoutSessionInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutSessionInput | UserAnswerUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: UserAnswerCreateManySessionInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutSessionInput | UserAnswerUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutSessionInput | UserAnswerUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type LearningSessionCreateNestedOneWithoutQuizQuestionsInput = {
    create?: XOR<LearningSessionCreateWithoutQuizQuestionsInput, LearningSessionUncheckedCreateWithoutQuizQuestionsInput>
    connectOrCreate?: LearningSessionCreateOrConnectWithoutQuizQuestionsInput
    connect?: LearningSessionWhereUniqueInput
  }

  export type UserAnswerCreateNestedManyWithoutQuestionInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput> | UserAnswerCreateWithoutQuestionInput[] | UserAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionInput | UserAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: UserAnswerCreateManyQuestionInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type UserAnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput> | UserAnswerCreateWithoutQuestionInput[] | UserAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionInput | UserAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: UserAnswerCreateManyQuestionInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type LearningSessionUpdateOneRequiredWithoutQuizQuestionsNestedInput = {
    create?: XOR<LearningSessionCreateWithoutQuizQuestionsInput, LearningSessionUncheckedCreateWithoutQuizQuestionsInput>
    connectOrCreate?: LearningSessionCreateOrConnectWithoutQuizQuestionsInput
    upsert?: LearningSessionUpsertWithoutQuizQuestionsInput
    connect?: LearningSessionWhereUniqueInput
    update?: XOR<XOR<LearningSessionUpdateToOneWithWhereWithoutQuizQuestionsInput, LearningSessionUpdateWithoutQuizQuestionsInput>, LearningSessionUncheckedUpdateWithoutQuizQuestionsInput>
  }

  export type UserAnswerUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput> | UserAnswerCreateWithoutQuestionInput[] | UserAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionInput | UserAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutQuestionInput | UserAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: UserAnswerCreateManyQuestionInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutQuestionInput | UserAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutQuestionInput | UserAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type UserAnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput> | UserAnswerCreateWithoutQuestionInput[] | UserAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionInput | UserAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutQuestionInput | UserAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: UserAnswerCreateManyQuestionInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutQuestionInput | UserAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutQuestionInput | UserAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type QuizQuestionCreateNestedOneWithoutUserAnswersInput = {
    create?: XOR<QuizQuestionCreateWithoutUserAnswersInput, QuizQuestionUncheckedCreateWithoutUserAnswersInput>
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutUserAnswersInput
    connect?: QuizQuestionWhereUniqueInput
  }

  export type LearningSessionCreateNestedOneWithoutUserAnswersInput = {
    create?: XOR<LearningSessionCreateWithoutUserAnswersInput, LearningSessionUncheckedCreateWithoutUserAnswersInput>
    connectOrCreate?: LearningSessionCreateOrConnectWithoutUserAnswersInput
    connect?: LearningSessionWhereUniqueInput
  }

  export type QuizQuestionUpdateOneRequiredWithoutUserAnswersNestedInput = {
    create?: XOR<QuizQuestionCreateWithoutUserAnswersInput, QuizQuestionUncheckedCreateWithoutUserAnswersInput>
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutUserAnswersInput
    upsert?: QuizQuestionUpsertWithoutUserAnswersInput
    connect?: QuizQuestionWhereUniqueInput
    update?: XOR<XOR<QuizQuestionUpdateToOneWithWhereWithoutUserAnswersInput, QuizQuestionUpdateWithoutUserAnswersInput>, QuizQuestionUncheckedUpdateWithoutUserAnswersInput>
  }

  export type LearningSessionUpdateOneRequiredWithoutUserAnswersNestedInput = {
    create?: XOR<LearningSessionCreateWithoutUserAnswersInput, LearningSessionUncheckedCreateWithoutUserAnswersInput>
    connectOrCreate?: LearningSessionCreateOrConnectWithoutUserAnswersInput
    upsert?: LearningSessionUpsertWithoutUserAnswersInput
    connect?: LearningSessionWhereUniqueInput
    update?: XOR<XOR<LearningSessionUpdateToOneWithWhereWithoutUserAnswersInput, LearningSessionUpdateWithoutUserAnswersInput>, LearningSessionUncheckedUpdateWithoutUserAnswersInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type QuizQuestionCreateWithoutSessionInput = {
    id?: string
    question: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer: string
    explanation?: string | null
    difficulty?: string
    points?: number
    order: number
    createdAt?: Date | string
    userAnswers?: UserAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuizQuestionUncheckedCreateWithoutSessionInput = {
    id?: string
    question: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer: string
    explanation?: string | null
    difficulty?: string
    points?: number
    order: number
    createdAt?: Date | string
    userAnswers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuizQuestionCreateOrConnectWithoutSessionInput = {
    where: QuizQuestionWhereUniqueInput
    create: XOR<QuizQuestionCreateWithoutSessionInput, QuizQuestionUncheckedCreateWithoutSessionInput>
  }

  export type QuizQuestionCreateManySessionInputEnvelope = {
    data: QuizQuestionCreateManySessionInput | QuizQuestionCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type UserAnswerCreateWithoutSessionInput = {
    id?: string
    userAnswer: string
    isCorrect: boolean
    score?: number
    timeSpent?: number | null
    answeredAt?: Date | string
    question: QuizQuestionCreateNestedOneWithoutUserAnswersInput
  }

  export type UserAnswerUncheckedCreateWithoutSessionInput = {
    id?: string
    questionId: string
    userAnswer: string
    isCorrect: boolean
    score?: number
    timeSpent?: number | null
    answeredAt?: Date | string
  }

  export type UserAnswerCreateOrConnectWithoutSessionInput = {
    where: UserAnswerWhereUniqueInput
    create: XOR<UserAnswerCreateWithoutSessionInput, UserAnswerUncheckedCreateWithoutSessionInput>
  }

  export type UserAnswerCreateManySessionInputEnvelope = {
    data: UserAnswerCreateManySessionInput | UserAnswerCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type QuizQuestionUpsertWithWhereUniqueWithoutSessionInput = {
    where: QuizQuestionWhereUniqueInput
    update: XOR<QuizQuestionUpdateWithoutSessionInput, QuizQuestionUncheckedUpdateWithoutSessionInput>
    create: XOR<QuizQuestionCreateWithoutSessionInput, QuizQuestionUncheckedCreateWithoutSessionInput>
  }

  export type QuizQuestionUpdateWithWhereUniqueWithoutSessionInput = {
    where: QuizQuestionWhereUniqueInput
    data: XOR<QuizQuestionUpdateWithoutSessionInput, QuizQuestionUncheckedUpdateWithoutSessionInput>
  }

  export type QuizQuestionUpdateManyWithWhereWithoutSessionInput = {
    where: QuizQuestionScalarWhereInput
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyWithoutSessionInput>
  }

  export type QuizQuestionScalarWhereInput = {
    AND?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
    OR?: QuizQuestionScalarWhereInput[]
    NOT?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
    id?: StringFilter<"QuizQuestion"> | string
    sessionId?: StringFilter<"QuizQuestion"> | string
    question?: StringFilter<"QuizQuestion"> | string
    type?: StringFilter<"QuizQuestion"> | string
    options?: JsonNullableFilter<"QuizQuestion">
    correctAnswer?: StringFilter<"QuizQuestion"> | string
    explanation?: StringNullableFilter<"QuizQuestion"> | string | null
    difficulty?: StringFilter<"QuizQuestion"> | string
    points?: IntFilter<"QuizQuestion"> | number
    order?: IntFilter<"QuizQuestion"> | number
    createdAt?: DateTimeFilter<"QuizQuestion"> | Date | string
  }

  export type UserAnswerUpsertWithWhereUniqueWithoutSessionInput = {
    where: UserAnswerWhereUniqueInput
    update: XOR<UserAnswerUpdateWithoutSessionInput, UserAnswerUncheckedUpdateWithoutSessionInput>
    create: XOR<UserAnswerCreateWithoutSessionInput, UserAnswerUncheckedCreateWithoutSessionInput>
  }

  export type UserAnswerUpdateWithWhereUniqueWithoutSessionInput = {
    where: UserAnswerWhereUniqueInput
    data: XOR<UserAnswerUpdateWithoutSessionInput, UserAnswerUncheckedUpdateWithoutSessionInput>
  }

  export type UserAnswerUpdateManyWithWhereWithoutSessionInput = {
    where: UserAnswerScalarWhereInput
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyWithoutSessionInput>
  }

  export type UserAnswerScalarWhereInput = {
    AND?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
    OR?: UserAnswerScalarWhereInput[]
    NOT?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
    id?: StringFilter<"UserAnswer"> | string
    sessionId?: StringFilter<"UserAnswer"> | string
    questionId?: StringFilter<"UserAnswer"> | string
    userAnswer?: StringFilter<"UserAnswer"> | string
    isCorrect?: BoolFilter<"UserAnswer"> | boolean
    score?: IntFilter<"UserAnswer"> | number
    timeSpent?: IntNullableFilter<"UserAnswer"> | number | null
    answeredAt?: DateTimeFilter<"UserAnswer"> | Date | string
  }

  export type LearningSessionCreateWithoutQuizQuestionsInput = {
    id?: string
    conversationId: string
    subject: string
    topic: string
    aiExplanation?: string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: string
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: string | null
    finalScore?: number | null
    grade?: string | null
    region?: string | null
    reviewNotes?: string | null
    aiSummary?: string | null
    userAnswers?: UserAnswerCreateNestedManyWithoutSessionInput
  }

  export type LearningSessionUncheckedCreateWithoutQuizQuestionsInput = {
    id?: string
    conversationId: string
    subject: string
    topic: string
    aiExplanation?: string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: string
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: string | null
    finalScore?: number | null
    grade?: string | null
    region?: string | null
    reviewNotes?: string | null
    aiSummary?: string | null
    userAnswers?: UserAnswerUncheckedCreateNestedManyWithoutSessionInput
  }

  export type LearningSessionCreateOrConnectWithoutQuizQuestionsInput = {
    where: LearningSessionWhereUniqueInput
    create: XOR<LearningSessionCreateWithoutQuizQuestionsInput, LearningSessionUncheckedCreateWithoutQuizQuestionsInput>
  }

  export type UserAnswerCreateWithoutQuestionInput = {
    id?: string
    userAnswer: string
    isCorrect: boolean
    score?: number
    timeSpent?: number | null
    answeredAt?: Date | string
    session: LearningSessionCreateNestedOneWithoutUserAnswersInput
  }

  export type UserAnswerUncheckedCreateWithoutQuestionInput = {
    id?: string
    sessionId: string
    userAnswer: string
    isCorrect: boolean
    score?: number
    timeSpent?: number | null
    answeredAt?: Date | string
  }

  export type UserAnswerCreateOrConnectWithoutQuestionInput = {
    where: UserAnswerWhereUniqueInput
    create: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type UserAnswerCreateManyQuestionInputEnvelope = {
    data: UserAnswerCreateManyQuestionInput | UserAnswerCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type LearningSessionUpsertWithoutQuizQuestionsInput = {
    update: XOR<LearningSessionUpdateWithoutQuizQuestionsInput, LearningSessionUncheckedUpdateWithoutQuizQuestionsInput>
    create: XOR<LearningSessionCreateWithoutQuizQuestionsInput, LearningSessionUncheckedCreateWithoutQuizQuestionsInput>
    where?: LearningSessionWhereInput
  }

  export type LearningSessionUpdateToOneWithWhereWithoutQuizQuestionsInput = {
    where?: LearningSessionWhereInput
    data: XOR<LearningSessionUpdateWithoutQuizQuestionsInput, LearningSessionUncheckedUpdateWithoutQuizQuestionsInput>
  }

  export type LearningSessionUpdateWithoutQuizQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    aiExplanation?: NullableStringFieldUpdateOperationsInput | string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    userAnswers?: UserAnswerUpdateManyWithoutSessionNestedInput
  }

  export type LearningSessionUncheckedUpdateWithoutQuizQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    aiExplanation?: NullableStringFieldUpdateOperationsInput | string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    userAnswers?: UserAnswerUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type UserAnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: UserAnswerWhereUniqueInput
    update: XOR<UserAnswerUpdateWithoutQuestionInput, UserAnswerUncheckedUpdateWithoutQuestionInput>
    create: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type UserAnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: UserAnswerWhereUniqueInput
    data: XOR<UserAnswerUpdateWithoutQuestionInput, UserAnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type UserAnswerUpdateManyWithWhereWithoutQuestionInput = {
    where: UserAnswerScalarWhereInput
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyWithoutQuestionInput>
  }

  export type QuizQuestionCreateWithoutUserAnswersInput = {
    id?: string
    question: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer: string
    explanation?: string | null
    difficulty?: string
    points?: number
    order: number
    createdAt?: Date | string
    session: LearningSessionCreateNestedOneWithoutQuizQuestionsInput
  }

  export type QuizQuestionUncheckedCreateWithoutUserAnswersInput = {
    id?: string
    sessionId: string
    question: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer: string
    explanation?: string | null
    difficulty?: string
    points?: number
    order: number
    createdAt?: Date | string
  }

  export type QuizQuestionCreateOrConnectWithoutUserAnswersInput = {
    where: QuizQuestionWhereUniqueInput
    create: XOR<QuizQuestionCreateWithoutUserAnswersInput, QuizQuestionUncheckedCreateWithoutUserAnswersInput>
  }

  export type LearningSessionCreateWithoutUserAnswersInput = {
    id?: string
    conversationId: string
    subject: string
    topic: string
    aiExplanation?: string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: string
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: string | null
    finalScore?: number | null
    grade?: string | null
    region?: string | null
    reviewNotes?: string | null
    aiSummary?: string | null
    quizQuestions?: QuizQuestionCreateNestedManyWithoutSessionInput
  }

  export type LearningSessionUncheckedCreateWithoutUserAnswersInput = {
    id?: string
    conversationId: string
    subject: string
    topic: string
    aiExplanation?: string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: string
    isCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: string | null
    finalScore?: number | null
    grade?: string | null
    region?: string | null
    reviewNotes?: string | null
    aiSummary?: string | null
    quizQuestions?: QuizQuestionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type LearningSessionCreateOrConnectWithoutUserAnswersInput = {
    where: LearningSessionWhereUniqueInput
    create: XOR<LearningSessionCreateWithoutUserAnswersInput, LearningSessionUncheckedCreateWithoutUserAnswersInput>
  }

  export type QuizQuestionUpsertWithoutUserAnswersInput = {
    update: XOR<QuizQuestionUpdateWithoutUserAnswersInput, QuizQuestionUncheckedUpdateWithoutUserAnswersInput>
    create: XOR<QuizQuestionCreateWithoutUserAnswersInput, QuizQuestionUncheckedCreateWithoutUserAnswersInput>
    where?: QuizQuestionWhereInput
  }

  export type QuizQuestionUpdateToOneWithWhereWithoutUserAnswersInput = {
    where?: QuizQuestionWhereInput
    data: XOR<QuizQuestionUpdateWithoutUserAnswersInput, QuizQuestionUncheckedUpdateWithoutUserAnswersInput>
  }

  export type QuizQuestionUpdateWithoutUserAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: LearningSessionUpdateOneRequiredWithoutQuizQuestionsNestedInput
  }

  export type QuizQuestionUncheckedUpdateWithoutUserAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningSessionUpsertWithoutUserAnswersInput = {
    update: XOR<LearningSessionUpdateWithoutUserAnswersInput, LearningSessionUncheckedUpdateWithoutUserAnswersInput>
    create: XOR<LearningSessionCreateWithoutUserAnswersInput, LearningSessionUncheckedCreateWithoutUserAnswersInput>
    where?: LearningSessionWhereInput
  }

  export type LearningSessionUpdateToOneWithWhereWithoutUserAnswersInput = {
    where?: LearningSessionWhereInput
    data: XOR<LearningSessionUpdateWithoutUserAnswersInput, LearningSessionUncheckedUpdateWithoutUserAnswersInput>
  }

  export type LearningSessionUpdateWithoutUserAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    aiExplanation?: NullableStringFieldUpdateOperationsInput | string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quizQuestions?: QuizQuestionUpdateManyWithoutSessionNestedInput
  }

  export type LearningSessionUncheckedUpdateWithoutUserAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    aiExplanation?: NullableStringFieldUpdateOperationsInput | string | null
    socraticDialogue?: NullableJsonNullValueInput | InputJsonValue
    currentStep?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coachingHistory?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    finalScore?: NullableIntFieldUpdateOperationsInput | number | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quizQuestions?: QuizQuestionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type QuizQuestionCreateManySessionInput = {
    id?: string
    question: string
    type: string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer: string
    explanation?: string | null
    difficulty?: string
    points?: number
    order: number
    createdAt?: Date | string
  }

  export type UserAnswerCreateManySessionInput = {
    id?: string
    questionId: string
    userAnswer: string
    isCorrect: boolean
    score?: number
    timeSpent?: number | null
    answeredAt?: Date | string
  }

  export type QuizQuestionUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAnswers?: UserAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuizQuestionUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAnswers?: UserAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuizQuestionUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    options?: NullableJsonNullValueInput | InputJsonValue
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuizQuestionUpdateOneRequiredWithoutUserAnswersNestedInput
  }

  export type UserAnswerUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerCreateManyQuestionInput = {
    id?: string
    sessionId: string
    userAnswer: string
    isCorrect: boolean
    score?: number
    timeSpent?: number | null
    answeredAt?: Date | string
  }

  export type UserAnswerUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: LearningSessionUpdateOneRequiredWithoutUserAnswersNestedInput
  }

  export type UserAnswerUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userAnswer?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}