
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const shortHash = (hash: string, check: boolean) => {
    if(check) {
        return `${hash.slice(0, 4)}...${hash.slice(-4)}`
    } else {
        return hash
    }
}