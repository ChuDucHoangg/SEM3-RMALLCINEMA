function Search_Ticket() {
    return (
        <>
            <section className="search-ticket-section padding-top pt-lg-0">
                <div className="container">
                    <div className="search-tab">
                        <div className="row align-items-center mb--20">
                            <div className="col-lg-6 mb-20">
                                <div className="search-ticket-header">
                                    <h6 className="category">search tickets</h6>
                                    <h3 className="title">find your tickets now</h3>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-20">
                                <ul className="tab-menu ticket-tab-menu">
                                    <li className="active">
                                        <div className="tab-thumb">
                                            <img src="assets/img/ticket/movie.png" alt="ticket" />
                                        </div>
                                        <span>movie</span>
                                    </li>
                                    <li>
                                        <div className="tab-thumb">
                                            <img src="assets/img/ticket/event.png" alt="ticket" />
                                        </div>
                                        <span>events</span>
                                    </li>
                                    <li>
                                        <div className="tab-thumb">
                                            <img src="assets/img/ticket/sport.png" alt="ticket" />
                                        </div>
                                        <span>sports</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-area">
                            <div className="tab-item active">
                                <form className="ticket-search-form">
                                    <div className="form-group large">
                                        <input type="text" placeholder="Search for Movies" />
                                        <button type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/city.png" alt="ticket" />
                                        </div>
                                        <span className="type">city</span>
                                        <select className="select-bar">
                                            <option value="london">New York</option>
                                            <option value="dhaka">California</option>
                                            <option value="rosario">Texas</option>
                                            <option value="madrid">Florida</option>
                                            <option value="koltaka">Nevada</option>
                                            <option value="rome">Oregon</option>
                                            <option value="khoksa">Ohio</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/date.png" alt="ticket" />
                                        </div>
                                        <span className="type">date</span>
                                        <select className="select-bar">
                                            <option value="11/04/2023">11/04/2023</option>
                                            <option value="10/04/2023">10/04/2023</option>
                                            <option value="09/04/2023">09/04/2023</option>
                                            <option value="08/04/2023">08/04/2023</option>
                                            <option value="07/04/2023">07/04/2023</option>
                                            <option value="06/04/2023">06/04/2023</option>
                                            <option value="05/04/2023">05/04/2023</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/cinema.png" alt="ticket" />
                                        </div>
                                        <span className="type">movie</span>
                                        <select className="select-bar">
                                            <option value="Avatar">Avatar</option>
                                            <option value="Inception">Inception</option>
                                            <option value="Parasite">Parasite</option>
                                            <option value="Joker">Joker</option>
                                            <option value="Searching">Searching</option>
                                            <option value="Coco">Coco</option>
                                            <option value="Lion">Lion</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <button type="submit" className="filter-btn">
                                                <i className="far fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="tab-item">
                                <form className="ticket-search-form">
                                    <div className="form-group large">
                                        <input type="text" placeholder="Search for Events" />
                                        <button type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/city.png" alt="ticket" />
                                        </div>
                                        <span className="type">city</span>
                                        <select className="select-bar">
                                            <option value="london">New York</option>
                                            <option value="dhaka">California</option>
                                            <option value="rosario">Texas</option>
                                            <option value="madrid">Florida</option>
                                            <option value="koltaka">Nevada</option>
                                            <option value="rome">Oregon</option>
                                            <option value="khoksa">Ohio</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/date.png" alt="ticket" />
                                        </div>
                                        <span className="type">date</span>
                                        <select className="select-bar">
                                            <option value="11/04/2023">11/04/2023</option>
                                            <option value="10/04/2023">10/04/2023</option>
                                            <option value="09/04/2023">09/04/2023</option>
                                            <option value="08/04/2023">08/04/2023</option>
                                            <option value="07/04/2023">07/04/2023</option>
                                            <option value="06/04/2023">06/04/2023</option>
                                            <option value="05/04/2023">05/04/2023</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/event-2.png" alt="ticket" />
                                        </div>
                                        <span className="type">event</span>
                                        <select className="select-bar">
                                            <option value="Design">Design</option>
                                            <option value="Development">Development</option>
                                            <option value="Software">Software</option>
                                            <option value="Digital">Digital</option>
                                            <option value="Festival">Festival</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Seo">Seo</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <button type="submit" className="filter-btn">
                                                <i className="far fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="tab-item">
                                <form className="ticket-search-form">
                                    <div className="form-group large">
                                        <input type="text" placeholder="Search fo Sports" />
                                        <button type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/city.png" alt="ticket" />
                                        </div>
                                        <span className="type">city</span>
                                        <select className="select-bar">
                                            <option value="london">New York</option>
                                            <option value="dhaka">California</option>
                                            <option value="rosario">Texas</option>
                                            <option value="madrid">Florida</option>
                                            <option value="koltaka">Nevada</option>
                                            <option value="rome">Oregon</option>
                                            <option value="khoksa">Ohio</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/date.png" alt="ticket" />
                                        </div>
                                        <span className="type">date</span>
                                        <select className="select-bar">
                                            <option value="11/04/2023">11/04/2023</option>
                                            <option value="10/04/2023">10/04/2023</option>
                                            <option value="09/04/2023">09/04/2023</option>
                                            <option value="08/04/2023">08/04/2023</option>
                                            <option value="07/04/2023">07/04/2023</option>
                                            <option value="06/04/2023">06/04/2023</option>
                                            <option value="05/04/2023">05/04/2023</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <img src="assets/img/ticket/sport-2.png" alt="ticket" />
                                        </div>
                                        <span className="type">sport</span>
                                        <select className="select-bar">
                                            <option value="Cricket">Cricket</option>
                                            <option value="Football">Football</option>
                                            <option value="Basketball">Basketball</option>
                                            <option value="Baseball">Baseball</option>
                                            <option value="Golf">Golf</option>
                                            <option value="Running">Running</option>
                                            <option value="Badminton">Badminton</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumb">
                                            <button type="submit" className="filter-btn">
                                                <i className="far fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Search_Ticket;
