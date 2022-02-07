export const getArrayLength = (arr = [], filter, activeCategory, setTasksLength) => {

    if (activeCategory) {

        if (filter === 'all') {

            let arrFilered = arr.filter(task => {
                return (task.task_category.uuid === activeCategory.value)

            })

            setTasksLength(arrFilered.length)

        } else if (filter === 'completed') {
            let arrFilered = arr.filter(task => {
                return (task.task_category.uuid === activeCategory.value && task.completed)

            })

            setTasksLength(arrFilered.length)

        } else if (filter === 'todo') {
            let arrFilered = arr.filter(task => {
                return (task.task_category.uuid === activeCategory.value && !task.completed)

            })

            setTasksLength(arrFilered.length)

        }

    } else {
        if (filter === 'all') {



            setTasksLength(arr.length)

        } else if (filter === 'completed') {



            let arrFilered = arr.filter(task => {
                return (task.completed === true)

            })

            setTasksLength(arrFilered.length)

        } else if (filter === 'todo') {

            let arrFilered = arr.filter(task => {
                return (task.completed === false)

            })

            setTasksLength(arrFilered.length)

        }

    }




}