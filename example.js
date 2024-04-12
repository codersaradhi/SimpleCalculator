document.addEventListener("keydown",(event) => {
      const keyName = event.key;
      if (keyName === "Control") {
        // do not alert when only Control key is pressed.
        return;
      }

      if (event.ctrlkey) {
        // Even though event.key is not 'Control' (e.g., 'a' is pressed),
        // event.ctrlKey may be true if Ctrl key is pressed at the same time.
        alert(`Combination of ctrlKey + ${keyName}`);
      } else {
        alert(`Key pressed ${keyName}`);
      }
    },
    false,
  );




// const deleteButton = document.querySelector('[data-delete]');
//   deleteButton.addEventListener("click",(event)=>{

//     if(event.key === 'Delete'){
//         printsucess(keyName); 
//     }
//     else{
//         alert('failed :(');
//     }
//   })
//   function printsucess(keyname){
//     alert(`step 1 is completed${keyname}`);
// }