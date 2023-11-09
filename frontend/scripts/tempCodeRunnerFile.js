const data = fetch("http://localhost:4000/api/students")
    .then((res) => {
        if (res.ok) {
            console.log('Successful');
            return res.json();
        }
        else {
            console.log('Not successful');
        }
    }).then((data) => {
        data.forEach(element => {
            if (element.username === 'tebohomolise') {
                console.log("FOUND HIM")
            }

        });
    });