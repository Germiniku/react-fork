let state = {number:0};
let callbacks = [];
callbacks.push((state) => ({number:state.number + 1}));
callbacks.push((state) => ({number:state.number + 1}));
callbacks.push((state) => ({number:state.number + 1}));
let cb;
while((cb = callbacks.shift())){
    Object.assign(state,cb(state));
}
console.log(state);