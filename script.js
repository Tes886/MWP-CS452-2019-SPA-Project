

const login = `
                <h1>Please Login</h1><br>
                Username:<input placeholder="mwp" value="mwp"/><br/>
                Password:<input placeholder="123" value="123"/><br/>
                <button id="loginbtn">Login</button>
            `
let login = document.getElementById("outlet");
login.innerHTML = login;
document.getElementById("loginbtn").addEventListener("click", login)

const animation = `
                    <div id="address"> Welcome to SPA Animation</div>
                    <textarea id="animation" rows="25" cols="25" style="font-size: 20px"></textarea><br><br>
                    <button id="refresh">Refresh Animation</button>
                    <button id="logout">Logout</button>        
                `
let animation = document.getElementById("outlet");
login.innerHTML = animation;




