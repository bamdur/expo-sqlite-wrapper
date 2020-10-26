// import { ResultSet } from "./Connection"
// import { Schema, SQLiteType } from "./dao/schema"


// function mapResultSet<T>(resultSet: ResultSet<T>, schema: Schema<T>): T[] {
//   let model: T[] = {};
//   resultSet.rows.forEach(row => {
//     model[]
//   })
//   Object.entries(schema)
//   // const data: T[] = [];
//   // for ()
//   // for (const column of schema.)
// }

// function toDatabaseValue<T>(schema: Schema<T>, model: T) {
//   return Object.entries<>(model).reduce((row: any, columnPair) => {
//     // @ts-ignore
//     row[columnPair[0]] = propertyToDatabaseValue(schema[columnPair[0]].type, columnPair[1]);
//     return row;
//   }, {})
// }

// function toModelValue<T>(schema: Schema<T>, model: T) {
//   return Object.entries(schema).reduce((mappedModel, options) => {
//     const {type} = options
//     if (model.hasOwnProperty(options[0])) {
//       name[options[0]] = propertyToModelValue(options[1].type, obj[options[0]])
//     }
//     return name
//   }, {})
// }

// function propertyToDatabaseValue(type: SQLiteType, value: any) {
//   switch (type) {
//     case SQLiteType.JSON:
//       return JSON.stringify(value)
//     case SQLiteType.BOOLEAN:
//       return value ? 1 : 0
//     default:
//       return value
//   }
// }

// function propertyToModelValue(type: SQLiteType, value: any) {
//   switch (type) {
//     case SQLiteType.JSON:
//       return JSON.parse(value || null)
//     case SQLiteType.BOOLEAN:
//       return Boolean(value)
//     default:
//       return value
//   }
// }
