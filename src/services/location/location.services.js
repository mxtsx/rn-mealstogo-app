import {locations} from "./location.mock";
import camelize from "camelize";

export const locationRequest = (searchTerm = 'san francisco') => {
    return new Promise((resolve, reject) => {
        const locationMock = locations[searchTerm]
        if (!locationMock) {
            reject('Not found')
        }
        resolve(locationMock)
    })
}

export const locationTransform = (result) => {
    const {geometry = {}} = camelize(result.results)[0]
    const {lat, lng} = geometry?.location
    const viewport = geometry?.viewport
    return {lat, lng, viewport}
}