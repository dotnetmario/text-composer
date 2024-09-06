const base_uri = "http://text-composer.test/api/v1";

// chrome.runtime.onInstalled.addListener(() => {
//     console.log('Extension installed.');
//   });



/**
 * perform an API Auth call
 * 
 * @param {string} email 
 * @param {string} pass 
 */
let performlogin = async (email, pass) => {
    const creds = JSON.stringify({ email: email, password: pass });

    const response = await fetch(`${base_uri}/login`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: creds
    })

    const data = await response.json();

    // check the response
    if (!response.ok) {
        // Handle HTTP errors
        return { valid: false, errors: data };
    }

    const token = data.token
    await storeAuthToken(token);

    // Log and return the token
    return { valid: true, token: token };
}

/**
 * 
 * @param {Object} errors 
 */
let displayFormErrors = (errors) => {
    for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
            const err = errors[key];

            $(document).find(`#aite-login${key}`).addClass('is-invalid');
            $(document).find('.invalid-inputs-errors').find('.error-messages').append(`<p class="fw-bold">${err}</p>`);
        }
    }
}

let clearErrors = () => {
    $(document).find('.is-invalid').removeClass('is-invalid');
    $(document).find('.invalid-inputs-errors').find('.error-messages').html('');
}

/**
 * strores the auth token in browser storage
 * 
 * @param {string} token 
 */
let storeAuthToken = async (token) => {
    return await chrome.storage.local.set({ "aiteAuthToken": token });
}

/**
 * return Auth token from storage
 * @returns Auth token
 */
let retreiveAuthToken = async () => {
    const token = await chrome.storage.local.get('aiteAuthToken');

    return token.aiteAuthToken !== undefined ? token.aiteAuthToken : '';
}


/**
 * check if user is connected
 * @returns bool
 */
let is_user_authenticated = async () => {
    const token = await retreiveAuthToken();

    return token !== undefined && token.length > 0;
}

let renderFirstContent = async () => {
    const loggedin = await is_user_authenticated();

    if (!loggedin) {
        displayContent('login');
    }

    displayContent('home');
}

/**
 * dosplays pages if logged in
 * @param {string} page 
 */
let drawContent = async (page, container = "#aite-content") => {
    const loggedin = await is_user_authenticated();

    if (!loggedin) {
        displayContent('login');
    }

    displayContent(page, container);
}

/**
 * prints a file content inside the main div
 * @param {string} page 
 * @returns string HTML content
 */
let displayContent = async (page, container = "#aite-content") => {
    try {
        // Fetch the HTML file
        const response = await fetch(`pages/${page}.html`);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Get the text content of the response
        const text = await response.text();

        // Create a temporary DOM element to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Extract the desired content from the parsed HTML
        const content = doc.getElementById('aite-content').innerHTML; // Adjust the selector as needed

        // Insert the content into the target div
        // document.getElementById('content').innerHTML = content;
        // document.getElementById("aite-content").innerHTML = content;
        $(document).find(container).html(content);

        return content;
    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
    }
}

let parseTooltipActionsOnPage = () => {
    const tooltip_html = `<div id="aite-tooltipactions">
        <ul class="list-group">
            <li class="list-group-item active">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">chocolate cheesecake candy</li>
            <li class="list-group-item">Oat cake icing pastry pie carrot</li>
        </ul>
    </div>`;

    $(document).find('body').append(tooltip_html);
}
/**
 * display actions tooltips
 * 
 */
let displayActionsTooltip = async (event) => {
    const selectedText = window.getSelection().toString().trim();
    let tooltip = $(document).find('#aite-tooltipactions');

    await chrome.runtime.sendMessage({ greeting: "hello" });

    console.log(tooltip);

    if (selectedText) {
        $(tooltip).css("display", "block");
        $(tooltip).css("left", `${event.pageX + 10}px`);
        $(tooltip).css("display", `${event.pageY + 10}px`);
        // tooltip.style.display = 'block';
        // tooltip.style.left = `${event.pageX + 10}px`; // Positioning the tooltip slightly offset from the cursor
        // tooltip.style.top = `${event.pageY + 10}px`;
    } else {
        $(tooltip).css('display', 'none');
    }

    console.log(selectedText);
}