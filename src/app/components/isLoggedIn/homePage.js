const HomePage = ({ status, message }) => {
    if (status) {
        alert(message)
    }
    return (
        <div>
            <h2>Logged in user page.</h2>
        </div>
    )
}

export default HomePage;