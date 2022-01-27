export const getArrayLength = (arr = [], filter, activeCategory, setTaskByCategory) => {


    if (filter === 'all' && activeCategory) {

        let arrFilered = arr.filter(task => {
            return (task.task_category.uuid === activeCategory.value)

        })

        setTaskByCategory(arrFilered.length)

    } else if (filter === 'completed' && activeCategory) {
        let arrFilered = arr.filter(task => {
            return (task.task_category.uuid === activeCategory.value && task.completed)

        })

        setTaskByCategory(arrFilered.length)

    } else if (filter === 'todo' && activeCategory) {
        let arrFilered = arr.filter(task => {
            return (task.task_category.uuid === activeCategory.value && !task.completed)

        })

        setTaskByCategory(arrFilered.length)

    }

}