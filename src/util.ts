
export const hexify = (x: number): string => {
    let toReturn = x.toString(16)
    return toReturn.length < 2 ? '0' + toReturn : toReturn
}