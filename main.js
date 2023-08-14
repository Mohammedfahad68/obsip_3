window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        
        if (!taskText) {
            alert('No task has been addede');
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");
        
        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
        task_content_el.innerText = taskText;
        task_el.appendChild(task_content_el);

        const actions_el = document.createElement("div");
        actions_el.classList.add("actions");
        
        const edit_button = document.createElement("button");
        edit_button.classList.add("edit");
        edit_button.innerText = "Edit";
        actions_el.appendChild(edit_button);
        
        const delete_button = document.createElement("button");
        delete_button.classList.add("delete");
        delete_button.innerText = "Delete";
        actions_el.appendChild(delete_button);
        
        task_el.appendChild(actions_el);
        list_el.appendChild(task_el);

        input.value = "";

        edit_button.addEventListener('click', () => {
            if (task_content_el.isContentEditable) {
                task_content_el.contentEditable = false;
                edit_button.innerText = "Edit";
            } else {
                task_content_el.contentEditable = true;
                task_content_el.focus();
                placeCaretAtEnd(task_content_el); 
                edit_button.innerText = "Save";
            }
            if (!task_content_el.isContentEditable && task_content_el.innerText.trim() === '') {
                alert('Edited task content cannot be empty.');
                task_content_el.contentEditable = true;
                task_content_el.focus();
                placeCaretAtEnd(task_content_el); 
                edit_button.innerText = "Save";
            }
        });

        delete_button.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });
    });
});


function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
