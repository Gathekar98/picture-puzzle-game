export function shuffledIndices(n:number): number[]{
    const arr = Array.from({length: n}, (_,i) => i);
    let isSolved = true;

    while(isSolved){
        for(let i = arr.length-1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        isSolved = arr.every((value, index) => value === index);
    }
    return arr;
}

export function isSolved(pieces: number[]): boolean{
    return pieces.every((value, index) => value === index);
}