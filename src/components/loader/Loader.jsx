import "./Loader.scss"

function Loader () {
    return (
        <div className="loader">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    )
}

export default Loader;