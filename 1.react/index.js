class Transaction {
  constructor(wrappers) {
    this.wrappers = wrappers; //{initialize,close}
  }
  perform(anyMethod) {
    this.wrappers.forEach((wrapper) => wrapper.initialize());
    anyMethod.call();
    this.wrappers.forEach((wrapper) => wrapper.close());
  }
}

let batchingStrategy = {
  isBatchingUpdates: false, // 默认非批量更新
  dirtyComponents: [], // 脏组件
  batchedUpdates() {
    this.dirtyComponents.forEach((component) => component.updateComponent());
  },
};

class Updater {
  constructor(component) {
    this.component = component;
    this.pendingStates = [];
  }
  addState(partcialState) {
    this.pendingStates.push(partcialState);
    batchingStrategy.isBatchingUpdates
      ? batchingStrategy.dirtyComponents.push(this.component)
      : this.component.updateComponent();
  }
}

class Component {
  constructor(props) {
    this.props = props;
    this.$updater = new Updater(this);
  }
  createDOMFromDOMString() {
    let renderString = this.render();
    let div = document.createElement("div");
    div.innerHTML = renderString;
    this.domElement = div.children[0];
    this.domElement.component = this;
    return this.domElement;
  }
  setState(partcialState) {
    this.$updater.addState(partcialState);
  }
  updateComponent() {
    // 批量合并所有state
    this.$updater.pendingStates.forEach((state) => {
      Object.assign(this.state, state);
    });
    this.$updater.pendingStates.length = 0;
    let oldElement = this.domElement;
    let newElement = this.createDOMFromDOMString();
    oldElement.parentElement().replaceChild(newElement, oldElement);
  }
  mount(container) {
    container.appendChild(this.createDOMFromDOMString());
  }
}

let transaction = new Transaction([
  {
    initialize() {
      batchingStrategy.isBatchingUpdates = true; // 开启批量更新模式
    },
    close() {
      // 更新所有脏组件
      batchingStrategy.isBatchingUpdates = false;
      batchingStrategy.batchedUpdates();
    },
  },
]);

window.trigger = function (event, method) {
  let component = event.target.component;
  transaction.perform(component[method].bind(component));
};

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  add() {
    this.setState({ number: this.state.number + 1 });
  }
  render() {
    return `<button onClick="trigger(event,'add')">
        ${this.props.name}:${this.state.number}
        </button>`;
  }
}
