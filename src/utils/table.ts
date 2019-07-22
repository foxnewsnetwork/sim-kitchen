import findIndex from "ramda/es/findIndex";
import append from "ramda/es/append";
import reject from "ramda/es/reject";
import eqProps from "ramda/es/eqProps";

export type Entry = { id: string }

export type BelongsTo<T extends Entry> = {
  id: T["id"]
}

export function belongsTo<T extends Entry>(id: T["id"]): BelongsTo<T> {
  return { id }
}

export type HasMany<T extends Entry> = {
  ids: Array<T["id"]>
}

export function hasMany<T extends Entry>(): HasMany<T> {
  return { ids: [] }
}

export type Table<T extends Entry> = T[]

export type TableElementType<T> = T extends Table<infer El> ? El : any;

export function create<T extends Entry>(): Table<T> {
  return []
}

export const ensureMembership = <T extends Entry>(member: T) => (list: T[]) => {
  if (findIndex(eqProps("id", member), list) < 0) {
    return append(member, list)
  } else {
    return list;
  }
}

export const ensureExclusion = <T extends Entry>(memberId: string) => (list: T[]) => {
  return reject(({ id }) => memberId === id, list)
}