// Higher Order Component
// Wraps components in case you need to return only one component

const Hoc = (props) =>(
  props.children
)

export default Hoc;