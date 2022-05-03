const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag == 'function') {
      return tag(props)
    }
    const element = {
      tag,
      props: {
        ...props,
        children
      }
    }
    // console.log("createElement: ", element)
    return element
  }
}

const ReactDOM = {
  createRoot: (container: Element) => {
    const render = (element, parentElement?) => {
      if (typeof element === 'string' || typeof element === 'number') {
        let textNode = document.createTextNode(String(element))
        parentElement.appendChild(textNode)
        return
      }
      const {tag, props} = element
      let tagElement = document.createElement(tag)
      if (props) {
        Object.keys(props).filter(prop => prop !== 'children'
            && !prop.includes("__")
        ).forEach(key => {
          tagElement[key] = props[key]
        })
      }

      if (props.children) {
        props.children.forEach(child => {
          render(child, tagElement)
        })
      }
      if (parentElement) {
        parentElement.appendChild(tagElement)
      } else {
        container.appendChild(tagElement)
      }
    }
    return {
      render
    }
  }
}

// 改造成函数式组件
const App = () => {
  return (
      <div id={ 'react-from-scratch' } className={ 'container' } something={ 'shuffle' }>
        <h1 className={ 'hello' }>Hello, Starry~</h1>
        <div title={ 123 }>
          <h1>Say Hello</h1>
          <span>zzStar</span>
        </div>
        <h1>something</h1>
      </div>
  )
}

/*const node = (
    <div id={ 'react-from-scratch' } something={ 'shuffle' }>
      <h1 class={ 'hello' }>Hello, Starry~</h1>
      <div title={ 123 }>
        <h1>Say Hello</h1>
        <span>zzStar</span>
      </div>
      <h1>something</h1>
    </div>
)*/

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App/>)
