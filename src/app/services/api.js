

// Products
export async function getAllProducts() {
    const res = await fetch("https://fakestoreapi.com/products", {
        next: { revalidate: 60 },
    });
    return res.json();
}

export async function getProductById(id) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        next: { revalidate: 60 },
    });
    return res.json();
}



// User 
export async function login({ username, password }) {
    const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
        throw new Error("Giriş başarısız");
    }
    const data = await res.json(); // { token: "..." }
    return data;
}


export async function registerUser(data) {
    const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            username: data.username,
            password: data.password,
            name: {
                firstname: data.username,
                lastname: data.username
            },
            adress: {
                city: "İstanbul",
                street: "Örnek Mah",
                number: 1,
                zipcode: "34000",
                geolocation: {
                    lat: "0",
                    long: "0",
                },
            },
            phone: "555-123-4567",
        })
    });

    if (!res.ok) {
        throw new Error("Kayıt Başarısız");
    }
    return res.json();
}