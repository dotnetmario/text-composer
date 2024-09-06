// // content.js

// const tooltipHTML = `
//   <div id="my-tooltip" style="
//     position: fixed;
//     bottom: 10px;
//     right: 10px;
//     padding: 10px;
//     background-color: #333;
//     color: #fff;
//     border-radius: 5px;
//     display: none;
//   ">
//     <p>Some action here</p>
//     <button id="tooltip-action">Do Action</button>
//   </div>
// `;

// document.body.insertAdjacentHTML('beforeend', tooltipHTML);

// document.body.addEventListener('mousemove', (event) => {
//   const tooltip = document.getElementById('my-tooltip');
//   tooltip.style.display = 'block';
//   tooltip.style.top = `${event.clientY + 10}px`;
//   tooltip.style.left = `${event.clientX + 10}px`;
// });

// document.getElementById('tooltip-action').addEventListener('click', () => {
//   chrome.storage.local.get('authToken', (result) => {
//     fetch('https://api.example.com/action', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${result.authToken}`
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Action completed:', data);
//     });
//   });
// });
