window.onload = function () {
    let lat;
    let lon;
    let frame;
    let timerId;
    // define logintemp, animationTemp and outlet
    let token;
    // console.log(token);
    const loginTemp = `
                <h1>Please Login</h1><br>   
                Username:<input placeholder="mwp" value="mwp"/><br/>
                Password:<input placeholder="123" value="123"/><br/>
                <button id="login">Login</button>
            `
    const animationTemp = `
                    <div id="address"></div>  
                    <textarea id="animation" rows="25" cols="50" style="font-size: 20px"></textarea><br><br>
                    <button id="refresh">Refresh Animation</button>
                    <button id="logout">Logout</button>        
                    <div id= 
                    `
    const outlet = document.querySelector("#outlet");

    firstPage();
    function firstPage() {

        outlet.innerHTML = loginTemp
        document.querySelector("#login").addEventListener('click', aniTemp);

    }

    function aniTemp() {
        clearInterval(timerId);
        outlet.innerHTML = animationTemp;
        fechLocation();

        document.querySelector("#refresh").addEventListener('click', refreshbtn);
        document.querySelector("#logout").addEventListener('click', logoutbtn);
        gettoken();
    }



    function logoutbtn() {
        outlet.innerHTML = loginTemp;
        document.querySelector("#login").addEventListener('click', aniTemp);
        clearInterval(timerId);

    }


    function refreshbtn() {
        clearInterval(timerId);
        // document.querySelector("#refresh").addEventListener('click', myAnimantion);
        myAnimantion();

    }

    async function gettoken() {

        const resp = await fetch("http://www.mumstudents.org/api/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                username: 'mwp', password: '123'
            })
        })
        const respBody = await resp.json();
        console.log(respBody);
        token = respBody.token;

        myAnimantion();
    }

    async function myAnimantion() {
       // clearInterval(timerId);
        const resp = await fetch("http://mumstudents.org/api/animation", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        const respBody = await resp.text();
        //console.log(respBody);
        frame = respBody.split('=====\n');
        console.log(frame);
       
        let count = 0;
        timerId = setInterval(function () {
            document.getElementById("animation").innerHTML = frame[count];
            count++;
            if (count === frame.length) {
                count = 0;
            }
        }, 200);

    }

    function fechLocation() {
        navigator.geolocation.getCurrentPosition(success);

        async function success(position) {
            lat = position.coords.latitude
            lon = position.coords.longitude;
            console.log(lat);
            console.log(lon);

            let resp = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=ycSAKAgeWuIeiGZbLuSi5wp0867aaJFL&location=${lat},${lon}`);
            resp = await resp.json();
            console.log(resp);

            const city = resp.results[0].locations[0].adminArea5
            const state = resp.results[0].locations[0].adminArea3
            const country = resp.results[0].locations[0].adminArea1
            const zip = resp.results[0].locations[0].postalCode

            document.querySelector("#address").innerHTML = `Welcome all from ${city}, ${state}, ${zip}, ${country}!`;

            //fechLocation();

        }

    }

}