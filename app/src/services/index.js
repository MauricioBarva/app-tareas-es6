import { Global } from './global';
var url = Global.url;

export function getTasks(fn) {
    return fetch(url + 'tasks')
        .then(data => data.json())
        .then(shows => {
            fn(shows.tasks);
        })
        .catch(err => console.log(err));
}

export function deleteTask(id) {
    return fetch(url + 'delete-task/' + id, {
        method: 'DELETE'
    }).catch(err => console.log(err));
}

export function addTask(task) {
    return fetch(url + 'save-task/', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
    }).catch(err => console.log(err));
}

export function updateTask(id, task) {
    return fetch(url + 'edit-task/' + id, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
    }).catch(err => console.log(err));
}