// centralized data
const data = {};

// data handler
export const store = {
    getAll: () => data,
    get: (key) => data[key],
    set: (key, value) => data[key] = value
};
