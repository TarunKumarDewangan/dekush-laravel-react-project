// src/pages/ShopOwnerDashboard.jsx

function ShopOwnerDashboard() {
    // ... other state ...
    const [shop, setShop] = useState(null);

    useEffect(() => {
        // THIS IS WHERE IT'S CALLED
        api.get('/my-shop') // <-- HERE
            .then(response => {
                setShop(response.data.shop);
            })
            // ... catch and finally blocks ...
    }, []);

    // ... other code ...

    return (
        <Container className="my-4">
            {/* The result of the API call determines which component is shown */}
            {shop ? (
                // Show this if shop data exists
                <div>Welcome to {shop.name}</div>
            ) : (
                // Show this if shop data is null
                <CreateShopForm onShopCreated={onShopCreated} />
            )}
        </Container>
    );
}
