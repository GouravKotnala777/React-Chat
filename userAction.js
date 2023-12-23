

const userAction = async({email, password}) => {
    const res = await fetch("/login", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email, password})
    });
};