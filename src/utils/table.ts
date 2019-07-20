import findIndex from "ramda/es/findIndex";
import append from "ramda/es/append";
import reject from "ramda/es/reject";
import eqProps from "ramda/es/eqProps";

export type Table<T extends { id: string }> = T[]

export type TableElementType<T> = T extends Table<infer El> ? El : any;

export function create<T extends { id: string }>(): Table<T> {
  return []
}

export const ensureMembership = <T extends { id: string }>(member: T) => (list: T[]) => {
  if (findIndex(eqProps("id", member), list) < 0) {
    return append(member, list)
  } else {
    return list;
  }
}

export const ensureExclusion = <T extends { id: string }>(memberId: string) => (list: T[]) => {
  return reject(({ id }) => memberId === id, list)
}