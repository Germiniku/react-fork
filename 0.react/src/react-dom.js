
function render(element,parentNode){
    if(typeof element === 'string' || typeof element === 'number'){
        return parentNode.appendChild(document.createTextNode(element));
    };
    let type,props;    // "span" Welcome
    type = element.type;
    props = element.props;
    if (type.isReactComponent === true){
        let returnedElement = new type(props).render();
        type = returnedElement.type; // "h1"
        props = returnedElement.props;
    }else if(typeof type === 'function'){
        let returnedElement = type(props);
        type = returnedElement.type; // "h1"
        props = returnedElement.props;
    }
    let domElement = document.createElement(type); // span
    for(let propName in props){
        if(propName === 'className'){
            document.className = props[propName];
        }else if(propName === 'style'){
            let styleObj = props[propName];
            /*
            for(let style in styleObj){
                domElement.style[style] = styleObj[style];
            }
            */
            // ['color','fontSize'] => ['color:red','fontSize:50px'] => 'color:red;fontSize:50px'
            // => 'color:red;font-size:50px'
            let cssText = Object.keys(styleObj).map(attr => {
                return `${attr.replace(/([A-Z])/g,()=>{
                    return '-'+arguments[1].toLowerCase()
                })}:${styleObj[attr]}`;
            }).join(';');
            document.styleSheets.cssText = cssText;
        }else if(propName === 'children'){
            let children = Array.isArray(props.children) ? props.children : [props.children]
            children.forEach(child => render(child));
        }else{
            domElement.setAttribute(propName,props[propName]);
        }
    }
    parentNode.appendChild(domElement);
}

export default {render}