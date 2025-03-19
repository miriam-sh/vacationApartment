import "../Style/bootstrap.min.css"

export const OurNewsLetter = () => {

    return (
        <>
            <form>
                <div id="newsLetterDiv" className="mb-3 mt-3">
                    <label htmlFor="newsletter">הירשמו לניוזלטר שלנו:</label>
                    <input type="email" id="newsletter" required className="form-control"></input>
                </div>
                <button type="submit" className="btn btn-primary" style={{backgroundColor: "#047F9A", borderColor: "white"}}>אישור</button>
            </form>
        </>
    )
}