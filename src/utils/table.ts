export type Table<T extends { id: string }> = Map<T["id"], T>

export function create<T extends { id: string }>(): Table<T> {
  return new Map()
}