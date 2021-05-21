const button = document.getElementById('post-logout');

button.addEventListener('click', async _ => {
  try {  
    const response = await fetch('/users/logout', {
      method: 'post'
    });

    location.reload();
    console.log('Completed!', response);
  } catch(err) {
    alert("Error occured when login out - Please try again")
    console.error(`Error: ${err}`);
  }
});