
export const capitalizeText = (sentence) => {

    const arrName = sentence.split(' ')
    const capitalizedName = arrName.map(name => name[0].toUpperCase() + name.slice(1)).join(' ')
    return capitalizedName

}
export const capitalizeWord = (sentence) => {

    return sentence[0].toUpperCase() + sentence.slice(1)

}

