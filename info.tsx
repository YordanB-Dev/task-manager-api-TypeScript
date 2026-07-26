import "./info.css"

export default function info() {

    return (
        <>
        <section className="info">
        <div className="info-content">

            <div className="info-cards">
    <a href="/" className="card-link">
        <img
            className="image1"
            src="/fcstack.jpg"
            alt="Drone"
        />

        <h2 className="link-text">Electronics</h2>
    </a>
</div>

<div className="info-cards">
    <a href="/" className="card-link">
        <img
            className="image1"
            src="/radio.jpg"
            alt="Guitar"
        />

        <h2 className="link-text">Radios</h2>
    </a>
</div>

        <div className="info-cards">
            <a href="/" className="card-link">
                <img className="image1" src="propsfpv.jpg" alt="accesoaries" />

                <h2 className="link-text">Accesoaries</h2>
            </a>
        </div>

        </div>
        </section>
        </>
    )
}