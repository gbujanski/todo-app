let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

$.map(tasks, (el, i) => {
  $('ul').append(
    `<li class="list-group-item ${el.isDone ? 'task-done' : 'task-undone'}" key=${el.id}> 
      ${el.description} 
    </li>`
  );
});

const updateLocalStore = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const clearLocalStore = () => {
  localStorage.removeItem('tasks');
};

$('#add-task').click(() => {
  const tasknumber = tasks.length + 1;
  const taskDescription = `Task number ${tasknumber}`;
  const id = tasknumber
  tasks.push({ id: id, description: taskDescription, isDone: false });

  $('ul')
    .append(
      `<li class='list-group-item' key=${id}>
        ${taskDescription}
      </li>`
    )
    .children(':last')
    .hide()
    .fadeIn(500);

  updateLocalStore();
});

$('#remove-task').click(() => {
  tasks.pop();

  $('li')
    .last()
    .fadeOut(200, function() {
      $(this).remove();
    });

  updateLocalStore();
});

$('#clear-tasks').click(() => {
  $('li').remove();
  tasks = [];
  clearLocalStore();
});

$('li').click(function() {
  $(this).toggleClass('task-done');
  const index = $(this).attr('key') - 1;
  tasks[index].isDone = !tasks[index].isDone;
  updateLocalStore();
});
