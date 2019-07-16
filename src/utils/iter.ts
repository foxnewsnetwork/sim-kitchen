export function* range(start: number, finish: number, step: number = 1) {
  for(let k = start; k < finish; k++) {
    yield k
  }  
}

