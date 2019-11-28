window.onload = function () {

    // application reference 

    // define logintemp, animationTemp and outlet
    // let token;
    // console.log(token);
    const loginTemp = `
                <h1>Please Login</h1><br>
                Username:<input placeholder="mwp" value="mwp"/><br/>
                Password:<input placeholder="123" value="123"/><br/>
                <button id="login">Login</button>
            `
    const animationTemp = `
                    <div id="address"> Welcome to SPA Animation</div>
                    <textarea id="animation" rows="25" cols="25" style="font-size: 20px"></textarea><br><br>
                    <button id="refresh">Refresh Animation</button>
                    <button id="logout">Logout</button>        
            
                    `
    const outlet = document.querySelector("#outlet");

    outlet.innerHTML = loginTemp

    document.querySelector("#login").addEventListener('click', function () {
        outlet.innerHTML = animationTemp;
        logoutbtn();
        refreshbtn();
    });

    function logoutbtn() {
        document.querySelector("#logout").addEventListener('click', function () {
            outlet.innerHTML = loginTemp;

        });
    }
    function refreshbtn() {

        document.querySelector("#refresh").addEventListener('click', function () {
            let text = document.querySelector("#animation");
            text.innerHTML = ccccccc;
        });

    }

    function gettoken() {
        return fetch("http://www.mumstudents.org/api/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                username: 'mwp', password: '123'
            })
        }
        )

            .then((resp) => { return resp.json() })
            .then((obj) => {
                // token = obj.token;
                // console.log(token)


                // function myAnimantion() {
                return fetch("http://mumstudents.org/api/animation", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${obj.token}`

                    }
                })


                    // const frame = obj.split(`=====\n`);
                    // const frameLength = frame.length;
                    // let currentFrame = 0;
                    // animationTag = this.setInterval(() => {
                    //     document.querySelector("#animation").value = frame[currentFrame];
                    //     currentFrame++;
                    //  })
                    .then(resp => resp.text())
                    .then(obj => {
                        console.log(obj);
                        ccccccc = obj.split("=====");
                        console.log(ccccccc);
                    });
            });
    }
    gettoken();

    // const frameLength = frame.length;
    // let currentFrame = 0;
    
    // function motion() {
    //     setInterval(() => {
    //         document.querySelector("#animation").innerHTML = frame[currentFrame];
    //         currentFrame++;

    //     }


}