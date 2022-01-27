export const getArrayLength = (arr = [], filter, activeCategory, setTaskByCategory) => {


    if (filter === 'all' && activeCategory) {

        let arrFilered = arr.filter(task => {
            if (task.task_category.uuid == activeCategory.value) {
                return task
            }
        })

        setTaskByCategory(arrFilered.length)

    } else if (filter === 'completed' && activeCategory) {
        let arrFilered = arr.filter(task => {
            if (task.task_category.uuid == activeCategory.value && task.completed) {
                return task
            }
        })

        setTaskByCategory(arrFilered.length)

    } else if (filter === 'todo' && activeCategory) {
        let arrFilered = arr.filter(task => {
            if (task.task_category.uuid == activeCategory.value && !task.completed) {
                return task
            }
        })

        setTaskByCategory(arrFilered.length)

    }

}