export default {
  cssGrid(props, actions){
    let layout = props.concat(actions)
    const columns = layout.reduce((columns_count, comp) => {
      const maxWidth = comp.w + comp.x
      if (columns_count < maxWidth) {
        return maxWidth
      }
      return columns_count
    }
      , 0)
    const rows =layout.reduce((rows_count, comp) => {
      const maxHeight = comp.h + comp.y
      if (rows_count < maxHeight) {
        return maxHeight
      }
      return rows_count
    }
      , 0)

    const filledRows = new Array(rows).fill(new Array(columns).fill("."))
    const grid = filledRows.map((item, row) => item.map((cell, column) => {
      for (let component of layout) {
        const startCoordinateX = component.x
        const startCoordinateY = component.y
        const endCoordinateX = startCoordinateX + component.w - 1
        const endCoordinateY = startCoordinateY + component.h - 1
        if (
          row <=endCoordinateY && 
          row>=startCoordinateY && 
          column<=endCoordinateX && 
          column >= startCoordinateX
        ){
          return component.i
        }
      }
      return cell
    }))

    return grid.reduce((template, line)=>{
      template+=`'${line.join(" ")}'`
      template+="\n"
      return template
    },"")
    
  }
}