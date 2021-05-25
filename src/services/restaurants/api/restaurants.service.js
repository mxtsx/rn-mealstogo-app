import {mocks} from "../mock";

export const restaurantsRequest = (location = '37.7749295,-122.4194155') => {
    return new Promise((resolve, reject) => {
        const mock = mocks[location]
        if(!mock) {
            reject('Not found')
        }
        resolve(mock)
    })
}