export const addTodo = (list, item) => [...list, item]/* list.concat(item) */

export const generateId = () => Math.floor(Math.random()*100000)

export const findById = (id, list) => list.find(item => item.id === id)

export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete})
/* passedin in todos ppty into the new obj by spread operator n 
    overwrite the isComplete ppty with the opp. of existing 
    todos' isComplete ppty*/

export const updateTodo = (list, updated) => {
    const updatedIndex = list.findIndex(item => item.id === updated.id)

    return [
        ...list.slice(0, updatedIndex),
        updated,
        ...list.slice(updatedIndex+1)
    ]
}

export const removeTodo = (list, id) => {
    const removeIndex = list.findIndex(item => item.id === id)

    return [
        ...list.slice(0, removeIndex),//... to spread those items into the new array
        ...list.slice(removeIndex+1)
    ]
}

export const filterTodos = (list, route) => {
    switch(route){
        case '/active':
            return list.filter(item => !item.isComplete)
        case '/complete':
            return list.filter(item => item.isComplete)
        default:
            return list
    }
}