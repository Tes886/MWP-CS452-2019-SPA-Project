window.onload = function () {

    // application reference 

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
                    <textarea id="animation" rows="25" cols="25" style="font-size: 20px"></textarea><br><br>
                    <button id="refresh">Refresh Animation</button>
                    <button id="logout">Logout</button>        
                    <div id= 
                    `
    const outlet = document.querySelector("#outlet");

    outlet.innerHTML = loginTemp

    document.querySelector("#login").addEventListener('click', function () {
        outlet.innerHTML = animationTemp;
        logoutbtn();
        refreshbtn();
        gotLocation()
        // history.pushState(outlet,null,url)

    });

    function logoutbtn() {
        document.querySelector("#logout").addEventListener('click', function () {
            outlet.innerHTML = loginTemp;
            // history.pushState(outlet,null,url)

        });
    }
    function refreshbtn() {

        document.querySelector("#refresh").addEventListener('click',myAnimantion);
        //let text = document.querySelector("#animation");
       // text.innerHTML = frame;

    }

    async function gettoken() {
       const resp = await fetch("http://www.mumstudents.org/api/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                username: 'mwp', password: '123'
            })
        })
            const respBody= await resp.json();
                token = respBody.token;

                myAnimantion();

        //gettoken();
    }


    function myAnimantion() {
        fetch("http://mumstudents.org/api/animation", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(resp => resp.text())
            .then(obj => {
                // console.log(obj);
                frame = obj.split('=====\n');
                //console.log(frame);

                let count = 0;
                countId = setInterval(function () {
                    
                    document.querySelector("#animation").innerHTML = frame[count];
                    count++;

                    if (count === frame.length) {
                        count = 0;
                    }
                }, 200);

            });
    }

    gettoken();

    //function fechLocation() {

        // navigator.geolocation.getCurrentPosition(gotLocation);

        async function gotLocation() {
           // console.log();
            let resp = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=ycSAKAgeWuIeiGZbLuSi5wp0867aaJFL&location=30.333472,-81.470448`);
            resp = await resp.json();
            console.log(resp);

            const city = resp.results[0].locations[0].adminArea5
            const state = resp.results[0].locations[0].adminArea3
            const country = resp.results[0].locations[0].adminArea1
            const zip = resp.results[0].locations[0].postalCode
            
            document.getElementById("address").innerHTML =`Welcome all from ${city}, ${state} ${zip}, ${country}!`;


        }
        gotLocation()
    //}


}