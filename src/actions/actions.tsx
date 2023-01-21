const strToArray = (str: string) => {
    return str.replace(/\s/g, "").toLowerCase().split("#").filter(tag => tag !== "");
}

export { strToArray };