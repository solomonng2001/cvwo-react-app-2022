const strToArray = (str: string) => {
    return str.replace(/\s/g, "").toLowerCase().split("#").filter(tag => tag !== "");
}

const arrayStrToStr = (arrayStr: string) => {
    return "#" + arrayStr.split(",").join("#");
}

export { strToArray, arrayStrToStr };