import { useState } from 'react'

export const UseForm = (initialState = {}) => {
    const [stateValues, setstateValues] = useState(initialState)


    const resetState = () => {
        setstateValues(initialState)
    }

    const handleInputChange = ({ target }) => {
        setstateValues({
            ...stateValues,
            [target.name]: target.value

        })




    }
    return [stateValues, handleInputChange, resetState, setstateValues]



}